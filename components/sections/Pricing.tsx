import SectionBadge from "@/components/ui/SectionBadge";
import Button from "@/components/ui/Button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    priceSub: "Free forever · No credit card",
    features: [
      "3 active rooms",
      "5 users per room",
      "Infinite canvas",
      "Basic drawing tools",
      "Sticky notes & images",
    ],
    cta: "Start for free",
    ctaVariant: "dark" as const,
    highlighted: false,
    cardClass: "bg-gray-card border border-gray-200",
    priceColor: "text-near-black",
    featColor: "text-subtle",
  },
  {
    name: "Team",
    price: "$8",
    priceSub: "per user / month · billed annually",
    badge: "Most Popular",
    features: [
      "Unlimited rooms",
      "Unlimited users",
      "All widgets & games",
      "Persistent rooms",
      "Priority support",
    ],
    cta: "Start free trial",
    ctaVariant: "primary" as const,
    highlighted: true,
    cardClass: "bg-dark border-2 border-purple",
    priceColor: "text-purple-light",
    featColor: "text-secondary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceSub: "Tailored to your team's needs",
    features: [
      "Everything in Team",
      "SSO & admin controls",
      "Advanced analytics",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Contact us",
    ctaVariant: "dark" as const,
    highlighted: false,
    cardClass: "bg-gray-card border border-gray-200",
    priceColor: "text-near-black",
    featColor: "text-subtle",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <SectionBadge variant="purple">Pricing</SectionBadge>
          <h2 className="font-display font-bold text-[clamp(32px,3.5vw,48px)] text-near-black">
            Simple, honest pricing
          </h2>
          <p className="text-lg font-body text-secondary">
            Start free. Scale when you need to. No surprises.
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col gap-6 rounded-3xl p-10 ${tier.cardClass} ${
                tier.highlighted ? "shadow-2xl shadow-purple/25 ring-1 ring-purple/30" : ""
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <span className="self-start px-4 py-1 rounded-full text-xs font-semibold font-body bg-purple text-white">
                  {tier.badge}
                </span>
              )}

              {/* Name */}
              <h3
                className={`font-display font-bold text-xl ${
                  tier.highlighted ? "text-white" : "text-near-black"
                }`}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <span
                  className={`font-display font-bold text-[52px] leading-none ${tier.priceColor}`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-body ${
                    tier.highlighted ? "text-muted" : "text-secondary"
                  }`}
                >
                  {tier.priceSub}
                </span>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-2 flex-1">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 text-[15px] font-body ${tier.featColor}`}
                  >
                    <span className="text-purple mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={tier.ctaVariant}
                size="md"
                href="#"
                className="w-full justify-center"
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
