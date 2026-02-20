import SectionBadge from "@/components/ui/SectionBadge";

const features = [
  {
    tag: "Infinite Canvas",
    tagColor: "#8B5CF6",
    title: "Draw, sketch, and arrange freely",
    description:
      "An endless digital canvas with no borders. Zoom in for detail, zoom out for context. Scribble with pencils, drop shapes, add sticky notes — the way your brain actually works.",
    imageSide: "right" as const,
    imageBg: "#1A0533",
  },
  {
    tag: "Live Presence",
    tagColor: "#14B8A6",
    title: "See everyone, in real time",
    description:
      "Watch your team's cursors glide across the canvas. See who's online, what they're looking at, and where ideas are forming. Presence makes remote feel personal.",
    imageSide: "left" as const,
    imageBg: "#0D1A2D",
  },
  {
    tag: "Fun Widgets",
    tagColor: "#F472B6",
    title: "Widgets that make work feel like play",
    description:
      "Drop polls, set timers, place stickers, start mini-games, and drag interactive blocks around the canvas. Transform any session into a creative jam.",
    imageSide: "right" as const,
    imageBg: "#1A0D2D",
  },
];

function ScreenshotPlaceholder({ bg }: { bg: string }) {
  return (
    <div
      className="w-full md:w-[560px] shrink-0 h-[320px] md:h-[380px] rounded-2xl border border-white/10 flex items-center justify-center"
      style={{ backgroundColor: bg }}
    >
      <span className="text-subtle text-base font-body">Screenshot placeholder</span>
    </div>
  );
}

export default function CoreFeatures() {
  return (
    <section className="bg-light-purple">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-20">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <SectionBadge variant="purple">Core Features</SectionBadge>
          <h2 className="font-display font-bold text-[clamp(32px,3.5vw,48px)] text-near-black">
            Everything you need to think together
          </h2>
        </div>

        {/* Feature rows */}
        {features.map((feat) => (
          <div
            key={feat.tag}
            className={`flex flex-col ${
              feat.imageSide === "left" ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-12 md:gap-16`}
          >
            {/* Text */}
            <div className="flex-1 flex flex-col gap-5">
              <span
                className="inline-block self-start px-4 py-1.5 rounded-full text-xs font-semibold font-body text-white"
                style={{ backgroundColor: feat.tagColor }}
              >
                {feat.tag}
              </span>
              <h3 className="font-display font-bold text-[clamp(24px,2.5vw,36px)] text-near-black leading-tight">
                {feat.title}
              </h3>
              <p className="text-[17px] font-body text-secondary leading-relaxed">
                {feat.description}
              </p>
            </div>

            {/* Screenshot */}
            <ScreenshotPlaceholder bg={feat.imageBg} />
          </div>
        ))}
      </div>
    </section>
  );
}
