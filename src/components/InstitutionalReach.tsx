import { motion } from "motion/react";
import { LazyVideo } from "./LazyVideo";

const VERIFIED_METRICS = [
  {
    value: "93,000",
    label: "Member Agents",
    sublabel: "Miami & South Florida REALTORS®",
    description:
      "The world's largest local REALTOR® association. Every member agent works from the shared MLS inventory your listing enters.",
  },
  {
    value: "200+",
    label: "Global Consumer Portals",
    sublabel: "19 Languages",
    description:
      "Automated syndication across approved international consumer channels connecting your property to qualified cross-border demand.",
  },
  {
    value: "260+",
    label: "U.S. MLSs via RPR",
    sublabel: "Realtors Property Resource",
    description:
      "Nationwide data exchanges providing direct visibility to relocating buyer agents across the United States.",
  },
  {
    value: "437+",
    label: "International Agreements",
    sublabel: "75+ Countries",
    description:
      "Signed bilateral partnership agreements establishing institutional cooperation pipelines with leading global brokerages.",
  },
];

export function InstitutionalReach() {
  return (
    <section id="institutional-reach" className="relative overflow-hidden bg-navy-deep py-12 md:py-20 text-white">
      {/* Subtle cinematic background */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/75 to-navy-deep/95" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
          >
            Institutional Distribution · Structural MLS Advantage
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mx-auto mt-4 max-w-4xl font-serif text-3xl leading-tight text-white md:text-5xl"
          >
            Your listing enters the ecosystem<br />
            <em className="italic text-gold">93,000 South Florida agents work from daily.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:mt-5 md:text-lg"
          >
            Buyers rarely find luxury listings alone; their agents discover them. Carlos positions your home directly within the institutional MLS network and syndicates across 200+ global channels.
          </motion.p>
        </div>

        {/* 4 Verified Metric Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16 md:gap-6">
          {VERIFIED_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between rounded-lg border border-gold/20 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] md:p-8"
            >
              <div>
                <div className="mb-4 h-0.5 w-8 bg-gold/40 transition-all duration-300 group-hover:w-16 group-hover:bg-gold" />
                <div className="font-serif text-4xl text-gold md:text-5xl leading-none">
                  {metric.value}
                </div>
                <h3 className="mt-3 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  {metric.label}
                </h3>
                <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-gold/70">
                  {metric.sublabel}
                </p>
              </div>
              <p className="mt-4 font-sans text-xs leading-relaxed text-white/70 border-t border-white/10 pt-4">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Association Attribution */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
            Powered by membership in the Miami and South Florida REALTORS® · United Realty Group
          </p>
          <p className="mx-auto mt-2 max-w-3xl font-sans text-[11px] leading-relaxed text-white/55">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Distribution channels, portal coverage, and partner exchanges are subject to platform availability and MLS rules.
          </p>
        </div>
      </div>
    </section>
  );
}
