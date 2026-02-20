"use client";

import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import SectionBadge from "@/components/ui/SectionBadge";

// Fabric.js touches window — must be client-only
const CanvasPreview = dynamic(() => import("@/components/ui/CanvasPreview"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-dark-elevated border border-white/10 animate-pulse" />
  ),
});

export default function Hero() {
  return (
    <section className="bg-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-20 pb-16 flex flex-col gap-7">
        {/* Badge */}
        <div>
          <SectionBadge variant="dark">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-light mr-2 align-middle" />
            Now in beta · Real-time collaborative canvas
          </SectionBadge>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-1">
          <h1 className="font-display font-bold text-[clamp(48px,7vw,92px)] leading-[1.05] text-white">
            Think without
          </h1>
          <h1 className="font-display font-bold text-[clamp(48px,7vw,92px)] leading-[1.05] text-purple-light">
            limits.
          </h1>
        </div>

        {/* Subheadline */}
        <p className="max-w-2xl text-[clamp(16px,1.4vw,20px)] font-body text-muted leading-relaxed">
          The infinite canvas where teams brainstorm, sketch, and play in real time.
          <br className="hidden sm:block" />
          Live cursors · Sticky notes · Mini-games · Persistent rooms
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="md" href="#">
            Start your room — it&apos;s free
          </Button>
          <Button variant="ghost" size="md" href="#">
            Watch a demo →
          </Button>
        </div>

        {/* Live canvas preview */}
        <div className="mt-4">
          <CanvasPreview />
        </div>
      </div>
    </section>
  );
}
