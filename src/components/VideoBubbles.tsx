import { useEffect, useRef, useState, useCallback } from "react";
import { Play, X } from "lucide-react";

export interface VideoBubble {
  src: string;
  poster?: string;
  caption: string;
}

export const VIDEO_BUBBLES: VideoBubble[] = [
  { src: "/videos/signature_marketing_reel.mp4",      caption: "Signature marketing reel" },
  { src: "/videos/luxury_waterfront_estate.mp4",      caption: "Waterfront estate tour" },
  { src: "/videos/matterport_miami_beach.mp4",        caption: "Matterport — Miami Beach" },
  { src: "/videos/matterport_style.mp4",              caption: "3D Matterport tour" },
  { src: "/videos/infinity_pool_ocean_views.mp4",     caption: "Infinity pool · ocean views" },
  { src: "/videos/luxury_home_walkthrough.mp4",       caption: "Cinematic home walkthrough" },
  { src: "/videos/dollhouse_hand_reach_1.mp4",        caption: "Your property, in hand" },
  { src: "/videos/dollhouse_rotating_in_hands.mp4",   caption: "3D dollhouse — every angle" },
  { src: "/videos/cinematic_house_reach.mp4",         caption: "Cinematic listing reach" },
  { src: "/videos/digital_twin_exposure.mp4",         caption: "Digital twin exposure" },
  { src: "/videos/home_tour_reach.mp4",               caption: "Global distribution reach" },
  { src: "/videos/ceul_team_dollhouse.mp4",           caption: "Your home, our team" },
];

// Crossfade duration between clips (ms). Kept in sync with the CSS opacity
// transition on each video layer.
const FADE_MS = 650;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Lightbox({ bubble, onClose }: { bubble: VideoBubble; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={bubble.caption}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/92 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-11 right-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold"
        >
          Close <X size={15} />
        </button>
        <div
          className="relative w-full overflow-hidden border border-gold/25 bg-black"
          style={{ aspectRatio: "16 / 9" }}
        >
          <video
            controls
            autoPlay
            playsInline
            poster={bubble.poster}
            className="h-full w-full object-contain"
          >
            <source src={bubble.src} type="video/mp4" />
          </video>
        </div>
        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">
          {bubble.caption}
        </p>
      </div>
    </div>
  );
}

export function VideoBubbles({ bubbles = VIDEO_BUBBLES }: { bubbles?: VideoBubble[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Two stacked video layers. The front one is visible and playing; the back
  // one silently preloads the NEXT clip so we can dissolve between them with no
  // black frame. Roles swap on every transition.
  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const s0 = useRef<HTMLSourceElement>(null);
  const s1 = useRef<HTMLSourceElement>(null);
  const vids = [v0, v1] as const;
  const srcs = [s0, s1] as const;

  const [near,      setNear]      = useState(false);
  const [front,     setFront]     = useState(0);   // which layer is in front (0|1)
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress,  setProgress]  = useState(0);   // 0–1 progress for the front clip
  const [open,      setOpen]      = useState(false);
  const reduced = prefersReducedMotion();
  const n = bubbles.length;

  // Refs mirror state so the media event handlers (attached once) always read
  // current values without re-binding.
  const frontRef  = useRef(0);
  const activeRef = useRef(0);
  const busy      = useRef(false);                 // guards overlapping transitions
  const loadedIdx = useRef<[number, number]>([-1, -1]); // clip index loaded per layer
  useEffect(() => { frontRef.current = front; }, [front]);
  useEffect(() => { activeRef.current = activeIdx; }, [activeIdx]);

  const loadInto = useCallback((layer: number, idx: number) => {
    const v = vids[layer].current;
    const s = srcs[layer].current;
    if (!v || !s || loadedIdx.current[layer] === idx) return;
    s.src = bubbles[idx].src;
    v.muted = true;
    v.load();
    loadedIdx.current[layer] = idx;
  }, [bubbles, vids, srcs]);

  // Defer everything until the bubble is near the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once near: play the first clip in the front layer and preload the next in
  // the back layer so the first transition is already seamless.
  useEffect(() => {
    if (!near) return;
    loadInto(0, 0);
    const v = vids[0].current;
    const play = () => { const p = v?.play(); if (p) p.catch(() => {}); };
    v?.addEventListener("canplay", play, { once: true });
    loadInto(1, 1 % n);
    return () => v?.removeEventListener("canplay", play);
  }, [near, loadInto, n, vids]);

  // Crossfade to a target clip. The back layer already holds the next clip for
  // auto-advance (instant); for a tapped segment it loads on demand, then fades.
  const goTo = useCallback((target: number) => {
    if (busy.current || !near || target === activeRef.current) return;
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
      setFront(back);        // CSS opacity transition does the dissolve
      setActiveIdx(target);
      window.setTimeout(() => {
        const oldFront = back === 0 ? 1 : 0;
        vids[oldFront].current?.pause();      // free the now-hidden decoder
        loadInto(oldFront, (target + 1) % n); // preload the next clip
        busy.current = false;
      }, reduced ? 0 : FADE_MS);
    };

    if (loadedIdx.current[back] === target && bv.readyState >= 2) start();
    else bv.addEventListener("canplay", start, { once: true });
  }, [near, loadInto, n, vids, reduced]);

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

  const close = useCallback(() => setOpen(false), []);

  return (
    <div ref={wrapRef} className="flex flex-col items-center">
      <style>{`
        @keyframes vb-caption-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: none; }
        }
        .vb-caption { animation: vb-caption-in 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes vb-kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.07); }
        }
        .vb-kenburns { animation: vb-kenburns 14s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .vb-caption { animation: none; }
          .vb-kenburns { animation: none; }
        }
      `}</style>

      {/* ── Video bubble (two crossfading layers) ────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Watch: ${bubbles[activeIdx].caption}`}
        className={`group relative block ${reduced ? "" : "video-bubble-float"}`}
        style={{
          width: "clamp(200px, 55vw, 340px)",
          aspectRatio: "1 / 1",
        }}
      >
        {/* Outer glow ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, rgba(176,141,87,0.35) 0%, transparent 72%)" }}
        />

        {/* Circle */}
        <span className="absolute inset-0 rounded-full overflow-hidden border border-gold/30 bg-[#0F2038] shadow-2xl shadow-navy/50 transition-all duration-500 group-hover:border-gold/55">
          {near && [0, 1].map((layer) => (
            <video
              key={layer}
              ref={vids[layer]}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              onTimeUpdate={onTime(layer)}
              onEnded={onEnded(layer)}
              className={`absolute inset-0 h-full w-full object-cover ${reduced ? "" : "vb-kenburns"}`}
              style={{
                opacity: layer === front ? 1 : 0,
                transition: reduced ? "none" : `opacity ${FADE_MS}ms ease-in-out`,
              }}
            >
              <source ref={srcs[layer]} type="video/mp4" />
            </video>
          ))}

          {/* Vignette so edges read clean */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(10,22,40,0.55) 100%)" }}
          />

          {/* Play icon — subtle, shows on hover */}
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/55 bg-[#0A1628]/60 text-gold backdrop-blur-sm shadow-lg">
              <Play size={20} className="ml-0.5" fill="currentColor" />
            </span>
          </span>
        </span>
      </button>

      {/* ── Story-style progress segments ───────────────────────────────── */}
      <div className="mt-5 flex items-center gap-1.5" role="group" aria-label="Clip sequence">
        {bubbles.map((b, i) => (
          <button
            key={b.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Clip ${i + 1}: ${b.caption}`}
            className="group relative flex h-6 items-center transition-all duration-300"
            style={{ width: i === activeIdx ? "2.25rem" : "0.65rem" }}
          >
            {/* 3px progress bar — visual only; the button itself carries a
                taller, finger-friendly tap target (h-6) around it. */}
            <span className="relative block h-[3px] w-full overflow-hidden rounded-full">
              {/* Track */}
              <span className="absolute inset-0 rounded-full bg-navy/15" />
              {/* Fill */}
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

      {/* ── Caption (cross-fades on change) ─────────────────────────────── */}
      <p
        key={activeIdx}
        className="vb-caption mt-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-navy/45 text-center"
      >
        {bubbles[activeIdx].caption}
      </p>

      {open && <Lightbox bubble={bubbles[activeIdx]} onClose={close} />}
    </div>
  );
}
