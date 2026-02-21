"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LobbyPage() {
  const router = useRouter();
  const [joinInput, setJoinInput] = useState("");

  function handleCreateRoom() {
    const roomId = Math.random().toString(36).slice(2, 10);
    router.push(`/room/${roomId}`);
  }

  function extractRoomId(value: string): string {
    const match = value.match(/\/room\/([a-z0-9]+)/i);
    if (match) return match[1];
    return value.trim();
  }

  function handleJoin() {
    const roomId = extractRoomId(joinInput);
    if (!roomId) return;
    router.push(`/room/${roomId}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && joinInput.trim()) {
      handleJoin();
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#080012" }}
    >
      <div
        className="rounded-2xl p-10 flex flex-col items-center gap-8 w-full max-w-sm"
        style={{ backgroundColor: "#12002B" }}
      >
        {/* Logo + Heading */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#8B5CF6" }}
          >
            <span
              className="text-white font-bold text-2xl"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              D
            </span>
          </div>
          <h1
            className="text-white font-bold text-2xl text-center"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Dex&apos;s Playbook
          </h1>
        </div>

        {/* Create a room */}
        <button
          onClick={handleCreateRoom}
          className="w-full rounded-full py-3 text-white font-semibold text-sm transition-colors"
          style={{ backgroundColor: "#8B5CF6" }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#7C3AED")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#8B5CF6")
          }
        >
          Create a room
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px" style={{ backgroundColor: "#2D1150" }} />
          <span className="text-xs" style={{ color: "#6B7280" }}>
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#2D1150" }} />
        </div>

        {/* Join a room */}
        <div className="flex gap-2 w-full">
          <input
            type="text"
            placeholder="Paste a room link..."
            value={joinInput}
            onChange={(e) => setJoinInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500"
            style={{ backgroundColor: "#1A0533", border: "1px solid #2D1150" }}
          />
          <button
            onClick={handleJoin}
            disabled={!joinInput.trim()}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2D1150" }}
            onMouseOver={(e) => {
              if (!e.currentTarget.disabled)
                e.currentTarget.style.backgroundColor = "#3D1A6E";
            }}
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#2D1150")
            }
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}
