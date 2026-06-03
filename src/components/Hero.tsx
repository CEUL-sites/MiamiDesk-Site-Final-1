import { motion, type Variants } from "motion/react";
import { Globe, ShieldCheck, Tag } from "lucide-react";
import { HeroSellerForm } from "./HeroSellerForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const VIDEO_BUBBLES = [
  {
    src: "/videos/luxury_waterfront_drone.mp4",
    label: "Aerial View",
    delay: 1.25,
    featured: false,
  },
  {
    src: "/videos/dollhouse_rotating_hands.mp4",
    label: "3D Marketing",
    delay: 1.1,
    featured: true,
  },
  {
    src: "/videos/dollhouse_global_reach.mp4",
    label: "Global Reach",
    delay: 1.4,
    featured: false,
  },
];

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* Animated marquee — markets served + URG footprint + network stats */
const MARQUEE_ITEMS: { t: string; gold?: true }[] = [
  { t: "South Florida",                  gold: true  },
  { t: "Miami-Dade County"                           },
  { t: "Broward County"                              },
  { t: "Palm Beach County"                           },
  { t: "Weston · Plantation · Aventura"              },
  { t: "Boca Raton · Coral Springs"                  },
  { t: "Fort Lauderdale · Pembroke Pines"            },
  { t: "Hialeah · Kendall"                           },
  { t: "Delray Beach · Wellington"                   },
  { t: "United Realty Group · Est. 2002", gold: true },
  { t: "21 Florida Offices",             gold: true  },
  { t: "4,000+ URG Agents Statewide"                 },
  { t: "93,000 Network Members",         gold: true  },
  { t: "260+ MLS Connections"                        },
  { t: "300+ Partner Associations"                   },
  { t: "437+ International Agreements"               },
  { t: "500+ Websites"                               },
  { t: "Licensed Since 2001",            gold: true  },
];

export function Hero() {
  const marqueeContent = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section className="hero-root relative overflow-hidden bg-[#060D18] text-white flex flex-col">

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
          position:absolute; bottom:0; left:0; right:0; height:220px; pointer-events:none;
          background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
        }
        @keyframes exposure-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .exposure-track {
          animation: exposure-scroll 12s linear infinite;
          display: flex;
          will-change: transform;
        }
        .exposure-track:hover { animation-play-state: paused; }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-marquee-track {
          animation: marquee-scroll 38s linear infinite;
          display: flex;
          align-items: center;
          will-change: transform;
        }
        .hero-marquee-track:hover { animation-play-state: paused; }
        .hero-marquee-bar {
          background: rgba(10,21,37,0.85);
          border-top: 1px solid rgba(176,141,87,0.15);
          backdrop-filter: blur(16px);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-a, .hero-orb-b,
          .exposure-track, .hero-marquee-track { animation: none; }
        }
      `}</style>

      <div className="hero-bg-warm"  aria-hidden="true" />
      <div className="hero-orb-a"    aria-hidden="true" />
      <div className="hero-orb-b"    aria-hidden="true" />
      <div className="hero-grain"    aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Main content — single centered column ──────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center px-4 pt-28 pb-10 sm:px-8"
      >
        <div className="w-full max-w-4xl flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 sm:px-3.5">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-gold/85">
                <span className="sm:hidden">South Florida · Global Network</span>
                <span className="hidden sm:inline">South Florida · Miami Realtors Association · Global Real Estate Network</span>
              </span>
            </span>
          </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="mt-6 font-serif leading-[1.05] text-white break-words"
              style={{ fontSize: "clamp(1.35rem, 5.2vw, 4.6rem)", fontWeight: 400 }}
            >
              Sell With the Reach of the
              <br className="hidden lg:block" aria-hidden="true" />{" "}
              <em className="not-italic italic text-gold">World's Largest Local Realtor® Network.</em>
            </motion.h1>

            {/* Video bubble trio — directly under the headline, labels below each circle */}
            <motion.div variants={item} className="mt-7 flex items-start justify-center gap-4 sm:gap-6 lg:justify-start">
              {VIDEO_BUBBLES.map((b) => (
                <div key={b.src} className="flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20, delay: b.delay }}
                    className="relative overflow-hidden rounded-full flex-shrink-0"
                    style={{
                      width:  b.featured ? "clamp(90px,14vw,140px)" : "clamp(64px,10vw,100px)",
                      height: b.featured ? "clamp(90px,14vw,140px)" : "clamp(64px,10vw,100px)",
                      border: b.featured ? "2px solid rgba(176,141,87,0.65)" : "2px solid rgba(176,141,87,0.30)",
                      boxShadow: b.featured
                        ? "0 0 32px rgba(176,141,87,0.38), inset 0 0 0 1px rgba(255,255,255,0.05)"
                        : "0 0 16px rgba(176,141,87,0.18)",
                    }}
                  >
                    <video
                      autoPlay muted loop playsInline aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src={b.src} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
                  </motion.div>
                  <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.16em] text-white/55 whitespace-nowrap leading-none">
                    {b.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* "Your property. Our reach." tagline between bubbles and sub-copy */}
            <motion.div variants={item} className="mt-5 flex items-center gap-2.5">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/25 whitespace-nowrap">Your property. Our reach.</span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </motion.div>

            {/* Network reach — scrolling ticker */}
            <motion.div variants={item} className="relative mt-5 mx-auto lg:mx-0 w-full max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]">
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
            <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start lg:gap-x-5">
              {[
                { icon: ShieldCheck, text: "Licensed Since 2001" },
                { icon: Tag,         text: "CLHMS · Certified Seller Rep" },
                { icon: Globe,       text: "United Realty Group" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.12em] sm:tracking-[0.16em] text-white/45">
                  <Icon size={12} className="text-gold/70 flex-shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>

            {/* "Your property. Our reach." divider */}
            <motion.div variants={item} className="mt-5 flex items-center gap-2.5">
              <div className="h-px flex-1 bg-white/[0.07]" />
              <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/25 whitespace-nowrap">Your property. Our reach.</span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </motion.div>

            {/* Network stats scrolling ticker */}
            <motion.div variants={item} className="relative mt-5 mx-auto lg:mx-0 w-full max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]">
              {/* Left/right fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#060D18] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#060D18] to-transparent" />
              <div className="exposure-track">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 items-center gap-2 pl-6 pr-12 py-2.5 font-mono text-[8px] uppercase tracking-[0.16em] whitespace-nowrap text-white/40">
                    <span className="text-gold/75">Network</span>
                    {" "}·{" "}
                    <span className="text-white/85">93,000</span> Members
                    {" "}·{" "}
                    <span className="text-white/85">260+</span> MLS Connections
                    {" "}·{" "}
                    <span className="text-white/85">300+</span> Partner Associations
                    {" "}·{" "}
                    <span className="text-white/85">437+</span> International Agreements
                    {" "}·{" "}
                    <span className="text-white/85">500+</span> Websites
                    {" "}·{" "}
                    Licensed Since <span className="text-white/85">2001</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-start">
              <a
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-gold px-5 sm:px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90 text-center"
              >
                Request Seller Strategy Review
              </a>
              <a
                href="/spain-desk"
                className="hero-pill inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white/70 text-center"
              >
                Global Desk — Agency &amp; Referrals →
              </a>
            </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-4 font-serif text-white/70 italic"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
          >
            Real Estate is local — Peak Value is Global.
          </motion.p>

          {/* Network ticker */}
          <motion.div variants={item} className="relative mt-5 w-full max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#060D18] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#060D18] to-transparent" />
            <div className="exposure-track">
              {[0, 1].map((copy) => (
                <span key={copy} className="flex shrink-0 items-center gap-2 pl-6 pr-12 py-2.5 font-mono text-[8px] uppercase tracking-[0.16em] whitespace-nowrap text-white/40">
                  <span className="text-gold/75">Network</span>{" "}·{" "}
                  <span className="text-white/85">93,000</span> Members{" "}·{" "}
                  <span className="text-white/85">260+</span> MLS Connections{" "}·{" "}
                  <span className="text-white/85">300+</span> Partner Associations{" "}·{" "}
                  <span className="text-white/85">437+</span> International Agreements{" "}·{" "}
                  <span className="text-white/85">500+</span> Websites{" "}·{" "}
                  Licensed Since <span className="text-white/85">2001</span>
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Centered form ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="mt-8 w-full max-w-lg"
        >
          <HeroSellerForm />
        </motion.div>

        {/* ── Trust row ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {[
            { icon: ShieldCheck, text: "Licensed Since 2001" },
            { icon: Tag,         text: "CLHMS · Certified Seller Rep" },
            { icon: Globe,       text: "United Realty Group" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-white/40">
              <Icon size={11} className="text-gold/60 flex-shrink-0" />
              {text}
            </span>
          ))}
        </motion.div>

        {/* Compliance */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-3 font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/20 max-w-sm text-center"
        >
          Eligible exposure varies by property type, MLS rules, platform participation, and syndication partner availability.
        </motion.p>

      </motion.div>

      {/* ── Bottom marquee — markets + URG offices + network ───── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 hero-marquee-bar w-full overflow-hidden select-none"
        aria-hidden="true"
      >
        <div className="hero-marquee-track py-2.5">
          {marqueeContent.map((m, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span className={`font-mono text-[9px] uppercase tracking-[0.18em] whitespace-nowrap px-3 ${
                m.gold ? "text-gold/80" : "text-white/35"
              }`}>
                {m.t}
              </span>
              <span className="text-white/15 text-xs">·</span>
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
