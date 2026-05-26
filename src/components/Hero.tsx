import { motion, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare, TrendingUp, Users, Globe, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "../constants";

/* ─── Count-up hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return val;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const panelItem: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE } },
};

const CHECKLIST = [
  "Pricing analysis with local comps — delivered in 24h",
  "Professional MLS positioning via United Realty Group",
  "International buyer pipeline: South Florida, Spain, LATAM",
];

const STATS = [
  { value: 93000, display: "93K",  suffix: "",   label: "MLS Member Agents" },
  { value: 200,   display: "200+", suffix: "+",  label: "Global Portals"    },
  { value: 19,    display: "19",   suffix: "",   label: "Florida Offices"   },
  { value: 25,    display: "25",   suffix: "",   label: "Years Licensed"    },
];

/* ─── Hero ─────────────────────────────────────────────────── */
export function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const count93k  = useCountUp(93,  1400, statsVisible);
  const count200  = useCountUp(200, 1600, statsVisible);
  const count19   = useCountUp(19,  1000, statsVisible);
  const count25   = useCountUp(25,  1000, statsVisible);
  const countDisplays = [`${count93k}K`, `${count200}+`, `${count19}`, `${count25}`];

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="hero-root relative min-h-screen overflow-hidden bg-navy-deep text-white">
      <style>{`
        @keyframes hero-orb-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%  { transform: translate(40px,-60px) scale(1.15); }
          66%  { transform: translate(-30px,40px) scale(0.92); }
        }
        @keyframes hero-orb-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%  { transform: translate(-50px,30px) scale(1.1); }
          70%  { transform: translate(35px,-45px) scale(0.95); }
        }
        @keyframes hero-orb-3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%  { transform: translate(25px,50px) scale(1.08); }
        }
        @keyframes hero-line {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes hero-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.4; transform: scale(0.85); }
        }
        .hero-orb-1 {
          position:absolute; border-radius:50%; pointer-events:none;
          width:700px; height:700px;
          top:-180px; left:-200px;
          background: radial-gradient(ellipse, rgba(176,141,87,0.12) 0%, transparent 65%);
          animation: hero-orb-1 18s ease-in-out infinite;
        }
        .hero-orb-2 {
          position:absolute; border-radius:50%; pointer-events:none;
          width:600px; height:600px;
          bottom:-150px; right:-100px;
          background: radial-gradient(ellipse, rgba(16,43,87,0.8) 0%, rgba(176,141,87,0.08) 50%, transparent 70%);
          animation: hero-orb-2 22s ease-in-out infinite;
        }
        .hero-orb-3 {
          position:absolute; border-radius:50%; pointer-events:none;
          width:400px; height:400px;
          top:40%; right:38%;
          background: radial-gradient(ellipse, rgba(176,141,87,0.06) 0%, transparent 60%);
          animation: hero-orb-3 14s ease-in-out infinite;
        }
        .hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(176,141,87,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(176,141,87,0.035) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
        }
        .hero-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%);
          border: 1px solid rgba(176,141,87,0.18);
          backdrop-filter: blur(8px);
        }
        .hero-stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .hero-stat-card:hover {
          border-color: rgba(176,141,87,0.35);
          background: rgba(176,141,87,0.05);
        }
        .hero-pulse-dot {
          width:8px; height:8px; border-radius:50%;
          background:#4ade80;
          animation: hero-pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
        }
        .hero-cta-primary {
          background: var(--color-gold);
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .hero-cta-primary:hover {
          background: var(--color-gold-soft);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(176,141,87,0.35);
        }
        .hero-cta-primary:active { transform: translateY(0) scale(0.97); }
        .hero-cta-secondary {
          border: 1px solid rgba(255,255,255,0.22);
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .hero-cta-secondary:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          transform: translateY(-2px);
        }
        .hero-cta-secondary:active { transform: translateY(0) scale(0.97); }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-1, .hero-orb-2, .hero-orb-3 { animation: none; }
          .hero-pulse-dot { animation: none; }
          .hero-cta-primary:hover, .hero-cta-secondary:hover { transform: none; }
        }
      `}</style>

      {/* Ambient orbs */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />
      <div className="hero-orb-3" aria-hidden="true" />

      {/* Subtle grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Photo layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-center opacity-0 transition-opacity duration-1000"
          onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = "0.22"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/50 to-navy-deep/85" />
      </div>

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16 sm:px-10 lg:flex lg:min-h-screen lg:items-center lg:gap-16 lg:px-16 lg:pt-24 lg:pb-24">

        {/* LEFT — headline + CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex-1 max-w-2xl"
        >
          <motion.p
            variants={item}
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold mb-5"
          >
            United Realty Group · Carlos Uzcategui · FL Realtor® SL705771
          </motion.p>

          <motion.h1
            variants={item}
            className="font-serif leading-[1.03] text-white"
            style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)", fontWeight: 400 }}
          >
            Real estate is local.
            <br />
            <em className="not-italic italic text-gold">
              Peak price is global.
            </em>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-5 h-px w-16 origin-left bg-gold/50"
            style={{ animation: "hero-line 0.8s ease forwards 0.9s", transform: "scaleX(0)", opacity: 0 }}
          />

          <motion.p
            variants={item}
            className="mt-6 font-sans font-light leading-relaxed text-white/60 max-w-lg"
            style={{ fontSize: "1.05rem" }}
          >
            Senior seller advisory built around pricing discipline,
            professional MLS positioning, and an international buyer pipeline
            spanning South Florida, Spain, and Latin America.
          </motion.p>

          {/* Checklist */}
          <motion.ul variants={item} className="mt-7 space-y-2.5">
            {CHECKLIST.map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                <span className="font-sans text-sm text-white/65">{line}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="hero-cta-primary group inline-flex items-center gap-2 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep"
            >
              Get My Free Strategy Review
              <ChevronRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-secondary inline-flex items-center gap-2 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white"
            >
              <MessageSquare size={14} />
              WhatsApp Our Team
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/28">
            Free · No listing commitment required
          </motion.p>

          {/* Trust bar */}
          <motion.div
            ref={statsRef}
            variants={item}
            className="mt-12 grid grid-cols-4 gap-4 border-t border-white/10 pt-8 sm:gap-6"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-serif text-2xl text-white sm:text-3xl">
                  {statsVisible ? countDisplays[i] : s.display}
                </div>
                <div className="font-mono mt-1 text-[7px] uppercase tracking-[0.15em] text-gold/60">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Credentials + audience nav */}
          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-3 py-2 backdrop-blur-sm">
              <BadgeCheck size={13} className="flex-shrink-0 text-gold" />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                CLHMS · Certified Seller Rep · FL SL705771
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/28">I am a:</span>
              {[
                { label: "Seller", href: "/sell" },
                { label: "Buyer",  href: "/buy"   },
                { label: "Agent",  href: "/agents" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="border border-white/14 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50 transition-all duration-200 hover:border-gold hover:text-gold"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — seller intelligence panel (desktop only) */}
        <motion.div
          variants={panelItem}
          initial="hidden"
          animate="visible"
          className="hidden lg:block flex-shrink-0 w-[340px] xl:w-[380px]"
        >
          <div className="hero-panel rounded-none p-7 space-y-5">

            {/* Live header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="hero-pulse-dot" />
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">
                  Miami MLS · Active
                </span>
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold/50">
                South Florida
              </span>
            </div>

            <div className="h-px bg-white/8" />

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users,     value: "93,000", label: "Buyer Agents",      sub: "Miami MLS Network"   },
                { icon: Globe,     value: "200+",   label: "Global Portals",    sub: "19 Languages"         },
                { icon: TrendingUp,value: "25 yrs", label: "Market Experience", sub: "South Florida"        },
                { icon: BadgeCheck,value: "437+",   label: "Int'l Agreements",  sub: "Agent Referral Network"},
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="hero-stat-card p-4 cursor-default"
                >
                  <s.icon size={14} className="text-gold mb-2" />
                  <div className="font-serif text-xl text-white">{s.value}</div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/55 mt-0.5">{s.label}</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/28 mt-0.5">{s.sub}</div>
                </motion.div>
              ))}
            </div>

            <div className="h-px bg-white/8" />

            {/* What sellers get */}
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-gold/70 mb-3">
                Free Strategy Review Includes
              </p>
              {[
                "Pricing analysis with neighborhood comps",
                "Buyer profile for your property type",
                "MLS positioning recommendation",
                "Timeline and market window assessment",
              ].map((line) => (
                <div key={line} className="flex items-start gap-2 mb-2">
                  <span className="mt-1 text-gold text-[10px] flex-shrink-0">✦</span>
                  <span className="font-sans text-[12px] text-white/55 leading-snug">{line}</span>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="hero-cta-primary block w-full text-center py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep"
            >
              Request Strategy Review
            </a>

            <p className="text-center font-mono text-[7px] uppercase tracking-[0.15em] text-white/22">
              United Realty Group · FL SL705771 · Equal Housing Opportunity
            </p>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/22">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="block h-6 w-px bg-gold"
            animate={{ y: [-24, 40] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
