import { Button } from "@dex/ui";

export default function FinalCTA() {
  return (
    <section className="bg-dark relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute -top-40 left-1/3 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-28 flex flex-col gap-8">
        <h2 className="font-display font-bold text-[clamp(40px,5vw,72px)] text-white leading-[1.05]">
          Ready to think
          <br />
          without limits?
        </h2>

        <p className="text-lg font-body text-muted max-w-xl leading-relaxed">
          Start your canvas and invite your team in seconds. No credit card
          required.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" href="#">
            Start your room — it&apos;s free
          </Button>
        </div>

        <p className="text-sm font-body text-[#4B5563]">
          No credit card · Cancel anytime · Free plan forever
        </p>
      </div>
    </section>
  );
}
