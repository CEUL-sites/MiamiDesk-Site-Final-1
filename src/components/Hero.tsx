import { motion, useMotionValue, useSpring, useTransform, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { type CSSProperties, Fragment, type MouseEvent, useEffect, useRef, useState } from "react";
import { ASSOCIATION_STATS, CONTACT } from "../constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* ─── Ring dots ─────────────────────────────────────────────── */
function RingDots({ count, highlight }: { count: number; highlight: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 2 * Math.PI;
        const x = 50 + 50 * Math.cos(angle);
        const y = 50 + 50 * Math.sin(angle);
        const isLit = i % highlight === 0;
        return (
          <motion.span
            key={i}
            animate={{ opacity: isLit ? [0.5, 1, 0.5] : [0.1, 0.35, 0.1] }}
            transition={{ duration: 2.4 + i * 0.2, repeat: Infinity, delay: i * 0.12 }}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: isLit ? 5 : 3,
              height: isLit ? 5 : 3,
              borderRadius: "50%",
              backgroundColor: isLit ? "#B08D57" : "rgba(176,141,87,0.55)",
              transform: "translate(-50%,-50%)",
            }}
          />
        );
      })}
    </>
  );
}

/* ─── Stat badge ────────────────────────────────────────────── */
function StatBadge({
  value, label, delay, style,
}: {
  value: string; label: string; delay: number;
  style: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      style={{ position: "absolute", ...style }}
      className="flex flex-col items-center gap-0.5 border border-gold/30 bg-navy-deep/80 px-3 py-2 backdrop-blur-sm"
    >
      <span className="font-serif text-lg leading-none text-gold">{value}</span>
      <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/45 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

/* ─── Network visualization (right panel) ──────────────────── */
function NetworkViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { stiffness: 45, damping: 16 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springCfg);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0); }

  // Rings: each defined as % of the square container
  const rings = [
    { size: "86%", border: "rgba(176,141,87,0.18)", dots: 28, highlight: 7, duration: 48, delay: 0.4 },
    { size: "64%", border: "rgba(176,141,87,0.30)", dots: 20, highlight: 5, duration: 36, delay: 0.6 },
    { size: "42%", border: "rgba(176,141,87,0.45)", dots: 12, highlight: 3, duration: 26, delay: 0.8 },
  ];

  // Badges at compass points — positioned relative to the square viz div
  const badges = [
    { value: "93K",  label: "Member Agents",  delay: 1.1, style: { top: "50%",  right: "-2%", transform: "translateY(-50%)" } },
    { value: "200+", label: "Global Portals", delay: 1.25, style: { top: "-2%",  left: "50%",  transform: "translateX(-50%)" } },
    { value: "$69B", label: "2025 Volume",    delay: 1.4, style: { top: "50%",  left: "-2%", transform: "translateY(-50%)" } },
    { value: "19",   label: "Languages",      delay: 1.55, style: { bottom: "-2%", left: "50%", transform: "translateX(-50%)" } },
  ];

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center"
      style={{ perspective: 900 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Square container — guarantees rings render as perfect circles */}
      <motion.div style={{ rotateX, rotateY }} className="relative select-none">
        <div style={{ width: "min(52vh, 400px)", aspectRatio: "1 / 1", position: "relative" }}>
          {/* Ambient glow */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(circle at 40% 38%, rgba(176,141,87,0.14) 0%, transparent 65%)",
            filter: "blur(20px)",
          }} />

          {/* Concentric rings — centered via top/left 50% + translate */}
          {rings.map((ring, ri) => (
            <motion.div
              key={ri}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{
                opacity: { delay: ring.delay, duration: 1 },
                rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
              }}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: ring.size, height: ring.size,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                border: `1px solid ${ring.border}`,
              }}
            >
              <RingDots count={ring.dots} highlight={ring.highlight} />
            </motion.div>
          ))}

          {/* Central sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: EASE }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "24%", height: "24%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #1e3d6b 0%, #06111F 100%)",
              border: "1.5px solid rgba(176,141,87,0.55)",
              boxShadow: "0 0 48px rgba(176,141,87,0.22), inset 0 0 16px rgba(176,141,87,0.10)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ fontFamily: "Playfair Display, serif", color: "#B08D57", fontSize: "1.5rem", lineHeight: 1 }}>25</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace", color: "rgba(255,255,255,0.4)", fontSize: "0.42rem", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 3 }}>YRS</span>
          </motion.div>

          {/* Stat badges */}
          {badges.map((b) => (
            <Fragment key={b.label}>
              <StatBadge value={b.value} label={b.label} delay={b.delay} style={b.style} />
            </Fragment>
          ))}

          {/* Association label */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              position: "absolute", bottom: "-16%", left: 0, right: 0,
              textAlign: "center",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "0.44rem", textTransform: "uppercase",
              letterSpacing: "0.22em", color: "rgba(255,255,255,0.22)",
            }}
          >
            {ASSOCIATION_STATS.associationName}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setHasScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-deep text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(176,141,87,0.16),transparent_40%),radial-gradient(ellipse_at_85%_80%,rgba(11,30,63,0.7),transparent_50%)]" />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-35" />

      <div className="relative grid min-h-screen lg:grid-cols-[54%_46%]">

        {/* ── LEFT: Copy — everything above the fold ── */}
        <div className="relative z-10 flex min-h-screen items-center px-6 py-28 sm:px-10 lg:pl-16 lg:pr-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xl">

            {/* Credential badge */}
            <motion.p variants={itemVariants} className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
              Carlos Uzcategui · FL Realtor® SL705771 · Est. 2001
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-serif font-normal leading-[1.08] tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.2rem)" }}
            >
              Sell Your South Florida<br />
              Property with the World's<br />
              <span className="italic text-gold">Largest Local Realtor Network.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="mt-5 font-serif text-[1.05rem] italic font-normal leading-snug text-white/80">
              Real estate is local. Peak value is global.
            </motion.p>

            {/* Supporting subtitle */}
            <motion.p variants={itemVariants} className="mt-3 max-w-lg font-sans text-[0.9rem] font-light leading-[1.8] text-white/55">
              25 years of expert positioning inside{" "}
              <span className="font-medium text-white/85">{ASSOCIATION_STATS.memberCount.toLocaleString()} member agents</span>
              {" "}— Miami and South Florida REALTORS®. 200+ global portals. Madrid advisory included.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-gold px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft"
              >
                Get Your Free Strategy Review
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                <MessageSquare size={14} />
                WhatsApp Now
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {[
                { value: "25",    label: "Years Licensed" },
                { value: "93K",   label: "Member Agents" },
                { value: "$69B",  label: "2025 Volume" },
                { value: "200+",  label: "Global Portals" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-l-gold/40 pl-4">
                  <div className="font-serif text-2xl text-white lg:text-3xl">{s.value}</div>
                  <div className="font-mono mt-1 text-[7px] uppercase tracking-[0.18em] text-gold/65">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* URG credibility pill */}
            <motion.div variants={itemVariants} className="mt-7 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
              <BadgeCheck size={14} className="text-gold flex-shrink-0" />
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                United Realty Group · {CONTACT.shortLicense}
              </span>
            </motion.div>

          </motion.div>
        </div>

        {/* ── RIGHT: Network visualization ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 1.2 }}
          className="relative hidden min-h-screen overflow-hidden lg:flex lg:items-center lg:justify-center"
          style={{ clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="absolute inset-0 bg-navy/35" />
          <div className="absolute left-[5.2%] top-0 h-full w-px bg-gold/45" />

          {/* Visualization fills the panel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <NetworkViz />
          </div>

          {/* Bottom hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="absolute bottom-10 left-0 right-0 text-center font-mono text-[7px] uppercase tracking-[0.3em] text-white/20"
          >
            Move cursor to interact
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] text-white/25">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="block h-6 w-px bg-gold"
            animate={{ y: [-24, 40] }}
            transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
