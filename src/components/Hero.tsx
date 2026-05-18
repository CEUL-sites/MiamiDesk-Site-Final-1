import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { BadgeCheck, ChevronRight } from "lucide-react";
import { Fragment, type MouseEvent, useEffect, useRef, useState } from "react";
import { ASSOCIATION_STATS, CONTACT } from "../constants";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
};

const NETWORK_STATS = [
  { value: "93K",  label: "Member Agents",  angle:  20 },
  { value: "200+", label: "Global Portals", angle: 155 },
  { value: "$69B", label: "2025 Volume",    angle: 265 },
  { value: "19",   label: "Languages",      angle:  90 },
];

/** Single orbital ring rendered as a tilted ellipse */
function OrbitalRing({
  tiltX, tiltZ, radiusPct, delay, dotCount = 12, opacity = 0.35
}: {
  tiltX: number; tiltZ: number; radiusPct: number;
  delay: number; dotCount?: number; opacity?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ delay, duration: 1.2 }}
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: 600 }}
    >
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 28 + delay * 6, repeat: Infinity, ease: "linear" }}
        style={{
          width: `${radiusPct * 2}%`,
          height: `${radiusPct * 2}%`,
          borderRadius: "50%",
          border: "1px solid rgba(176,141,87,0.28)",
          position: "relative",
          transform: `rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`,
        }}
      >
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (i / dotCount) * 360;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 50 * Math.cos(rad);
          const y = 50 + 50 * Math.sin(rad);
          const isHighlight = i % Math.floor(dotCount / 3) === 0;
          return (
            <motion.span
              key={i}
              animate={{ opacity: isHighlight ? [0.4, 1, 0.4] : [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: isHighlight ? 5 : 3,
                height: isHighlight ? 5 : 3,
                borderRadius: "50%",
                backgroundColor: isHighlight ? "#B08D57" : "rgba(176,141,87,0.6)",
                transform: "translate(-50%,-50%)",
              }}
            />
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/** Floating stat badge positioned by polar angle */
function NetworkBadge({ value, label, angle, delay }: {
  value: string; label: string; angle: number; delay: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const r = 42; // % from center
  const x = 50 + r * Math.cos(rad);
  const y = 50 + r * Math.sin(rad);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
      className="flex flex-col items-center gap-0.5 px-3 py-2 border border-gold/25 bg-navy-deep/70 backdrop-blur-sm"
    >
      <span className="font-serif text-xl text-gold leading-none">{value}</span>
      <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/50 text-center leading-tight whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

/** Mouse-reactive 3D network orb */
function NetworkOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), springConfig);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900 }}
    >
      <motion.div
        style={{ rotateX, rotateY, width: "78%", height: "78%", position: "relative" }}
        className="select-none"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 40% 40%, rgba(176,141,87,0.18) 0%, rgba(6,17,31,0) 68%)",
            filter: "blur(18px)",
          }}
        />

        {/* Three orbital rings at different tilts */}
        <OrbitalRing tiltX={72} tiltZ={0}   radiusPct={46} delay={0.6} dotCount={16} opacity={0.55} />
        <OrbitalRing tiltX={55} tiltZ={60}  radiusPct={38} delay={0.9} dotCount={12} opacity={0.38} />
        <OrbitalRing tiltX={80} tiltZ={120} radiusPct={30} delay={1.2} dotCount={8}  opacity={0.28} />

        {/* Core sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="w-[32%] h-[32%] rounded-full flex flex-col items-center justify-center"
            style={{
              background: "radial-gradient(circle at 35% 35%, #1a3560 0%, #06111F 100%)",
              border: "1px solid rgba(176,141,87,0.45)",
              boxShadow: "0 0 40px rgba(176,141,87,0.2), inset 0 0 20px rgba(176,141,87,0.08)",
            }}
          >
            <span className="font-serif text-gold" style={{ fontSize: "clamp(0.9rem,2.2vw,1.5rem)", lineHeight: 1 }}>25</span>
            <span className="font-mono text-[6px] uppercase tracking-[0.15em] text-white/45 mt-0.5">Years</span>
          </div>
        </motion.div>

        {/* Floating stat badges */}
        {NETWORK_STATS.map((s, i) => (
          <Fragment key={s.label}>
            <NetworkBadge value={s.value} label={s.label} angle={s.angle} delay={1.0 + i * 0.15} />
          </Fragment>
        ))}

        {/* Association name label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[6%] left-0 right-0 flex justify-center"
        >
          <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/30 text-center px-2">
            {ASSOCIATION_STATS.associationName}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-deep text-white">
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(176,141,87,0.18),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(11,30,63,0.6),transparent_45%)]" />
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-35" />

      <div className="relative grid min-h-screen lg:grid-cols-[55%_45%]">

        {/* ── LEFT: Copy ── */}
        <div className="relative z-10 flex min-h-screen items-center px-6 py-32 sm:px-10 lg:px-[8vw]">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl">

            <motion.p variants={itemVariants} className="font-mono mb-7 text-[10px] uppercase tracking-[0.28em] text-gold">
              Carlos Uzcategui · FL Realtor® SL705771 · Est. 2001
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-serif font-normal leading-[1.04] tracking-tight"
              style={{ fontSize: "clamp(3rem,7.5vw,6.4rem)" }}
            >
              Sell with the Full<br />
              Power of Miami's<br />
              <span className="italic text-gold">Realtor Network.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-8 max-w-xl font-sans text-[1.06rem] font-light leading-[1.85] text-white/70">
              25 years of South Florida transactions, activated inside{" "}
              <span className="text-white/90 font-normal">
                {ASSOCIATION_STATS.memberCount.toLocaleString()} member agents
              </span>{" "}
              — the world's largest local Realtor association. Every listing reaches 200+ global portals in 19 languages, with a direct advisory bridge between Miami and Madrid.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft"
              >
                Get Your Free Strategy Review
                <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#spain"
                className="group inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
              >
                España · Madrid Desk
                <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {[
                { value: "25", label: "Years Licensed" },
                { value: "93K", label: "Member Agents" },
                { value: "$69B", label: "2025 Volume" },
                { value: "200+", label: "Global Portals" },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-l-gold/40 pl-4">
                  <div className="font-serif text-4xl text-white">{s.value}</div>
                  <div className="font-mono mt-1.5 text-[8px] uppercase tracking-[0.2em] text-gold/70">{s.label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* ── RIGHT: 3D Interactive Network Orb ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="relative hidden min-h-screen lg:flex items-center justify-center overflow-hidden"
          style={{ clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          {/* Dark panel background */}
          <div className="absolute inset-0 bg-navy/40" />
          <div className="absolute left-[6.2%] top-0 h-full w-[1.5px] bg-gold/50" />

          {/* Orb fills the panel — absolute inset so h-full resolves correctly */}
          <div className="absolute inset-0">
            <NetworkOrb />
          </div>

          {/* Caption below orb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="absolute bottom-14 left-0 right-0 flex justify-center"
          >
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25">
              Drag to explore the network
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* URG badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden max-w-xs border border-gold/20 bg-navy/50 p-5 backdrop-blur-xl lg:block"
      >
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-1 text-gold flex-shrink-0" size={20} />
          <div>
            <p className="font-serif text-base text-white">United Realty Group</p>
            <p className="font-mono mt-1 text-[8px] uppercase tracking-[0.18em] text-white/40">
              {CONTACT.brokerageDisplay} · {CONTACT.shortLicense}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-white/10">
          <motion.span
            className="block h-7 w-px bg-gold"
            animate={{ y: [-28, 48] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
