import { motion, type Variants } from "motion/react";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export interface PageHeroProps {
  eyebrow: string;
  headline: string;
  headlineGold?: string;
  subhead: string;
  ctaLabel: string;
  ctaHref: string;
  whatsappHref: string;
  badge?: string;
}

export function PageHero({
  eyebrow,
  headline,
  headlineGold,
  subhead,
  ctaLabel,
  ctaHref,
  whatsappHref,
  badge,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[65vh] overflow-hidden bg-navy-deep text-white flex items-start">
      {/* Layered radial gradients — same pattern as Hero.tsx */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_20%,rgba(11,30,63,0.95),rgba(6,17,31,1))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,rgba(176,141,87,0.10),transparent_42%)]" />

      {/* Decorative gold corner accent — top-right */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rotate-45 border border-gold/10 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rotate-45 border border-gold/15 opacity-40"
        aria-hidden="true"
      />

      <div className="relative w-full px-6 pt-32 pb-16 sm:px-10 sm:pt-36 sm:pb-20 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-mono mb-5 text-gold uppercase tracking-[0.3em]"
            style={{ fontSize: "0.62rem" }}
          >
            {eyebrow}
          </motion.p>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-white leading-[1.07]"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)", fontWeight: 400 }}
          >
            {headline}
            {headlineGold && (
              <>
                <br />
                <em className="text-gold not-italic font-serif italic">{headlineGold}</em>
              </>
            )}
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="mt-6 font-sans font-light text-white/60 leading-[1.85] max-w-xl"
            style={{ fontSize: "1.05rem" }}
          >
            {subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy transition-all duration-300 hover:bg-gold-soft active:scale-95"
            >
              {ctaLabel}
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-gold hover:text-gold active:scale-95"
            >
              <MessageSquare size={14} />
              WhatsApp Our Team
            </a>
          </motion.div>

          {/* Optional credential badge */}
          {badge && (
            <motion.div
              variants={itemVariants}
              className="mt-8 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm"
            >
              <BadgeCheck size={14} className="text-gold flex-shrink-0" />
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
                {badge}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
