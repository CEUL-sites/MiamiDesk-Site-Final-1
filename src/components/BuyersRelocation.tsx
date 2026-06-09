import { motion } from "motion/react";
import { Compass, BarChart3, PlaneLanding } from "lucide-react";
import { VideoBubbles } from "./VideoBubbles";

// Two directions of representation. Sellers first — the primary funnel — then
// buyers. Both are backed by the same URG network and Carlos's 25-year record.
const REPRESENTATION = [
  {
    side: "Sellers",
    title: "Positioning, pricing, distribution, negotiation.",
    desc: "Absorption-based pricing, presentation strategy, MLS distribution, and personal negotiation through to closing — the property positioned correctly before it goes public.",
    href: "/sell-south-florida",
    cta: "Request a seller strategy review",
    tag: "LISTING REPRESENTATION",
  },
  {
    side: "Buyers",
    title: "Acquisition strategy, neighborhood intelligence, offer structure.",
    desc: "Submarket-level intelligence, offer structure, and disciplined acquisition support — the right property, at the right price, in the right timing window.",
    href: "/buy",
    cta: "Brief your search",
    tag: "BUYER REPRESENTATION",
  },
];

const PILLARS = [
  {
    number: "01",
    icon: Compass,
    title: "Strategic Acquisitions",
    desc: "Neighborhood intelligence and offer structure for buyers, refined by 25 years of South Florida transactions — paired with positioning discipline for sellers entering the same market.",
    tag: "MIAMI-DADE · BROWARD · PALM BEACH",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Portfolio Positioning",
    desc: "Analytical support for owners and investors weighing asset types, location fundamentals, and long-term capital positioning across residential and commercial South Florida.",
    tag: "RESIDENTIAL · COMMERCIAL · MIXED-USE",
  },
  {
    number: "03",
    icon: PlaneLanding,
    title: "LATAM & International",
    desc: "A bilingual bridge for owners and buyers moving capital between Latin America, Europe, and South Florida — 25 years of authentic client relationships, built deal by deal.",
    tag: "BILINGUAL · ENGLISH & SPANISH",
  },
];

export function BuyersRelocation() {
  return (
    <section id="buyers" className="bg-bone-warm">
      <div className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end mb-14">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold mb-4">
                PROFESSIONAL REPRESENTATION · SOUTH FLORIDA
              </p>
              <h2 className="font-serif text-4xl lg:text-5xl text-navy leading-tight mb-6">
                The right property.{" "}
                <span className="text-gold italic font-light">
                  The right representation.
                </span>
              </h2>
              <p className="text-navy/65 text-lg leading-relaxed max-w-xl">
                Representation in both directions — sellers and buyers — across Miami-Dade,
                Broward, and Palm Beach. Every client is backed by United Realty Group's South
                Florida network of 3,500+ agents across 20 offices, and anchored by 25 years of
                Carlos's transactions in this market since 2001.
              </p>
            </div>
            <div className="lg:text-right">
              <p className="font-mono text-[9px] uppercase tracking-widest text-navy/40 mb-3">
                Carlos Uzcategui
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-navy/30">
                25 Years · CLHMS · Certified Seller Representative · United Realty Group · FL SL705771
              </p>
            </div>
          </div>

          {/* Two representation tracks — sellers + buyers */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {REPRESENTATION.map((r, i) => (
              <motion.div
                key={r.side}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col border border-bone bg-white p-8 hover:border-gold/40 transition-colors duration-500"
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/70 mb-4">
                  {r.tag}
                </p>
                <h3 className="font-serif text-2xl text-navy mb-3">{r.side}</h3>
                <p className="font-sans text-base font-medium text-navy/80 mb-3">{r.title}</p>
                <p className="text-navy/60 text-sm leading-relaxed mb-7 flex-1">{r.desc}</p>
                <a
                  href={r.href}
                  className="inline-block self-start border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-navy transition-colors hover:text-gold"
                >
                  {r.cta} →
                </a>
              </motion.div>
            ))}
          </div>

          {/* Professional home-marketing clips — single sequencing bubble */}
          <div className="mb-14 border-y border-bone py-14">
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
              {/* Text */}
              <div className="lg:flex-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-3">
                  The Work
                </p>
                <h3 className="font-serif text-3xl text-navy mb-4 leading-snug">
                  How the marketing<br className="hidden sm:block" /> actually looks.
                </h3>
                <p className="font-sans text-sm leading-relaxed text-navy/55 max-w-xs">
                  Cinematic listing films and property tours — the presentation standard
                  behind every South Florida listing.
                </p>
              </div>
              {/* Single auto-sequencing bubble */}
              <div className="flex justify-center lg:flex-1">
                <VideoBubbles />
              </div>
            </div>
          </div>

          {/* Three pillars */}
          <div className="grid lg:grid-cols-3 gap-6">
            {PILLARS.map((card, i) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 border border-bone hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 font-serif text-6xl font-bold text-navy/5 leading-none select-none">
                  {card.number}
                </div>
                <div className="w-10 h-10 bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                  <card.icon size={20} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">{card.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-5">{card.desc}</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/60">
                  {card.tag}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
