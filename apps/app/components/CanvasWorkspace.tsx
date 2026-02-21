"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRoom, Stroke, StickyNote } from "@/hooks/useRoom";

type Tool = "select" | "pen" | "sticky" | "text" | "eraser";

const TOOLS: { id: Tool; label: string; icon: string }[] = [
  { id: "select", label: "Select",     icon: "↖" },
  { id: "pen",    label: "Draw",       icon: "✏" },
  { id: "sticky", label: "Sticky",     icon: "🗒" },
  { id: "text",   label: "Text",       icon: "T" },
  { id: "eraser", label: "Eraser",     icon: "◻" },
];

const COLORS = ["#8B5CF6", "#14B8A6", "#F472B6", "#FB923C", "#34D399", "#A78BFA"];

const INITIAL_STICKIES: StickyNote[] = [
  { id: "1", x: 140, y: 120, color: "#8B5CF6", text: "Ship v1 🚀\nby Friday" },
  { id: "2", x: 380, y: 90,  color: "#14B8A6", text: "User interviews\n5 done, 3 left" },
  { id: "3", x: 640, y: 130, color: "#F472B6", text: "Brainstorm ✨\nkeep it fun" },
];

const COLLABORATORS = [
  { name: "Sara", color: "#A78BFA" },
  { name: "Raj",  color: "#14B8A6" },
  { name: "Alex", color: "#F472B6" },
];

interface CanvasWorkspaceProps {
  roomId: string;
  userName: string;
  userColor: string;
}

export default function CanvasWorkspace({ roomId, userName, userColor }: CanvasWorkspaceProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const [activeTool,   setActiveTool]   = useState<Tool>("pen");
  const [activeColor,  setActiveColor]  = useState(COLORS[0]);
  const [zoom,         setZoom]         = useState(100);
  const [roomName,     setRoomName]     = useState("My Room");
  const [editingName,  setEditingName]  = useState(false);
  const isDrawing     = useRef(false);
  const currentStroke = useRef<{ x: number; y: number }[]>([]);

  const lastEmit = useRef(0);

  const { socket, strokes, stickies, remoteCursors, addStroke, addSticky, clearCanvasLocal } = useRoom({ roomId, userName, userColor });

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#0B0018";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(139,92,246,0.07)";
    ctx.lineWidth = 1;
    const gs = 40;
    for (let gx = 0; gx < W; gx += gs) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += gs) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // Strokes
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        const p = stroke.points[i - 1];
        const c = stroke.points[i];
        ctx.quadraticCurveTo(p.x, p.y, (p.x + c.x) / 2, (p.y + c.y) / 2);
      }
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth   = stroke.width;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
    });

    // Sticky notes
    stickies.forEach((s) => {
      ctx.shadowColor   = "rgba(0,0,0,0.4)";
      ctx.shadowBlur    = 20;
      ctx.shadowOffsetY = 8;
      ctx.beginPath();
      ctx.roundRect(s.x, s.y, 180, 110, 12);
      ctx.fillStyle = "#1A0533";
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.shadowBlur  = 0;
      ctx.shadowOffsetY = 0;

      ctx.beginPath();
      ctx.roundRect(s.x, s.y, 4, 110, [12, 0, 0, 12]);
      ctx.fillStyle = s.color;
      ctx.fill();

      const lines = s.text.split("\n");
      ctx.font      = "bold 13px 'Plus Jakarta Sans', sans-serif";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(lines[0] ?? "", s.x + 16, s.y + 32);
      if (lines[1]) {
        ctx.font      = "11px Inter, sans-serif";
        ctx.fillStyle = "#A1A1AA";
        ctx.fillText(lines[1], s.x + 16, s.y + 52);
      }
    });
  }, [strokes, stickies]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width  = parent.clientWidth;
      canvas.height = parent.clientHeight;
      redraw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [redraw]);

  useEffect(() => { redraw(); }, [redraw]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width  / rect.width),
      y: (e.clientY - rect.top)  * (canvas.height / rect.height),
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (activeTool === "pen" || activeTool === "eraser") {
      isDrawing.current = true;
      currentStroke.current = [getPos(e)];
    } else if (activeTool === "sticky") {
      const pos = getPos(e);
      const sticky: StickyNote = {
        id: Date.now().toString(),
        x: pos.x - 90,
        y: pos.y - 55,
        color: activeColor,
        text: "New note\nClick to edit",
      };
      addSticky(sticky);
      socket?.emit("sticky_add", { roomId, sticky });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const now = Date.now();
    if (socket && now - lastEmit.current >= 30) {
      const pos = getPos(e);
      socket.emit("cursor_move", { roomId, x: pos.x, y: pos.y });
      lastEmit.current = now;
    }
    if (!isDrawing.current) return;
    const pos = getPos(e);
    currentStroke.current.push(pos);
    redraw();
    const pts = currentStroke.current;
    if (pts.length < 2) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i - 1];
      const c = pts[i];
      ctx.quadraticCurveTo(p.x, p.y, (p.x + c.x) / 2, (p.y + c.y) / 2);
    }
    ctx.strokeStyle = activeTool === "eraser" ? "#0B0018" : activeColor;
    ctx.lineWidth   = activeTool === "eraser" ? 20 : 3;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (currentStroke.current.length > 1) {
      const stroke: Stroke = {
        id: Date.now().toString(),
        points: [...currentStroke.current],
        color: activeTool === "eraser" ? "#0B0018" : activeColor,
        width: activeTool === "eraser" ? 20 : 3,
      };
      addStroke(stroke);
      socket?.emit("stroke_add", { roomId, stroke });
    }
    currentStroke.current = [];
  };

  const cursorStyle =
    activeTool === "pen"    ? "crosshair" :
    activeTool === "eraser" ? "cell"      :
    activeTool === "sticky" ? "copy"      : "default";

  return (
    <div className="flex flex-col h-screen bg-[#080012] text-white overflow-hidden">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 border-b border-[#1A0533] bg-[#080012] shrink-0" style={{ height: 52 }}>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#8B5CF6] flex items-center justify-center text-sm font-bold font-display">D</div>
          {editingName ? (
            <input
              autoFocus
              className="bg-white/10 text-white text-sm font-medium px-2 py-1 rounded outline-none border border-[#8B5CF6]/50"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
            />
          ) : (
            <button
              className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 px-2 py-1 rounded-md transition-colors"
              onClick={() => setEditingName(true)}
            >
              {roomName}
              <span className="text-[#52525B] text-xs">✏</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-1.5">
            {COLLABORATORS.map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="w-7 h-7 rounded-full border-2 border-[#080012] flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: c.color }}
              >
                {c.name[0]}
              </div>
            ))}
          </div>
          <button className="px-4 py-1.5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-semibold rounded-lg transition-colors">
            Share
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left toolbar */}
        <aside className="flex flex-col items-center gap-2 px-2.5 py-3 border-r border-[#1A0533] bg-[#080012] shrink-0" style={{ width: 56 }}>
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              title={tool.label}
              onClick={() => setActiveTool(tool.id)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all ${
                activeTool === tool.id
                  ? "bg-[#8B5CF6]/20 text-[#A78BFA] ring-1 ring-[#8B5CF6]/40"
                  : "text-[#52525B] hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {tool.icon}
            </button>
          ))}
          <div className="w-6 h-px bg-[#1A0533] my-1" />
          {COLORS.map((c) => (
            <button
              key={c}
              title={c}
              onClick={() => setActiveColor(c)}
              className={`w-5 h-5 rounded-full transition-all ${
                activeColor === c ? "ring-2 ring-white ring-offset-1 ring-offset-[#080012] scale-110" : "opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
          <div className="w-6 h-px bg-[#1A0533] my-1" />
          <button
            title="Clear canvas"
            onClick={() => { clearCanvasLocal(); socket?.emit("canvas_clear", { roomId }); }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-sm text-[#52525B] hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            ⌫
          </button>
        </aside>

        {/* Canvas */}
        <main className="flex-1 relative overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
              cursor: cursorStyle,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          {/* Remote cursor overlay */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              pointerEvents: "none",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center center",
            }}
          >
            {Array.from(remoteCursors.entries()).map(([userId, cursor]) => (
              <div
                key={userId}
                className="absolute flex items-start"
                style={{ left: cursor.x, top: cursor.y }}
              >
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" style={{ flexShrink: 0 }}>
                  <path
                    d="M1 1L1 16L4.5 12.5L6.5 18L8.5 17L6.5 11.5L11 11.5Z"
                    fill={cursor.color}
                    stroke="rgba(0,0,0,0.4)"
                    strokeWidth="0.5"
                  />
                </svg>
                <span
                  className="text-white font-semibold rounded-full whitespace-nowrap ml-1"
                  style={{ backgroundColor: cursor.color, fontSize: 10, padding: "2px 6px", marginTop: 2 }}
                >
                  {cursor.name}
                </span>
              </div>
            ))}
          </div>
          {/* Zoom */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-[#1A0533] border border-[#2D1060] rounded-lg px-2 py-1.5">
            <button onClick={() => setZoom((z) => Math.max(25, z - 25))} className="text-[#52525B] hover:text-white text-sm w-5 h-5 flex items-center justify-center">−</button>
            <span className="text-xs text-[#71717A] w-10 text-center">{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(200, z + 25))} className="text-[#52525B] hover:text-white text-sm w-5 h-5 flex items-center justify-center">+</button>
          </div>
          {/* Hint */}
          <div className="absolute bottom-4 right-4 text-xs text-[#2D1060]">
            {activeTool === "pen"    && "Draw freely on the canvas"}
            {activeTool === "sticky" && "Click anywhere to place a sticky note"}
            {activeTool === "eraser" && "Drag to erase"}
            {activeTool === "select" && "Click to select elements"}
          </div>
        </main>
      </div>
    </div>
  );
}
