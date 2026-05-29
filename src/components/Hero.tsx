import { motion, type Variants } from "motion/react";
import { Bot, Globe, Tag, Key, Users, ShieldCheck } from "lucide-react";
import { CONTACT } from "../constants";
import { HeroSellerForm } from "./HeroSellerForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* Secondary navigation — seller is the primary CTA (the form); these are supporting paths */
const PILLS = [
  { icon: Bot,   label: "Ask the Miami Desk AI", href: "#intelligence" },
  { icon: Key,   label: "Buy",                    href: "/buy"          },
  { icon: Globe, label: "Spain Desk",             href: "/spain-desk"   },
  { icon: Users, label: "Agent Referral",         href: "/agents"       },
];

/* Accurate reach figures — MIAMI REALTORS® Global Partner network */
const REACH_STATS = [
  { value: "93,000+", label: "Member Agents"        },
  { value: "300+",    label: "Partner Associations"  },
  { value: "2M+",     label: "Professionals"         },
  { value: "70+",     label: "Countries"             },
  { value: "500+",    label: "Web Sites"             },
];

/* ─── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="hero-root relative min-h-screen overflow-hidden bg-[#060D18] text-white flex flex-col">

      <style>{`
        /* Cinematic dusk background — luxury property left, city right */
        .hero-bg-warm {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 90% 70% at 15% 60%,  rgba(176,120,40,0.22)  0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 80% 80%,  rgba(20,55,120,0.30)   0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(10,25,60,0.8)     0%, transparent 65%),
            linear-gradient(175deg, #0A1830 0%, #070E18 45%, #050A14 100%);
        }
        /* Warm ambient orbs */
        @keyframes ho1 {
          0%,100% { transform:translate(0,0)  scale(1);    }
          40%      { transform:translate(30px,-40px) scale(1.1); }
          70%      { transform:translate(-20px,25px) scale(0.93); }
        }
        @keyframes ho2 {
          0%,100% { transform:translate(0,0)  scale(1);    }
          50%      { transform:translate(-35px,20px) scale(1.08); }
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
        /* Noise texture for photo-like grain */
        .hero-grain {
          position:absolute; inset:0; pointer-events:none; opacity:0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        /* Fine gold grid */
        .hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(176,141,87,0.03) 1px, transparent 1px),
            linear-gradient(90deg,rgba(176,141,87,0.03) 1px, transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
        }
        /* Bottom vignette */
        .hero-vignette {
          position:absolute; bottom:0; left:0; right:0; height:280px; pointer-events:none;
          background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
        }
        /* Pill buttons */
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
        /* Stats bar */
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

      {/* Background layers */}
      <div className="hero-bg-warm"  aria-hidden="true" />
      <div className="hero-orb-a"    aria-hidden="true" />
      <div className="hero-orb-b"    aria-hidden="true" />
      <div className="hero-grain"    aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-8 sm:px-10"
      >
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── Left: message ──────────────────────────────────── */}
          <div className="text-center lg:text-left">
            {/* Market eyebrow */}
            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/85">Greater Miami · Marbella · Madrid</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.1rem, 5.4vw, 4.8rem)", fontWeight: 400 }}
            >
              Real estate is local.
              <br />
              <em className="not-italic italic text-gold">Peak price is global.</em>
            </motion.h1>

            {/* Gold rule */}
            <motion.div
              variants={item}
              className="mt-5 h-px w-14 bg-gold/50 origin-left mx-auto lg:mx-0"
              style={{ animation: "hero-rule 0.8s ease forwards 0.8s", transform: "scaleX(0)", opacity: 0 }}
            />

            {/* Subheadline — seller-focused, dual market, accurate reach */}
            <motion.p
              variants={item}
              className="mt-6 max-w-xl font-sans text-base leading-relaxed text-white/60 mx-auto lg:mx-0"
            >
              Senior seller representation for owners in <span className="text-white/85">South Florida and Spain.</span>{" "}
              Your property positioned in front of <span className="text-white/85">93,000 local agents</span> and a
              global network of <span className="text-white/85">2&nbsp;million+ professionals across 70+ countries</span> —
              priced with discipline, presented to the buyer who pays the most.
            </motion.p>

            {/* Trust row */}
            <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
              {[
                { icon: ShieldCheck, text: "Licensed since 2001" },
                { icon: Tag,         text: "CLHMS Luxury Certified" },
                { icon: Globe,       text: "Miami · Madrid presence" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                  <Icon size={12} className="text-gold/70" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* Secondary navigation pills */}
            <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
              {PILLS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="hero-pill inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-sans text-[13px] text-white/70"
                >
                  <Icon size={13} className="text-gold/70" />
                  {label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: lead capture ───────────────────────────── */}
          <motion.div variants={item} className="mx-auto w-full max-w-md lg:max-w-none">
            <HeroSellerForm />
          </motion.div>

        </div>
      </motion.div>

      {/* ── Reach Advantage stats bar ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 hero-stats-bar w-full"
      >
        <div className="mx-auto max-w-5xl px-5 py-3 flex items-center gap-4 overflow-x-auto">
          <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.28em] text-gold border border-gold/30 px-2 py-1 whitespace-nowrap">
            Reach Advantage
          </span>
          <div className="h-3 w-px bg-white/15 flex-shrink-0" />
          {REACH_STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1 flex-shrink-0">
              {i > 0 && <span className="text-white/15 text-xs mr-1">·</span>}
              <span className="font-mono text-[11px] font-semibold text-white/85 whitespace-nowrap">{s.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35 ml-1 whitespace-nowrap">{s.label}</span>
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
