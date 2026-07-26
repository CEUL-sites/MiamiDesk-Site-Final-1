import { motion, type Variants } from "motion/react";
import { ArrowRight, BadgeCheck, Globe2, MessageSquare, ShieldCheck } from "lucide-react";
import { CONTACT } from "../constants";
import { trackContact } from "../lib/analytics";
import { HeroBackground } from "./HeroBackground";
import { HeroSellerForm } from "./HeroSellerForm";
import { LazyVideo } from "./LazyVideo";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const DISTRIBUTION_PROOF = [
  { value: "93,000", label: "Association members" },
  { value: "200+", label: "Websites and apps" },
  { value: "260+", label: "U.S. MLSs via RPR" },
  { value: "19", label: "Languages" },
] as const;

export function Hero() {
  return (
    <section className="hero-root relative overflow-hidden bg-[#060D18] text-white">
      <HeroBackground />
      <LazyVideo
        idle
        src="/videos/luxury_waterfront_estate.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.2]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060D18]/90 via-[#060D18]/68 to-[#060D18]/95"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(176,141,87,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(176,141,87,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-10 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:pb-14 lg:pt-32"
      >
        <div className="max-w-3xl text-left">
          <motion.h1
            variants={item}
            className="font-serif font-normal leading-[1.02] text-white"
            style={{ fontSize: "clamp(2.55rem, 5.7vw, 5.15rem)" }}
          >
            Know How Your Property Should Be Positioned Before You List.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Receive a private MLS-based review of your property’s likely value range, competitive position, buyer profile and recommended launch strategy—prepared personally by Carlos Uzcategui, Florida Realtor® since 2001.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#list-here"
              className="hero-cta-main inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep"
            >
              Request My Property Strategy
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "homepage_hero_secondary")}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-white/20 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-gold/60 hover:text-gold"
            >
              <MessageSquare size={15} aria-hidden="true" />
              Speak With Carlos on WhatsApp
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70"
          >
            Private review · No listing commitment · Personal response from Carlos
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 grid max-w-2xl grid-cols-1 gap-3 border-y border-gold/20 py-5 sm:grid-cols-3 sm:gap-5"
          >
            {[
              { icon: ShieldCheck, text: "Florida Realtor® since 2001" },
              { icon: BadgeCheck, text: "CLHMS · Seller Representative" },
              { icon: Globe2, text: "United Realty Group" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/72"
              >
                <Icon size={14} className="shrink-0 text-gold" aria-hidden="true" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          id="list-here"
          variants={item}
          className="w-full scroll-mt-24 lg:justify-self-end"
        >
          <HeroSellerForm />
        </motion.div>
      </motion.div>

      <div className="relative z-10 border-t border-white/10 bg-[#060D18]/82 px-5 py-5 backdrop-blur-sm sm:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
          {DISTRIBUTION_PROOF.map((proof) => (
            <div key={proof.label} className="border-l border-gold/25 pl-3 sm:pl-5">
              <p className="font-serif text-2xl text-gold sm:text-3xl">{proof.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/70">
                {proof.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-7xl font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
          United Realty Group · 3,500+ agents · 20 Florida offices · Distribution varies by property eligibility, MLS rules, platform participation and syndication availability.
        </p>
      </div>
    </section>
  );
}
