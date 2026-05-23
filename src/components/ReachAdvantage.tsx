import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../constants";

const TOP_STATS = [
  {
    value: 93000,
    display: "93,000",
    suffix: "",
    label: "Member Agents",
    sublabel: "Miami & South Florida REALTORS®",
    desc: "Every active agent's buyer pipeline is exposed to your listing on day one — the world's largest local Realtor® association.",
  },
  {
    value: 19,
    display: "19",
    suffix: "",
    label: "Florida Offices",
    sublabel: "United Realty Group",
    desc: "United Realty Group maintains 19 active offices across Florida — local presence in every South Florida market where buyers are searching.",
  },
  {
    value: 200,
    display: "200",
    suffix: "+",
    label: "Global Portals",
    sublabel: "19 Languages Simultaneously",
    desc: "From Zillow and Realtor.com to international platforms — every portal, every language, published the same day.",
  },
];

const BOTTOM_STATS = [
  {
    value: 260,
    display: "260",
    suffix: "+",
    label: "U.S. MLSs",
    sublabel: "via RPR National Exchange",
    desc: "Your listing crosses state lines through the national professional MLS data exchange. Domestic reach beyond South Florida.",
  },
  {
    value: 437,
    display: "437",
    suffix: "+",
    label: "Intl. Agreements",
    sublabel: "Global Referral Network",
    desc: "Signed referral agreements with real estate associations worldwide — creating active deal flow for listings with international appeal.",
  },
  {
    value: 25,
    display: "25",
    suffix: "",
    label: "Years Active",
    sublabel: "Licensed Since 2001",
    desc: "A quarter-century of South Florida transactions. The relationships and market intelligence behind every strategy review.",
  },
];

function AnimatedNumber({ display, prefix = "", suffix }: { display: string; prefix?: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <span className="font-serif" style={{ lineHeight: 1 }}>
        {prefix && <span className="text-white/50">{prefix}</span>}
        {display}
        {suffix && <span className="text-gold/80">{suffix}</span>}
      </span>
    </div>
  );
}

function StatCard({ stat, index, delay = 0 }: { stat: typeof TOP_STATS[0]; index: number; delay?: number; key?: string }) {
  return (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: delay + index * 0.09 }}
      className="group relative flex flex-col justify-between border-b border-gold/15 p-8 transition-colors duration-500 hover:bg-white/[0.03] lg:border-b-0 lg:border-r lg:p-10 last:border-r-0"
    >
      {/* Subtle gold accent bar at top */}
      <div className="mb-8 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-full group-hover:bg-gold/20" />

      {/* Number */}
      <div className="font-serif text-gold" style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", lineHeight: 1 }}>
        <AnimatedNumber display={stat.display} prefix={(stat as any).prefix} suffix={stat.suffix} />
      </div>

      {/* Labels */}
      <div className="mt-5">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-white">{stat.label}</p>
        <p className="font-mono mt-1 text-[9px] uppercase tracking-[0.2em] text-gold/60">{stat.sublabel}</p>
      </div>

      {/* Description — reveals on hover, visible always on mobile */}
      <p className="mt-5 font-sans text-sm leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/65">
        {stat.desc}
      </p>
    </motion.div>
  );
}

export const ReachAdvantage = () => {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="relative border-b border-gold/15 px-6 py-16 md:py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          The Reach Advantage · United Realty Group
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-6 max-w-5xl font-serif leading-[1.08] text-white"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
        >
          The day your listing goes live,<br />
          <em className="not-italic italic text-gold">it reaches 93,000 professional agents.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55"
        >
          This is not a single listing. It is a distribution infrastructure — every number below is active the moment your property enters the MLS.
        </motion.p>
      </div>

      {/* ── Top Stats Row ─────────────────────────────────────── */}
      <div className="relative grid border-b border-gold/15 lg:grid-cols-3">
        {TOP_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* ── Mid Divider — featured callout ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative border-b border-gold/15 bg-gold/[0.04] px-6 py-10 text-center"
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {[
            { v: "#1", l: "Realtor Assoc. in the U.S." },
            { v: "19", l: "Florida Offices" },
            { v: "Day 1", l: "Full activation" },
            { v: "CLHMS", l: "Luxury certified" },
          ].map((item) => (
            <div key={item.l} className="text-center">
              <div className="font-serif text-2xl font-bold text-gold lg:text-3xl">{item.v}</div>
              <div className="font-mono mt-1 text-[8px] uppercase tracking-[0.22em] text-white/40">{item.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom Stats Row ──────────────────────────────────── */}
      <div className="relative grid border-b border-gold/15 lg:grid-cols-3">
        {BOTTOM_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} delay={0.1} />
        ))}
      </div>

      {/* ── Quote ─────────────────────────────────────────────── */}
      <div className="relative px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="font-serif font-bold text-gold/[0.06]" style={{ fontSize: "clamp(9rem, 28vw, 22rem)", lineHeight: 1 }}>"</span>
        </div>
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative mx-auto max-w-4xl font-serif italic leading-[1.1] text-white"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3.8rem)" }}
        >
          Features describe a property.<br />
          Distribution determines its price.
        </motion.blockquote>
        <div className="mt-8 flex items-center justify-center gap-5">
          <span className="h-px w-14 bg-gold/35" />
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/55">{CONTACT.shortLicense}</p>
          <span className="h-px w-14 bg-gold/35" />
        </div>
      </div>

    </section>
  );
};
