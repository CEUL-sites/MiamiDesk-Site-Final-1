import { motion, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(176,141,87,0.18),transparent_45%),radial-gradient(ellipse_at_80%_75%,rgba(11,30,63,0.8),transparent_55%)]" />

      <div className="relative flex min-h-screen items-center px-6 py-28 sm:px-10 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl"
        >
          {/* Credential badge */}
          <motion.p variants={itemVariants} className="font-mono mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
            Carlos Uzcategui · FL Realtor® SL705771 · Est. 2001
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-normal leading-[1.08] tracking-tight text-white"
            style={{ fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)" }}
          >
            List Your South Florida<br />
            Property With<br />
            <span className="italic text-gold">Strategic Exposure.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={itemVariants} className="mt-6 font-serif text-[1.1rem] italic font-normal leading-snug text-white/75">
            Your property deserves market positioning, not just a listing.
          </motion.p>

          {/* Supporting subtitle */}
          <motion.p variants={itemVariants} className="mt-4 max-w-xl font-sans text-[0.95rem] font-light leading-[1.85] text-white/55">
            Senior seller advisory backed by 25 years of Florida market experience — MLS positioning,{" "}
            <span className="font-medium text-white/85">{ASSOCIATION_STATS.memberCount.toLocaleString()}-member association</span>
            {" "}reach, buyer-agent visibility, and cross-border market context that extends to Madrid.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-gold px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft"
            >
              Request a Private Seller Strategy Review
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              <MessageSquare size={14} />
              WhatsApp Carlos
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-4 gap-6 border-t border-white/10 pt-9 sm:max-w-lg"
          >
            {[
              { value: "25",    label: "Years Licensed" },
              { value: "93K",   label: "Member Agents" },
              { value: "$69B",  label: "2025 Volume" },
              { value: "200+",  label: "Global Portals" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-2xl text-white lg:text-3xl">{s.value}</div>
                <div className="font-mono mt-1 text-[7px] uppercase tracking-[0.18em] text-gold/65">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Credentials pill */}
          <motion.div variants={itemVariants} className="mt-7 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="text-gold flex-shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
            </span>
          </motion.div>

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
