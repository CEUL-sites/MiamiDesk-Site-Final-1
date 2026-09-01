import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera, Globe2, MessagesSquare, Radar } from "lucide-react";
import { LazyVideo } from "./LazyVideo";

// Homepage-only merge of ReachAdvantage + ListingSystem — the structural
// argument made once, at full strength: what happens to the listing in the
// MLS ecosystem, then how the listing system executes on that placement.
// ReachAdvantage and ListingSystem remain unchanged for SellSouthFloridaPage,
// which still uses them as separate sections.

const TOP_STATS = [
  {
    value: 93000,
    display: "93,000",
    suffix: "",
    label: "Member Agents",
    sublabel: "Miami & South Florida REALTORS®",
    desc: "Every member agent works from the same MLS inventory your home is placed into.",
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
    sublabel: "Florida office network",
    desc: "A full-service brokerage infrastructure supporting listing execution and local market coordination.",
  },
];

const PILLARS = [
  {
    icon: Camera,
    step: "01",
    title: "Media that earns the click",
    body:
      "Pro photography, cinematic video, and staging direction — approved before launch. Buyers screen online first; your home wins on the first frame.",
  },
  {
    icon: Globe2,
    step: "02",
    title: "Distribution beyond the MLS",
    body:
      "Into the Miami MLS ecosystem 93,000 agents work from daily — then syndicated to major U.S. portals and 200+ international channels in 19 languages.",
  },
  {
    icon: Radar,
    step: "03",
    title: "Buyer-agent activation",
    body:
      "Direct outreach to the agents working buyers in your price band — local, relocation, and international — so your home is shown, not just listed.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    title: "Weekly reporting, real strategy",
    body:
      "Showings, feedback, and analytics every week by WhatsApp or email — with pricing moves recommended from the data, not guesswork.",
  },
];

function AnimatedNumber({ display, suffix }: { display: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <span className="font-serif" style={{ lineHeight: 1 }}>
        {display}
        {suffix && <span className="text-gold/80">{suffix}</span>}
      </span>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof TOP_STATS[0]; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.09 }}
      className="group relative flex flex-col justify-between border-b border-gold/15 p-6 transition-all duration-500 hover:bg-white/[0.04] md:p-10 lg:border-b-0 lg:border-r last:border-r-0"
    >
      <div>
        <div className="mb-4 h-0.5 w-12 bg-gold/50 transition-all duration-500 group-hover:w-full group-hover:bg-gold" />
        <div className="font-serif text-gold tracking-tight" style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.2rem)", lineHeight: 1 }}>
          <AnimatedNumber display={stat.display} suffix={stat.suffix} />
        </div>
        <div className="mt-4 md:mt-5">
          <p className="font-sans text-base font-semibold uppercase tracking-[0.14em] text-white">{stat.label}</p>
          <p className="font-mono mt-1 text-[11px] uppercase tracking-[0.2em] text-gold/75">{stat.sublabel}</p>
        </div>
      </div>
      <p className="mt-4 font-sans text-sm leading-relaxed text-white/75 md:mt-6">{stat.desc}</p>
    </motion.div>
  );
}

export function Distribution() {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Cinematic reach backdrop */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.10]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      {/* ── Header — the ecosystem-placement argument ──────────── */}
      <div className="relative border-b border-gold/15 px-6 py-8 text-center md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold"
        >
          Distribution · United Realty Group
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-4 max-w-5xl font-serif leading-[1.08] text-white md:mt-6"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
        >
          Your listing enters the ecosystem<br />
          <em className="italic text-gold">93,000 South Florida agents work from every day.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/75 md:mt-6"
        >
          Buyers don't find homes — their agents do. Your listing goes into the same
          MLS inventory those agents search daily, in South Florida and in 75+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-3 md:mt-10"
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
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            Powered by membership in the Miami and South Florida REALTORS®
          </p>
        </motion.div>
      </div>

      {/* ── Stats row ────────────────────────────────────────────── */}
      <div className="relative grid border-b border-gold/15 lg:grid-cols-3">
        {TOP_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <details className="relative mx-auto max-w-6xl border-b border-gold/15 px-6 py-5 text-white/70">
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
          Distribution eligibility
        </summary>
        <p className="mt-3 max-w-4xl font-sans text-xs leading-relaxed">
          Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability.
        </p>
      </details>

      {/* ── How the listing system executes ─────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">The Listing System</p>
        <h3 className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-white md:mt-4 md:text-4xl">
          What actually happens when your home lists with Carlos.
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {PILLARS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="group relative rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-serif text-[2.2rem] leading-none text-gold md:text-[2.8rem]">{step}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16 md:mt-5" />
              <h4 className="mt-4 font-serif text-lg leading-snug text-white md:mt-5">{title}</h4>
              <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-white/70 md:mt-3">{body}</p>
            </div>
          ))}
        </div>

        {/* Single CTA naming a specific outcome */}
        <div className="mt-10 flex justify-center md:mt-14">
          <a
            href="/sell-south-florida#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-9 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-white hover:text-navy-deep shadow-[0_8px_25px_rgba(176,141,87,0.35)] md:py-4.5"
          >
            Request Your Distribution Analysis
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}
