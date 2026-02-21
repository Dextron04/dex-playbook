"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface User {
  id: string;
  name: string;
  color: string;
  cursor: { x: number; y: number } | null;
}

export interface Stroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

export interface StickyNote {
  id: string;
  x: number;
  y: number;
  color: string;
  text: string;
}

interface RoomParams {
  roomId: string;
  userName: string;
  userColor: string;
}

interface RemoteCursor {
  x: number;
  y: number;
  name: string;
  color: string;
}

interface RoomState {
  strokes: Stroke[];
  stickies: StickyNote[];
  connected: boolean;
  socket: Socket | null;
  remoteUsers: User[];
  remoteCursors: Map<string, RemoteCursor>;
  addStroke: (stroke: Stroke) => void;
  clearCanvasLocal: () => void;
}

export function useRoom({ roomId, userName, userColor }: RoomParams): RoomState {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [stickies, setStickies] = useState<StickyNote[]>([]);
  const [connected, setConnected] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<User[]>([]);
  const [remoteCursors, setRemoteCursors] = useState<Map<string, RemoteCursor>>(new Map());
  const socketRef = useRef<Socket | null>(null);

  const addStroke = (stroke: Stroke) => {
    setStrokes((prev) => [...prev, stroke]);
  };

  const clearCanvasLocal = () => {
    setStrokes([]);
    setStickies([]);
  };

  useEffect(() => {
    if (!roomId || !userName || !userColor) return;
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:3002";
    const socket = io(wsUrl);
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_room", { roomId, userName, userColor });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on(
      "room_state",
      (state: { strokes: Stroke[]; stickies: StickyNote[]; users: User[] }) => {
        setStrokes(state.strokes);
        setStickies(state.stickies);
        setRemoteUsers(state.users.filter((u) => u.id !== socket.id));
      }
    );

    socket.on("user_joined", (user: User) => {
      setRemoteUsers((prev) => {
        if (prev.find((u) => u.id === user.id)) return prev;
        return [...prev, user];
      });
    });

    socket.on("user_left", ({ userId }: { userId: string }) => {
      setRemoteUsers((prev) => prev.filter((u) => u.id !== userId));
      setRemoteCursors((prev) => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
    });

    socket.on(
      "cursor_moved",
      ({ userId, x, y, name, color }: { userId: string; x: number; y: number; name: string; color: string }) => {
        setRemoteCursors((prev) => {
          const next = new Map(prev);
          next.set(userId, { x, y, name, color });
          return next;
        });
      }
    );

    socket.on("stroke_added", (stroke: Stroke) => {
      setStrokes((prev) => {
        if (prev.find((s) => s.id === stroke.id)) return prev;
        return [...prev, stroke];
      });
    });

    socket.on("sticky_added", (sticky: StickyNote) => {
      setStickies((prev) => {
        if (prev.find((s) => s.id === sticky.id)) return prev;
        return [...prev, sticky];
      });
    });

    socket.on("sticky_updated", (updated: StickyNote) => {
      setStickies((prev) =>
        prev.map((s) => (s.id === updated.id ? updated : s))
      );
    });

    socket.on("canvas_cleared", () => {
      setStrokes([]);
      setStickies([]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, userName, userColor]);

  return {
    socket: socketRef.current,
    strokes,
    stickies,
    remoteUsers,
    remoteCursors,
    connected,
    addStroke,
    clearCanvasLocal,
  };
}
