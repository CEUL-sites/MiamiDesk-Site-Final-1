import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";

const STEPS = [
  {
    number: "01",
    name: "Position",
    headline: "Price it right before it goes public.",
    body: "We run absorption rate analysis against active competition in your exact submarket. You receive the realistic price range — and the strategic entry point — before the listing activates. This prevents the most common seller mistake: starting high, then chasing the market down with price reductions that signal weakness to buyers.",
    benefit: "Accurate pricing at launch reduces time on market and protects your net proceeds.",
  },
  {
    number: "02",
    name: "Prepare",
    headline: "Presentation that earns the asking price.",
    body: "Professional photography coordination, MLS data accuracy review, and a complete documentation checklist — permits, HOA records, inspection pre-work — so nothing stalls the contract period. A buyer who sees a prepared, well-documented listing reads it as a confident, serious seller. That translates into stronger offers.",
    benefit: "Prepared listings with complete documentation close with fewer delays and fewer contingency issues.",
  },
  {
    number: "03",
    name: "Launch",
    headline: "Day-one MLS entry and global reach — simultaneously.",
    body: "Your listing enters the Miami and South Florida REALTORS® MLS on activation day. Where eligible under MLS rules and platform participation, it syndicates to 200+ global portals in 19 languages — reaching international buyer pools actively searching in your price range. Exposure timing and sequencing are calibrated to your submarket.",
    benefit: "One MLS entry. Eligible exposure across 200+ global portals in 19 languages.",
  },
  {
    number: "04",
    name: "Activate",
    headline: "93,000 buyer agents receive a direct signal.",
    body: "Beyond the automated MLS feed, we activate targeted outreach across the 93,000 member agents of Miami and South Florida REALTORS® — the world's largest local REALTOR® association — working alongside the United Realty Group brokerage. LATAM and European buyer pipelines are engaged through international referral channels. For properties with cross-border appeal, the Spain and Madrid desk coordinates inquiries directly.",
    benefit: "Your listing reaches working buyer agents — not just search portals waiting for clicks.",
  },
  {
    number: "05",
    name: "Negotiate",
    headline: "Every offer reviewed personally. No hand-offs.",
    body: "Carlos reviews every offer directly — terms, contingencies, inspection strategy, and closing timeline. You are never passed to a junior associate or a team member you haven't met. The same person who priced your property and launched your listing manages every decision from the first offer conversation to keys at the closing table.",
    benefit: "One contact throughout. Every decision made personally. No surprises at closing.",
  },
];

export function SellerProcess() {
  const [active, setActive] = useState(0);

  const toggle = (i: number) => setActive((prev) => (prev === i ? -1 : i));

  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24 text-white border-t-2 border-gold/20">
      <AuroraBackground />
      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            How a Listing Works
          </p>
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="max-w-xl font-serif text-3xl leading-tight text-white md:text-4xl">
                Five stages. One point of contact throughout.
              </h2>
              <p className="mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/45">
                Every South Florida listing Carlos handles follows a consistent five-stage process —
                from the first pricing conversation to the closing table.
              </p>
            </div>
            {/* Step dot nav */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    active === i
                      ? "w-6 h-2 bg-gold"
                      : "w-2 h-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div>
          {STEPS.map((step, i) => {
            const isActive = active === i;
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={step.number}
                className={`relative border-t transition-colors duration-200 ${
                  isActive ? "border-gold/25" : "border-white/10"
                } ${isLast ? (isActive ? "border-b border-b-gold/25" : "border-b border-b-white/10") : ""}`}
              >
                {/* Active left bar */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-300 ${
                    isActive ? "bg-gold opacity-100" : "bg-transparent opacity-0"
                  }`}
                />

                {/* Step header — always visible, clickable */}
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isActive}
                  className="w-full flex items-center gap-5 py-5 pl-4 text-left focus-visible:outline-none"
                >
                  {/* Number */}
                  <span
                    className={`font-mono text-2xl font-bold leading-none flex-shrink-0 w-10 transition-colors duration-200 ${
                      isActive ? "text-gold" : "text-white/30"
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Name + headline */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.26em] transition-colors duration-200 ${
                        isActive ? "text-gold" : "text-white/35"
                      }`}
                    >
                      {step.name}
                    </span>
                    <p
                      className={`mt-1 font-serif text-lg leading-snug transition-colors duration-200 ${
                        isActive ? "text-white" : "text-white/65"
                      }`}
                    >
                      {step.headline}
                    </p>
                  </div>

                  {/* Toggle icon */}
                  <div
                    className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      isActive
                        ? "border-gold bg-gold/15 text-gold"
                        : "border-white/15 text-white/30"
                    }`}
                  >
                    {isActive ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 md:pl-[4.5rem] pr-12 pb-7">
                        <p className="font-sans text-[0.9rem] leading-relaxed text-white/60 max-w-2xl">
                          {step.body}
                        </p>
                        <div className="mt-5 inline-flex items-start gap-3 border border-gold/20 bg-gold/[0.06] px-4 py-3">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold/80 leading-relaxed">
                            {step.benefit}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Request a Confidential Property Review
          </a>
          <a
            href="/home-value"
            className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:border-gold hover:text-gold"
          >
            Free Home Valuation
          </a>
        </div>

        <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.14em] text-white/20">
          United Realty Group · FL SL705771 · Equal Housing Opportunity · Eligible distribution subject to MLS rules and syndication partner availability
        </p>
      </div>
    </section>
  );
}
