import { motion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, ShieldCheck, Tag } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { HeroSellerForm } from "./HeroSellerForm";
import { trackFunnelEvent } from "../lib/analytics";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Inline navy poster — shows instantly, prevents black-flash while video loads.
const NAVY_POSTER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%230B1E3F'/%3E%3C/svg%3E";

const FEATURE_SIZE = "clamp(100px,16vw,148px)";
const SMALL_SIZE = "clamp(78px,11vw,108px)";

// Side bubbles — static loops, one each side of the cycling center bubble.
const SIDE_BUBBLES = [
  { src: "/videos/miami_madrid_transition.mp4", label: "Global Reach", delay: 1.25 },
  { src: "/videos/gemini_property_vision.mp4",  label: "AI Marketing", delay: 1.4  },
];

// Center bubble — auto-cycles through these in order, then loops back to start.
// Opens on the "home in hands" signature clip the client loves.
const HERO_FEATURE_VIDEOS = [
  { src: "/videos/dollhouse_rotating_hands.mp4", label: "Signature Marketing"   },
  { src: "/videos/matterport_tour.mp4",          label: "3D Matterport Tour"    },
  { src: "/videos/matterport_tour_2.mp4",        label: "3D Matterport Tour"    },
  { src: "/videos/virtual_tour_showcase.mp4",    label: "Virtual Tour"          },
  { src: "/videos/luxury_home_walkthrough.mp4",  label: "Cinematic Walkthrough" },
];

// Side-bubble video loader. Defers the network fetch until 600 ms after mount
// so the browser scanner never preloads these eagerly and LCP content (headline
// + form) paints first. The circles animate in at 1.25 s / 1.4 s so the video
// is mid-download by the time each bubble becomes visible — no empty flash.
// Navy poster prevents a black circle before the first frame arrives.
function HeroVideoCircle({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const t = setTimeout(() => {
      v.src = src;
      v.load();
      v.play().catch(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [src]);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={NAVY_POSTER}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

// Center bubble that auto-advances through HERO_FEATURE_VIDEOS on each video's
// end, with Instagram-style progress segments below. Clicking a segment jumps
// to that video. Does NOT loop a single clip — onEnded drives the sequence.
function HeroCyclingBubble() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1 progress for active clip

  // Load & play the active clip whenever it changes.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = HERO_FEATURE_VIDEOS[activeIdx].src;
    v.load();
    setProgress(0);
    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [activeIdx]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  const handleEnded = () => {
    setActiveIdx((i) => (i + 1) % HERO_FEATURE_VIDEOS.length);
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.1 }}
        className="relative overflow-hidden rounded-full flex-shrink-0 bg-[#0B1E3F]"
        style={{
          width: FEATURE_SIZE,
          height: FEATURE_SIZE,
          border: "2px solid rgba(176,141,87,0.65)",
          boxShadow:
            "0 0 36px rgba(176,141,87,0.38), inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster={NAVY_POSTER}
          aria-hidden="true"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Story-style progress segments */}
      <div className="flex items-center gap-1.5" role="group" aria-label="Featured clip sequence">
        {HERO_FEATURE_VIDEOS.map((v, i) => (
          <button
            key={v.src}
            type="button"
            onClick={() => { setActiveIdx(i); setProgress(0); }}
            aria-label={`Clip ${i + 1}: ${v.label}`}
            className="relative flex items-center transition-all duration-300"
            style={{ width: i === activeIdx ? "1.75rem" : "0.45rem" }}
          >
            <span className="relative block h-[2px] w-full overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-white/15" />
              {i < activeIdx && (
                <span className="absolute inset-0 rounded-full bg-gold/70" />
              )}
              {i === activeIdx && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-gold"
                  style={{ width: `${progress * 100}%`, transition: "width 0.15s linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Current video label */}
      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-white/50 whitespace-nowrap leading-none">
        {HERO_FEATURE_VIDEOS[activeIdx].label}
      </span>
    </div>
  );
}

const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

function SideBubble({ src, label, delay }: { src: string; label: string; delay: number }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
        className="relative overflow-hidden rounded-full flex-shrink-0 bg-[#0B1E3F]"
        style={{
          width: SMALL_SIZE,
          height: SMALL_SIZE,
          border: "2px solid rgba(176,141,87,0.30)",
          boxShadow: "0 0 16px rgba(176,141,87,0.15)",
        }}
      >
        <HeroVideoCircle src={src} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </motion.div>
      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-white/50 whitespace-nowrap leading-none">
        {label}
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-root relative overflow-hidden bg-[#060D18] text-white flex flex-col">

      <style>{`
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
        @media (prefers-reduced-motion: reduce) {
          .exposure-track { animation: none; }
        }
      `}</style>

      <HeroBackground />
      <div className="hero-grain"    aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Main content — single centered column ──────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center px-4 pt-[72px] sm:pt-24 md:pt-28 pb-10 sm:px-8"
      >
        <div className="w-full max-w-4xl flex flex-col items-center text-center">

          {/* Eyebrow */}
          <motion.div variants={item}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 sm:px-3.5">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.2em] text-gold/85">
                <span className="sm:hidden">South Florida · Global Reach</span>
                <span className="hidden sm:inline">South Florida · Miami Realtors Network · Global Reach</span>
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-6 font-serif leading-[1.05] text-white"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 4.8rem)", fontWeight: 400 }}
          >
            Sell With the Reach of the
            <br className="hidden md:block" aria-hidden="true" />{" "}
            <em className="italic text-gold">World's Largest Local Realtor® Network.</em>
          </motion.h1>

          {/* Mobile-only quick CTA — on phones the seller form sits well below
              the fold, so give an immediate, above-the-fold path to it. */}
          <motion.a
            variants={item}
            href="#list-here"
            onClick={() => trackFunnelEvent("hero_cta_mobile")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-deep shadow-lg shadow-gold/25 transition-opacity hover:opacity-90 sm:hidden"
          >
            Get My Free Home Value
            <ArrowRight size={14} />
          </motion.a>

          {/* Video bubble trio — static side bubbles flank the auto-cycling
              center bubble. items-center keeps them vertically aligned since
              the center is taller (progress bar + label). */}
          <motion.div variants={item} className="mt-8 flex items-center justify-center gap-4 sm:gap-7">
            <SideBubble {...SIDE_BUBBLES[0]} />
            <HeroCyclingBubble />
            <SideBubble {...SIDE_BUBBLES[1]} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 font-serif text-white/70 italic"
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
                  <span className="text-white/85">93,000</span> Member Agents{" "}·{" "}
                  <span className="text-white/85">260+</span> U.S. MLSs{" "}·{" "}
                  <span className="text-white/85">437+</span> International Agreements{" "}·{" "}
                  <span className="text-white/85">200+</span> Global Portals{" "}·{" "}
                  <span className="text-white/85">19</span> Languages{" "}·{" "}
                  Licensed Since <span className="text-white/85">2001</span>
                </span>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Centered form ──────────────────────────────────────── */}
        <motion.div
          id="list-here"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          className="mt-8 w-full max-w-lg scroll-mt-24"
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

    </section>
  );
}
