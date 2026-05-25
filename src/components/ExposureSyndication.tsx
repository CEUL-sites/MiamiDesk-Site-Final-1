// src/components/ExposureSyndication.tsx
import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Portal {
  name: string;
  tier: 1 | 2 | 3;
}

const PORTALS: Portal[] = [
  // TIER 1 — largest bubbles (highest-profile national & intl portals)
  { name: "Zillow.com",                        tier: 1 },
  { name: "Realtor.com",                       tier: 1 },
  { name: "Homes.com",                         tier: 1 },
  { name: "Apartments.com",                    tier: 1 },
  { name: "Juwai",                             tier: 1 },
  { name: "Zumper",                            tier: 1 },
  // TIER 2 — medium bubbles (regional, bilingual, global reach)
  { name: "SFPropertySearch.com",              tier: 2 },
  { name: "Apartamentos.com",                  tier: 2 },
  { name: "VendeTuCasa",                       tier: 2 },
  { name: "RPR · Realtor Property Resource",   tier: 2 },
  { name: "GlobalPropertyXchange",             tier: 2 },
  { name: "WorldProperties.com",               tier: 2 },
  { name: "InternationalMLS",                  tier: 2 },
  { name: "Realopedia",                        tier: 2 },
  { name: "ForRent.com",                       tier: 2 },
  { name: "Rent.com",                          tier: 2 },
  // TIER 3 — smaller bubbles (specialty, commercial, professional tools)
  { name: "CREXi",                             tier: 3 },
  { name: "Brevitas",                          tier: 3 },
  { name: "FloridaLivingNetwork",              tier: 3 },
  { name: "ProxioConnect",                     tier: 3 },
  { name: "TerraFly PRO",                      tier: 3 },
  { name: "MiamiMLSonline",                    tier: 3 },
  { name: "NewHomeSource",                     tier: 3 },
  { name: "WikiRealty",                        tier: 3 },
  { name: "PropStream",                        tier: 3 },
  { name: "BackAtYouMedia",                    tier: 3 },
];

// Float keyframes — injected once as a <style> block
const FLOAT_STYLES = `
  @keyframes floatA {
    0%,100% { transform: translateY(0px) translateX(0px); }
    33%      { transform: translateY(-16px) translateX(7px); }
    66%      { transform: translateY(9px) translateX(-5px); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) translateX(0px); }
    33%      { transform: translateY(13px) translateX(-9px); }
    66%      { transform: translateY(-18px) translateX(6px); }
  }
  @keyframes floatC {
    0%,100% { transform: translateY(0px) translateX(0px); }
    50%      { transform: translateY(-11px) translateX(11px); }
  }
  @keyframes floatD {
    0%,100% { transform: translateY(0px) translateX(0px); }
    40%      { transform: translateY(15px) translateX(-8px); }
    80%      { transform: translateY(-8px) translateX(4px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .bubble { animation: none !important; }
  }
`;

const FLOAT_NAMES = ["floatA", "floatB", "floatC", "floatD"] as const;
const DURATIONS   = ["7s", "9s", "11s", "8s", "10s"] as const;

// Bubble size classes by tier — using only classes that exist in Tailwind v4
const TIER_CLASSES: Record<1 | 2 | 3, string> = {
  1: "px-7 py-4 text-[15px] font-semibold",
  2: "px-5 py-3 text-[13px] font-medium",
  3: "px-4 py-2 text-[11px] font-normal uppercase tracking-wider",
};

const BOTTOM_STATS = [
  { value: "200+", label: "Global Portals" },
  { value: "19",   label: "Languages" },
  { value: "385",  label: "U.S. MLSs via RPR" },
  { value: "437+", label: "Intl. Agreements" },
];

export const ExposureSyndication = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="syndication"
      ref={sectionRef}
      className="bg-navy-deep py-12 md:py-20 text-white overflow-hidden"
      aria-label="Listing syndication network — 200 plus verified platforms"
    >
      {/* Inject float keyframes once */}
      <style>{FLOAT_STYLES}</style>

      {/* ── Section header ── */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          Miami and South Florida REALTORS® · Verified Syndication
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 font-serif text-4xl leading-tight text-white lg:text-5xl"
        >
          Your listing. Everywhere buyers search.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55"
        >
          Every listing I represent is mechanically syndicated to 200+ websites
          and apps worldwide, in 19 languages, simultaneously — the moment the
          MLS listing activates. No manual uploads. No delays. Distribution as
          infrastructure.
        </motion.p>
      </div>

      {/* ── Bubble cloud ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="mx-auto max-w-5xl px-6 flex flex-wrap justify-center items-center gap-4"
      >
        {PORTALS.map((portal, i) => (
          <div
            key={portal.name}
            className={[
              "bubble",
              "rounded-full border border-[#B08D57]/20 bg-white/5",
              "backdrop-blur-md text-white/80 font-sans",
              "cursor-default select-none whitespace-nowrap",
              "transition-all duration-300",
              "hover:bg-[#B08D57]/15 hover:border-[#B08D57]/60",
              "hover:text-white hover:scale-105",
              TIER_CLASSES[portal.tier],
            ].join(" ")}
            style={{
              animation: `${FLOAT_NAMES[i % 4]} ${DURATIONS[i % 5]} ${(i * 0.4).toFixed(1)}s ease-in-out infinite`,
            }}
          >
            {portal.name}
          </div>
        ))}
      </motion.div>

      {/* ── Bottom stats bar ── */}
      <div className="mx-auto max-w-5xl px-6 mt-14">
        <div className="h-px w-full bg-gold/25" />
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 py-10">
          {BOTTOM_STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-10">
              <div className="text-center">
                <div className="font-serif text-4xl text-gold">{stat.value}</div>
                <div className="font-mono mt-1.5 text-[9px] uppercase tracking-[0.22em] text-white/55">
                  {stat.label}
                </div>
              </div>
              {i < BOTTOM_STATS.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-white/10" />
              )}
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-gold/25" />
        <p className="font-mono text-center text-[9px] uppercase tracking-[0.22em] text-white/40 mt-5">
          Source: Miami and South Florida REALTORS® · Verified syndication data
        </p>
      </div>
    </section>
  );
};
