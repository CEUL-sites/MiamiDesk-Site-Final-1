import { motion, type Variants } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Globe, ShieldCheck, Tag } from "lucide-react";
import { HeroBackground } from "./HeroBackground";
import { HeroSellerForm } from "./HeroSellerForm";
import { trackFunnelEvent } from "../lib/analytics";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Single hero bubble — sized as the centerpiece now that it stands alone.
const FEATURE_SIZE = "clamp(150px,34vw,250px)";

// Crossfade duration between clips (ms). Kept in sync with the CSS opacity
// transition on each video layer so swaps dissolve with no black frame.
const FADE_MS = 600;

// One circle, auto-cycling through these in order, then looping back to start.
// Opens on the "home in hands" signature clip the client loves, then folds in
// the Global Reach + AI Marketing clips that used to live in the (removed) side
// bubbles so none of that content is lost.
// NOTE: virtual_tour_showcase.mp4 (14MB) and luxury_home_walkthrough.mp4 (13MB)
// are intentionally kept OUT of this rotation — at this bubble size their extra
// weight is invisible but they pull ~27MB of mobile data. Both remain live where
// they show full-size (SellerSection, VideoBubbles, Agents & Markets pages).
const HERO_FEATURE_VIDEOS = [
  { src: "/videos/dollhouse_rotating_in_hands.mp4", label: "Signature Marketing" },
  { src: "/videos/luxury_waterfront_estate.mp4",    label: "Waterfront Estate"   },
  { src: "/videos/matterport_miami_beach.mp4",      label: "3D Matterport Tour"  },
  { src: "/videos/digital_twin_exposure.mp4",       label: "Global Exposure"     },
  { src: "/videos/gemini_property_vision.mp4",      label: "AI Marketing"        },
];

// Decorative hero clips are skipped entirely on data-saver / slow (2g) links —
// the navy bubble background stays in place rather than spending the visitor's
// data and delaying the lead form below. Safe during prerender (no navigator
// → returns false, so the prerendered markup is unchanged).
function prefersLightMedia(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!c) return false;
  return Boolean(c.saveData) || /(^|-)2g$/.test(c.effectiveType ?? "");
}

// Pauses/defers the hero videos until the hero is actually on-screen, so they
// never compete with the above-the-fold lead form for bandwidth and stop
// fetching once the visitor scrolls past.
function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

// Single hero bubble that auto-advances through HERO_FEATURE_VIDEOS on each
// clip's end, with Instagram-style progress segments below. Clicking a segment
// jumps to that clip.
//
// Two stacked video layers crossfade between clips so there is NEVER a black
// frame on a swap: the front layer plays the current clip while the back layer
// silently preloads the NEXT one; on advance we dissolve (CSS opacity) between
// them and the roles swap. This is the same seamless technique used by the
// VideoBubbles component.
//
// Loading stays off the critical path: preload="none" + sources attached
// imperatively (source.src + load() — the pattern Chromium's demuxer handles
// reliably, vs. setting video.src directly which can surface a spurious
// DEMUXER_ERROR_NO_SUPPORTED_STREAMS) only once the hero is on-screen and the
// visitor isn't on a data-saver link.
function HeroCyclingBubble({ active }: { active: boolean }) {
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const s0 = useRef<HTMLSourceElement>(null);
  const s1 = useRef<HTMLSourceElement>(null);
  const vids = [v0, v1] as const;
  const srcs = [s0, s1] as const;

  const [front, setFront] = useState(0);     // which layer is in front (0|1)
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1 progress for the front clip

  // Refs mirror state so the (once-attached) media handlers always read current
  // values without re-binding.
  const frontRef = useRef(0);
  const activeRef = useRef(0);
  const busy = useRef(false);                 // guards overlapping transitions
  const loadedIdx = useRef<[number, number]>([-1, -1]); // clip loaded per layer
  const n = HERO_FEATURE_VIDEOS.length;
  useEffect(() => { frontRef.current = front; }, [front]);
  useEffect(() => { activeRef.current = activeIdx; }, [activeIdx]);

  const loadInto = useCallback((layer: number, idx: number) => {
    const v = vids[layer].current;
    const s = srcs[layer].current;
    if (!v || !s || loadedIdx.current[layer] === idx) return;
    s.src = HERO_FEATURE_VIDEOS[idx].src;
    v.muted = true;
    v.load();
    loadedIdx.current[layer] = idx;
  }, [vids, srcs]);

  // Start/stop with `active`: play the front clip and preload the next in back
  // when on-screen; pause both when the visitor scrolls past.
  useEffect(() => {
    if (!active) { v0.current?.pause(); v1.current?.pause(); return; }
    loadInto(frontRef.current, activeRef.current);
    const v = vids[frontRef.current].current;
    const play = () => { const p = v?.play(); if (p) p.catch(() => {}); };
    if (v && v.readyState >= 2) play();
    else v?.addEventListener("canplay", play, { once: true });
    loadInto(frontRef.current === 0 ? 1 : 0, (activeRef.current + 1) % n);
    return () => v?.removeEventListener("canplay", play);
  }, [active, loadInto, n, vids]);

  // Crossfade to a target clip. The back layer already holds the next clip for
  // auto-advance (instant); a tapped segment loads on demand, then fades.
  const goTo = useCallback((target: number) => {
    if (busy.current || !active || target === activeRef.current) return;
    const back = frontRef.current === 0 ? 1 : 0;
    const bv = vids[back].current;
    if (!bv) return;
    busy.current = true;
    loadInto(back, target);

    const start = () => {
      try { bv.currentTime = 0; } catch { /* not seekable yet — fine */ }
      bv.muted = true;
      const p = bv.play(); if (p) p.catch(() => {});
      setProgress(0);
      setFront(back);          // CSS opacity transition does the dissolve
      setActiveIdx(target);
      window.setTimeout(() => {
        const oldFront = back === 0 ? 1 : 0;
        vids[oldFront].current?.pause();      // free the now-hidden decoder
        loadInto(oldFront, (target + 1) % n); // preload the next clip
        busy.current = false;
      }, FADE_MS);
    };

    if (loadedIdx.current[back] === target && bv.readyState >= 2) start();
    else bv.addEventListener("canplay", start, { once: true });
  }, [active, loadInto, n, vids]);

  const onTime = (layer: number) => () => {
    if (layer !== frontRef.current) return;
    const v = vids[layer].current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };
  const onEnded = (layer: number) => () => {
    if (layer !== frontRef.current) return;
    goTo((activeRef.current + 1) % n);
  };

  return (
    <div className="flex flex-col items-center gap-3">
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
        {[0, 1].map((layer) => (
          <video
            key={layer}
            ref={vids[layer]}
            muted
            playsInline
            preload="none"
            aria-hidden="true"
            onTimeUpdate={onTime(layer)}
            onEnded={onEnded(layer)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: layer === front ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
          >
            <source ref={srcs[layer]} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </motion.div>

      {/* Story-style progress segments */}
      <div className="flex items-center gap-1.5" role="group" aria-label="Featured clip sequence">
        {HERO_FEATURE_VIDEOS.map((v, i) => (
          <button
            key={v.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Clip ${i + 1}: ${v.label}`}
            className="relative flex h-5 items-center transition-all duration-300"
            style={{ width: i === activeIdx ? "1.9rem" : "0.5rem" }}
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
      <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-white/55 whitespace-nowrap leading-none">
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

export function Hero() {
  // Decorative hero videos only load/play while the hero is on-screen and the
  // visitor isn't on a data-saver/slow link — keeps them off the critical path
  // so the headline and lead form paint first.
  const [trioRef, inView] = useInView<HTMLDivElement>();
  const [lightMedia] = useState(prefersLightMedia);
  const videosActive = inView && !lightMedia;

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
            <em className="italic text-gold">World's Largest Local Realtor® Association.</em>
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

          {/* Single auto-cycling video bubble — crossfades seamlessly through
              the featured clips (no black frame between them). */}
          <motion.div ref={trioRef} variants={item} className="mt-8 flex items-center justify-center">
            <HeroCyclingBubble active={videosActive} />
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
