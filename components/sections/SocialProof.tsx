const stats = [
  { value: "50,000+", label: "Active rooms created",     color: "text-purple" },
  { value: "2M+",     label: "Doodles & notes shared",   color: "text-teal"   },
  { value: "4.9 ★",  label: "Average user rating",       color: "text-pink"   },
];

const testimonials = [
  {
    quote:
      '"Playspace replaced our entire brainstorming setup. We used to juggle Miro, Slack, and Zoom. Now we just open a room and magic happens."',
    author: "Sarah K.",
    role: "Product Lead, early-stage startup",
    accentColor: "text-purple",
  },
  {
    quote:
      '"We ran our entire design sprint in Playspace. The sticky notes, the voting poll, the timer — it felt like a real workshop but 10× more fun."',
    author: "Marcus T.",
    role: "Design Director, Agency",
    accentColor: "text-teal",
  },
  {
    quote:
      '"Our remote team actually looks forward to Monday planning now. The canvas is addictive — there\'s always something new to discover and play with."',
    author: "Priya M.",
    role: "Engineering Manager, Remote team",
    accentColor: "text-pink",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-16">
        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <span
                className={`font-display font-bold text-[clamp(40px,4vw,56px)] leading-none ${s.color}`}
              >
                {s.value}
              </span>
              <span className="text-base font-body text-secondary">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="flex flex-col gap-6">
          <h2 className="font-display font-bold text-[clamp(26px,2.5vw,36px)] text-near-black">
            Loved by teams, creators, and friends
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="flex flex-col gap-5 bg-white border border-gray-200 rounded-3xl p-8"
              >
                <p className="text-base font-body text-near-black leading-relaxed">
                  {t.quote}
                </p>
                <div>
                  <p className={`text-[13px] font-semibold font-body ${t.accentColor}`}>
                    {t.author}
                  </p>
                  <p className="text-[13px] font-body text-secondary">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
