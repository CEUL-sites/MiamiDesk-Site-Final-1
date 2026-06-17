import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LazyVideo } from "./LazyVideo";
import { GlobalReachMap } from "./GlobalReachMap";
const TOP_STATS = [
  {
    value: 93000,
    display: "93,000",
    suffix: "",
    label: "Member Agents",
    sublabel: "Miami & South Florida REALTORS®",
    desc: "Every member agent can put your home in front of their active buyers.",
  },
  {
    value: 437,
    display: "437",
    suffix: "+",
    label: "International Agreements",
    sublabel: "MIAMI Global Council",
    desc: "Direct buyer markets across 75+ countries — more than any other local association.",
  },
  {
    value: 3500,
    display: "3,500",
    suffix: "+",
    label: "United Realty Group Agents",
    sublabel: "#1 Florida · Most Closed Homes",
    desc: "Florida's #1 brokerage by closed homes, behind every listing.",
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
      className="group relative flex flex-col justify-between border-b border-gold/15 p-5 transition-colors duration-500 hover:bg-white/[0.03] md:p-8 lg:border-b-0 lg:border-r lg:p-10 last:border-r-0"
    >
      {/* Subtle gold accent bar at top */}
      <div className="mb-4 md:mb-8 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-full group-hover:bg-gold/20" />

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
      <p className="mt-5 font-sans text-sm leading-relaxed text-white/70">
        {stat.desc}
      </p>
    </motion.div>
  );
}

export const ReachAdvantage = () => {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Cinematic reach backdrop */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.10]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      {/* ── Header ───────────────────────────────────────────── */}
      <div className="relative border-b border-gold/15 px-6 py-10 md:py-16 text-center">
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
          Your listing enters the system<br />
          <em className="not-italic italic text-gold">93,000 South Florida agents open every day.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/70"
        >
          Buyers don't find homes — their agents do. Your listing goes straight into
          the inventory those agents search every day, in South Florida and in 75+ countries.
        </motion.p>

        {/* MIAMI REALTORS® attribution — source of the reach network */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <img
            src="/images/miami-realtors-logo.png"
            alt="MIAMI Association of REALTORS®"
            width="170"
            height="58"
            loading="lazy"
            className="h-9 w-auto opacity-85"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
            Powered by membership in the Miami and South Florida REALTORS®
          </p>
        </motion.div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────────── */}
      <div className="relative grid border-b border-gold/15 lg:grid-cols-3">
        {TOP_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* ── Signature arc map ─────────────────────────────────── */}
      <div className="px-6 pb-14 md:px-10">
        <GlobalReachMap />
      </div>

    </section>
  );
};
