"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import CanvasWorkspace from "@/components/CanvasWorkspace";

const COLORS = ["#8B5CF6", "#14B8A6", "#F472B6", "#FB923C", "#34D399", "#A78BFA"];

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const [userName, setUserName] = useState("");
  const [userColor, setUserColor] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleJoin() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setUserColor(color);
    setUserName(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleJoin();
    }
  }

  const showModal = !userName || !userColor;

  return (
    <div className="relative w-full h-screen">
      <CanvasWorkspace roomId={roomId} userName={userName} userColor={userColor ?? ""} />

      {showModal && (
        <div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(8, 0, 18, 0.85)" }}
        >
          <div
            className="rounded-2xl p-8 flex flex-col gap-6 w-full max-w-sm"
            style={{ backgroundColor: "#1A0533" }}
          >
            <h2
              className="text-white font-bold text-xl text-center"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Join the room
            </h2>

            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="Your display name"
              maxLength={20}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
              style={{ backgroundColor: "#2D1150", border: "1px solid #3D1A6E" }}
            />

            <button
              onClick={handleJoin}
              disabled={!nameInput.trim()}
              className="w-full rounded-full py-3 text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#8B5CF6" }}
              onMouseOver={(e) => {
                if (!e.currentTarget.disabled)
                  e.currentTarget.style.backgroundColor = "#7C3AED";
              }}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#8B5CF6")
              }
            >
              Join Room
            </button>
          </div>
        </div>
      )}

      {/* roomId accessible for child components via prop drilling in future stories */}
      {!showModal && (
        <div className="hidden" data-room-id={roomId} data-user-name={userName} data-user-color={userColor} />
      )}
    </div>
  );
}
