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

export interface RoomState {
  strokes: Stroke[];
  stickies: StickyNote[];
  users: Map<string, User>;
}
