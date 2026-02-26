import { RoomState } from "./types";

const rooms = new Map<string, RoomState>();

export function getOrCreateRoom(roomId: string): RoomState {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      strokes: [],
      stickies: [],
      users: new Map(),
    });
  }
  return rooms.get(roomId)!;
}

export function deleteRoomIfEmpty(roomId: string): void {
  const room = rooms.get(roomId);
  if (room && room.users.size === 0) {
    rooms.delete(roomId);
  }
}
