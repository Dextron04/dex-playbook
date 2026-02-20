import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-24 flex flex-col gap-8">
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
