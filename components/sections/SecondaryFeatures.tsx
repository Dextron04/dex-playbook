import SectionBadge from "@/components/ui/SectionBadge";

const cards = [
  {
    emoji: "📌",
    title: "Sticky Notes",
    description:
      "Drop ideas anywhere on the canvas. Color-code them, drag them around, and watch the mess become a map.",
    accent: "#8B5CF6",
  },
  {
    emoji: "🖼️",
    title: "Image Upload",
    description:
      "Drag-and-drop any image directly onto the canvas. Annotate, resize, and build visual moodboards instantly.",
    accent: "#14B8A6",
  },
  {
    emoji: "🎮",
    title: "Mini Games",
    description:
      "Need a break or an icebreaker? Launch mini-games right in the canvas. Compete, laugh, and recharge together.",
    accent: "#F472B6",
  },
  {
    emoji: "🏠",
    title: "Persistent Rooms",
    description:
      "Your room stays exactly as you left it. Return any time and pick up right where the ideas stopped.",
    accent: "#8B5CF6",
  },
  {
    emoji: "✨",
    title: "Custom Stickers",
    description:
      "Express yourself with stickers, stamps, and custom emojis. Make the canvas feel alive and uniquely yours.",
    accent: "#14B8A6",
  },
  {
    emoji: "⬜",
    title: "Draggable Blocks",
    description:
      "Drop structured content blocks — text, lists, tasks, embeds — and arrange them freely across the canvas.",
    accent: "#F472B6",
  },
];

export default function SecondaryFeatures() {
  return (
    <section className="bg-dark">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <SectionBadge variant="dark">More Superpowers</SectionBadge>
          <h2 className="font-display font-bold text-[clamp(32px,3.5vw,48px)] text-white">
            Built for how creative teams actually work
          </h2>
          <p className="text-lg font-body text-muted max-w-2xl">
            Everything you need to brainstorm, build, and bond — in one infinite space.
          </p>
        </div>

        {/* 2×3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col gap-4 bg-dark-card border border-white/5 rounded-2xl p-7 hover:border-white/10 transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: `${card.accent}25` }}
                >
                  {card.emoji}
                </span>
                <h3 className="font-display font-bold text-[18px] text-white">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm font-body text-muted leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
