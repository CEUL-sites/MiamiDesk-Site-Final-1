import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LazyVideo } from "./LazyVideo";

const DISTRIBUTION_STATS = [
  {
    value: "93,000",
    label: "Association members",
    source: "Miami and South Florida REALTORS®",
    description: "Professional visibility inside the shared MLS ecosystem used by member agents.",
  },
  {
    value: "200+",
    label: "Websites and apps",
    source: "Association listing-reach program",
    description: "Eligible listings can be syndicated across consumer discovery channels in 19 languages.",
  },
  {
    value: "260+",
    label: "U.S. MLSs via RPR",
    source: "Realtors Property Resource®",
    description: "Qualified property data can travel through approved professional distribution infrastructure.",
  },
  {
    value: "437+",
    label: "International agreements",
    source: "MIAMI Global Council",
    description: "Association relationships support international professional cooperation and market access.",
  },
] as const;

export function Distribution() {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/78 to-navy-deep/94" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Verified distribution infrastructure
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">
              A strong listing strategy is supported by professional reach.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70">
              Carlos combines South Florida MLS positioning, buyer-agent activation and eligible online syndication through United Realty Group and his Miami and South Florida REALTORS® membership.
            </p>
            <a
              href="#list-here"
              className="mt-7 inline-flex min-h-12 items-center gap-2.5 bg-gold px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Request My Property Strategy
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="border-t border-white/15">
            {DISTRIBUTION_STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="grid gap-3 border-b border-white/15 py-6 sm:grid-cols-[135px_1fr] sm:gap-7 md:py-7"
              >
                <div>
                  <p className="font-serif text-3xl text-gold md:text-4xl">{stat.value}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                    {stat.label}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-sm leading-relaxed text-white/76">{stat.description}</p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.13em] text-gold/70">
                    Source: {stat.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-5xl font-sans text-[11px] leading-relaxed text-white/55">
          Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability. Not all properties appear on all websites or apps, and participating sites may change.
        </p>
      </div>
    </section>
  );
}
