import { createServer } from "http";
import { Server } from "socket.io";
import { getOrCreateRoom, deleteRoomIfEmpty } from "./rooms";
import { User, Stroke, StickyNote } from "./types";

const PORT = process.env.PORT ?? 3002;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  let currentRoomId: string | null = null;

  socket.on(
    "join_room",
    (data: { roomId: string; userName: string; userColor: string }) => {
      const { roomId, userName, userColor } = data;
      currentRoomId = roomId;

      socket.join(roomId);

      const room = getOrCreateRoom(roomId);
      const user: User = {
        id: socket.id,
        name: userName,
        color: userColor,
        cursor: null,
      };
      room.users.set(socket.id, user);

      // Send current room state to the joining socket
      socket.emit("room_state", {
        strokes: room.strokes,
        stickies: room.stickies,
        users: Array.from(room.users.values()),
      });

      // Broadcast to others in the room
      socket.to(roomId).emit("user_joined", user);
    }
  );

  socket.on("cursor_move", (data: { roomId: string; x: number; y: number }) => {
    const { roomId, x, y } = data;
    const room = getOrCreateRoom(roomId);
    const user = room.users.get(socket.id);
    if (user) {
      user.cursor = { x, y };
      socket.to(roomId).emit("cursor_moved", { userId: socket.id, x, y, name: user.name, color: user.color });
    }
  });

  socket.on("stroke_add", (data: { roomId: string; stroke: Stroke }) => {
    const { roomId, stroke } = data;
    const room = getOrCreateRoom(roomId);
    room.strokes.push(stroke);
    socket.to(roomId).emit("stroke_added", stroke);
  });

  socket.on("sticky_add", (data: { roomId: string; sticky: StickyNote }) => {
    const { roomId, sticky } = data;
    const room = getOrCreateRoom(roomId);
    room.stickies.push(sticky);
    socket.to(roomId).emit("sticky_added", sticky);
  });

  socket.on(
    "sticky_update",
    (data: { roomId: string; stickyId: string; text: string }) => {
      const { roomId, stickyId, text } = data;
      const room = getOrCreateRoom(roomId);
      const sticky = room.stickies.find((s) => s.id === stickyId);
      if (sticky) {
        sticky.text = text;
        socket.to(roomId).emit("sticky_updated", { stickyId, text });
      }
    }
  );

  socket.on("canvas_clear", (data: { roomId: string }) => {
    const { roomId } = data;
    const room = getOrCreateRoom(roomId);
    room.strokes = [];
    room.stickies = [];
    io.to(roomId).emit("canvas_cleared");
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    if (currentRoomId) {
      const room = getOrCreateRoom(currentRoomId);
      room.users.delete(socket.id);
      socket.to(currentRoomId).emit("user_left", { userId: socket.id });
      deleteRoomIfEmpty(currentRoomId);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`WS server listening on :${PORT}`);
});
