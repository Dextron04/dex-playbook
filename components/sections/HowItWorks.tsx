import SectionBadge from "@/components/ui/SectionBadge";

const steps = [
  {
    number: "1",
    color: "#8B5CF6",
    title: "Create a room",
    description:
      "Open a room instantly — no account needed to start. Choose a name, pick an emoji, and you're in.",
  },
  {
    number: "2",
    color: "#14B8A6",
    title: "Invite your crew",
    description:
      "Share a link and your team joins instantly. See everyone's live cursors and presence from the moment they enter.",
  },
  {
    number: "3",
    color: "#F472B6",
    title: "Build and play",
    description:
      "Scribble, drop sticky notes, play mini-games, run polls, and organize ideas together in real time on an infinite canvas.",
  },
];

export default function HowItWorks() {
  return (
    <section id="features" className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <SectionBadge variant="purple">How It Works</SectionBadge>
          <h2 className="font-display font-bold text-[clamp(32px,3.5vw,48px)] text-near-black">
            Get started in three steps
          </h2>
          <p className="text-lg font-body text-secondary">
            No setup. No learning curve. Just creativity unleashed.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 bg-gray-card border border-gray-200 rounded-3xl p-8"
            >
              {/* Number circle */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: step.color }}
              >
                <span className="font-display font-bold text-xl text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="font-display font-bold text-[22px] text-near-black">
                {step.title}
              </h3>
              <p className="text-[15px] font-body text-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
