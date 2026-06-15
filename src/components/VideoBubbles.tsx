import { useEffect, useRef, useState, useCallback } from "react";
import { Play, X } from "lucide-react";

export interface VideoBubble {
  src: string;
  poster?: string;
  caption: string;
}

export const VIDEO_BUBBLES: VideoBubble[] = [
  { src: "/videos/signature_marketing_reel.mp4",   caption: "Signature marketing reel" },
  { src: "/videos/luxury_home_walkthrough.mp4",    caption: "Cinematic home walkthrough" },
  { src: "/videos/virtual_tour_showcase.mp4",      caption: "Virtual property tour" },
  { src: "/videos/matterport_tour.mp4",            caption: "3D walkthrough tour" },
  { src: "/videos/dollhouse_rotating_hands.mp4",  caption: "3D dollhouse — every angle" },
  { src: "/videos/cinematic_house_reach.mp4",      caption: "Cinematic listing reach" },
  { src: "/videos/digital_twin_exposure.mp4",      caption: "Digital twin exposure" },
  { src: "/videos/dollhouse_hand_reach.mp4",       caption: "Property in your hands" },
];

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
  const wrapRef   = useRef<HTMLDivElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [near,      setNear]      = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress,  setProgress]  = useState(0); // 0–1 progress for active clip
  const [open,      setOpen]      = useState(false);
  const reduced = prefersReducedMotion();

  // Defer load until near viewport
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

  // Load & play the active clip whenever it changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near) return;
    v.src = bubbles[activeIdx].src;
    v.load();
    setProgress(0);
    const tryPlay = () => {
      const p = v.play();
      if (p) p.catch(() => {});
    };
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [activeIdx, near, bubbles]);

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  };

  const handleEnded = useCallback(() => {
    setActiveIdx((i) => (i + 1) % bubbles.length);
  }, [bubbles.length]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <div ref={wrapRef} className="flex flex-col items-center">

      {/* ── Single video bubble ──────────────────────────────────────────── */}
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
          {/* Auto-playing clip */}
          {near && (
            <video
              ref={videoRef}
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

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
            onClick={() => { setActiveIdx(i); setProgress(0); }}
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

      {/* ── Caption ─────────────────────────────────────────────────────── */}
      <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.22em] text-navy/45 text-center transition-all duration-300">
        {bubbles[activeIdx].caption}
      </p>

      {open && <Lightbox bubble={bubbles[activeIdx]} onClose={close} />}
    </div>
  );
}
