import { motion, type Variants } from "motion/react";
import { Globe, ShieldCheck, Tag } from "lucide-react";
import { CONTACT } from "../constants";
import { HeroSellerForm } from "./HeroSellerForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* Platform credentials bar */
const PROOF_BAR = [
  { value: "93,000",  label: "Members"                   },
  { value: "260+",    label: "MLS Connections"            },
  { value: "300+",    label: "Partner Associations"       },
  { value: "437+",    label: "International Agreements"   },
  { value: "500+",    label: "Websites"                   },
  { value: "Licensed Since 2001", label: "" },
];

export function Hero() {
  return (
    <section className="hero-root relative min-h-screen overflow-hidden bg-[#060D18] text-white flex flex-col">

      <style>{`
        .hero-bg-warm {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 90% 70% at 15% 60%, rgba(176,120,40,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 80% 80%, rgba(20,55,120,0.30) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(10,25,60,0.8) 0%, transparent 65%),
            linear-gradient(175deg, #0A1830 0%, #070E18 45%, #050A14 100%);
        }
        @keyframes ho1 {
          0%,100% { transform:translate(0,0) scale(1); }
          40% { transform:translate(30px,-40px) scale(1.1); }
          70% { transform:translate(-20px,25px) scale(0.93); }
        }
        @keyframes ho2 {
          0%,100% { transform:translate(0,0) scale(1); }
          50% { transform:translate(-35px,20px) scale(1.08); }
        }
        .hero-orb-a {
          position:absolute; border-radius:50%; pointer-events:none;
          width:680px; height:680px; top:-120px; left:-160px;
          background:radial-gradient(ellipse, rgba(176,120,40,0.14) 0%, transparent 60%);
          animation: ho1 20s ease-in-out infinite;
        }
        .hero-orb-b {
          position:absolute; border-radius:50%; pointer-events:none;
          width:520px; height:520px; bottom:-80px; right:-60px;
          background:radial-gradient(ellipse, rgba(30,70,150,0.18) 0%, rgba(176,141,87,0.07) 50%, transparent 70%);
          animation: ho2 25s ease-in-out infinite;
        }
        .hero-grain {
          position:absolute; inset:0; pointer-events:none; opacity:0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(176,141,87,0.03) 1px, transparent 1px),
            linear-gradient(90deg,rgba(176,141,87,0.03) 1px, transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
        }
        .hero-vignette {
          position:absolute; bottom:0; left:0; right:0; height:280px; pointer-events:none;
          background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
        }
        .hero-pill {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .hero-pill:hover {
          border-color: rgba(176,141,87,0.6);
          background: rgba(176,141,87,0.1);
          color: #D4AE78;
        }
        .hero-stats-bar {
          background: rgba(10,21,37,0.8);
          border-top: 1px solid rgba(176,141,87,0.12);
          border-bottom: 1px solid rgba(176,141,87,0.12);
          backdrop-filter: blur(16px);
        }
        @keyframes hero-rule {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-a, .hero-orb-b { animation: none; }
        }
      `}</style>

      <div className="hero-bg-warm"  aria-hidden="true" />
      <div className="hero-orb-a"    aria-hidden="true" />
      <div className="hero-orb-b"    aria-hidden="true" />
      <div className="hero-grain"    aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-8 sm:px-10"
      >
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── Left: message ──────────────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Eyebrow */}
            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">
                  South Florida · Miami MLS · Spain Desk · Global Referral Network
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.6rem)", fontWeight: 400 }}
            >
              Sell With the Reach of the<br />
              <em className="not-italic italic text-gold">World's Largest Local Realtor® Network.</em>
            </motion.h1>

            {/* Gold rule */}
            <motion.div
              variants={item}
              className="mt-5 h-px w-14 bg-gold/50 origin-left mx-auto lg:mx-0"
              style={{ animation: "hero-rule 0.8s ease forwards 0.8s", transform: "scaleX(0)", opacity: 0 }}
            />

            {/* Network reach — scrolling ticker */}
            <motion.div variants={item} className="relative mt-6 mx-auto lg:mx-0 max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]">
              <style>{`
                @keyframes exposure-scroll {
                  from { transform: translateX(0); }
                  to   { transform: translateX(-50%); }
                }
                .exposure-track {
                  animation: exposure-scroll 22s linear infinite;
                  display: flex;
                  will-change: transform;
                }
                .exposure-track:hover { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) {
                  .exposure-track { animation: none; }
                }
              `}</style>
              {/* Left/right fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#060D18] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#060D18] to-transparent" />
              <div className="exposure-track">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 items-center gap-1.5 pl-6 pr-16 py-2.5 font-mono text-[8px] uppercase tracking-[0.16em] whitespace-nowrap text-white/40">
                    Senior seller representation ·{" "}
                    <span className="text-gold/75">South Florida &amp; select intl. owners</span>
                    {" "}· one of the world's most powerful real estate networks ·{" "}
                    <span className="text-white/75">93,000</span> member agents ·{" "}
                    <span className="text-white/75">260+</span> MLS connections ·{" "}
                    <span className="text-white/75">300+</span> global partner associations ·{" "}
                    <span className="text-white/75">437+</span> international agreements ·{" "}
                    <span className="text-white/75">500+</span> websites where eligible
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Trust row */}
            <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
              {[
                { icon: ShieldCheck, text: "Licensed Since 2001" },
                { icon: Tag,         text: "CLHMS · Certified Seller Rep" },
                { icon: Globe,       text: "United Realty Group" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  <Icon size={12} className="text-gold/70" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gold px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90 whitespace-nowrap"
              >
                Request Seller Strategy Review
              </a>
              <a
                href="/spain-desk"
                className="hero-pill inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 whitespace-nowrap"
              >
                Submit a Property for Miami Exposure →
              </a>
            </motion.div>

            {/* Compliance micro-line */}
            <motion.p variants={item} className="mt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/25 max-w-md mx-auto lg:mx-0">
              Eligible exposure varies by property type, MLS rules, platform participation, and syndication partner availability.
            </motion.p>
          </div>

          {/* ── Right: lead capture ───────────────────────── */}
          <motion.div variants={item} className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroSellerForm />
          </motion.div>

        </div>
      </motion.div>

      {/* ── Platform credentials bar ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 hero-stats-bar w-full"
      >
        <div className="mx-auto max-w-5xl px-5 py-3 flex items-center gap-4 overflow-x-auto scrollbar-none">
          <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.28em] text-gold border border-gold/30 px-2 py-1 whitespace-nowrap">
            Network
          </span>
          <div className="h-3 w-px bg-white/15 flex-shrink-0" />
          {PROOF_BAR.map((s, i) => (
            <div key={`${s.value}${s.label}`} className="flex items-center gap-1 flex-shrink-0">
              {i > 0 && <span className="text-white/15 text-xs mr-1">·</span>}
              <span className="font-mono text-[11px] font-semibold text-white/85 whitespace-nowrap">{s.value}</span>
              {s.label && <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35 ml-1 whitespace-nowrap">{s.label}</span>}
            </div>
          ))}
          <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.16em] text-white/25 whitespace-nowrap ml-1">
            {CONTACT.shortLicense}
          </span>
        </div>
      </motion.div>

    </section>
  );
}
