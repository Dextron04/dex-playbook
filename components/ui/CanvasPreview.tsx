"use client";

import { useEffect, useRef } from "react";

interface Cursor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  name: string;
  el: SVGGElement | null;
}

export default function CanvasPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctxOrNull = canvas.getContext("2d");
    if (!ctxOrNull) return;
    const ctx: CanvasRenderingContext2D = ctxOrNull;

    const W = canvas.width;
    const H = canvas.height;

    // ── Static sticky notes ──────────────────────────────────────────
    const stickies = [
      { x: 80,  y: 80,  w: 180, h: 110, color: "#8B5CF6", label: "Ship v1 🚀",       sub: "by Friday" },
      { x: 320, y: 50,  w: 200, h: 110, color: "#14B8A6", label: "User interviews",   sub: "5 done, 3 left" },
      { x: 600, y: 90,  w: 190, h: 110, color: "#F472B6", label: "Brainstorm ✨",      sub: "keep it fun" },
      { x: 160, y: 240, w: 175, h: 100, color: "#A78BFA", label: "Infinite canvas",   sub: "no borders!" },
      { x: 430, y: 220, w: 190, h: 100, color: "#FB923C", label: "Multiplayer 🎮",     sub: "4 active now" },
      { x: 700, y: 240, w: 175, h: 100, color: "#34D399", label: "Sticky notes",      sub: "color coded" },
    ];

    // ── Pre-drawn scribble path ───────────────────────────────────────
    const scribble = [
      [60, 360], [90, 330], [130, 370], [170, 330], [210, 360],
      [250, 330], [290, 360], [330, 340], [370, 360], [410, 330],
      [450, 365], [490, 335], [530, 360],
    ] as [number, number][];

    // ── Cursors ───────────────────────────────────────────────────────
    const cursors: Cursor[] = [
      { x: 200, y: 150, vx: 0.6,  vy: 0.4,  color: "#A78BFA", name: "Sara",  el: null },
      { x: 550, y: 300, vx: -0.5, vy: 0.7,  color: "#14B8A6", name: "Raj",   el: null },
      { x: 750, y: 120, vx: 0.4,  vy: -0.6, color: "#F472B6", name: "Alex",  el: null },
    ];

    function drawSticky(
      c: CanvasRenderingContext2D,
      x: number, y: number, w: number, h: number,
      color: string, label: string, sub: string,
    ) {
      // shadow
      c.shadowColor = "rgba(0,0,0,0.35)";
      c.shadowBlur = 18;
      c.shadowOffsetY = 6;

      // card body
      c.beginPath();
      c.roundRect(x, y, w, h, 12);
      c.fillStyle = "#1A0533";
      c.fill();

      c.shadowColor = "transparent";
      c.shadowBlur = 0;
      c.shadowOffsetY = 0;

      // left accent bar
      c.beginPath();
      c.roundRect(x, y, 4, h, [12, 0, 0, 12]);
      c.fillStyle = color;
      c.fill();

      // label
      c.font = "bold 14px 'Plus Jakarta Sans', sans-serif";
      c.fillStyle = "#FFFFFF";
      c.fillText(label, x + 18, y + 32);

      // sub
      c.font = "12px Inter, sans-serif";
      c.fillStyle = "#A1A1AA";
      c.fillText(sub, x + 18, y + 54);

      // color dot
      c.beginPath();
      c.arc(x + w - 18, y + 18, 6, 0, Math.PI * 2);
      c.fillStyle = color;
      c.fill();
    }

    function drawScribble(c: CanvasRenderingContext2D) {
      c.beginPath();
      c.moveTo(scribble[0][0], scribble[0][1]);
      for (let i = 1; i < scribble.length; i++) {
        const [px, py] = scribble[i - 1];
        const [cx2, cy2] = scribble[i];
        c.quadraticCurveTo(px, py, (px + cx2) / 2, (py + cy2) / 2);
      }
      c.strokeStyle = "#A78BFA60";
      c.lineWidth = 3;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.stroke();
    }

    function drawCursor(
      c: CanvasRenderingContext2D,
      x: number, y: number, color: string, name: string,
    ) {
      // arrow shape
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(x + 12, y + 20);
      c.lineTo(x + 5, y + 18);
      c.lineTo(x + 3, y + 28);
      c.lineTo(x - 1, y + 18);
      c.lineTo(x - 8, y + 20);
      c.closePath();
      c.fillStyle = color;
      c.fill();

      // name tag
      const pad = 6;
      const tw = c.measureText(name).width;
      c.beginPath();
      c.roundRect(x + 14, y + 16, tw + pad * 2, 22, 6);
      c.fillStyle = color;
      c.fill();
      c.font = "bold 11px Inter, sans-serif";
      c.fillStyle = "#fff";
      c.fillText(name, x + 14 + pad, y + 31);
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // background
      ctx.fillStyle = "#0C0020";
      ctx.fillRect(0, 0, W, H);

      // subtle grid
      ctx.strokeStyle = "rgba(139,92,246,0.07)";
      ctx.lineWidth = 1;
      const gs = 40;
      for (let gx = 0; gx < W; gx += gs) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gs) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      drawScribble(ctx);

      stickies.forEach((s) =>
        drawSticky(ctx, s.x, s.y, s.w, s.h, s.color, s.label, s.sub),
      );

      // move & bounce cursors
      cursors.forEach((cur) => {
        cur.x += cur.vx;
        cur.y += cur.vy;
        if (cur.x < 20 || cur.x > W - 40) cur.vx *= -1;
        if (cur.y < 20 || cur.y > H - 40) cur.vy *= -1;
        drawCursor(ctx, cur.x, cur.y, cur.color, cur.name);
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
      style={{ background: "#0C0020" }}
    >
      <canvas
        ref={canvasRef}
        width={960}
        height={420}
        className="w-full h-auto"
      />
    </div>
  );
}
