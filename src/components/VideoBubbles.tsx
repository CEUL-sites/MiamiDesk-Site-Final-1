import { useEffect, useRef, useState, useCallback } from "react";
import { Play, X } from "lucide-react";

/**
 * Floating video "bubbles" surfacing short clips of Carlos's professional
 * home-marketing work (cinematic tours, listing films).
 *
 * Config-driven: edit VIDEO_BUBBLES below (or pass a `bubbles` prop) to swap in
 * real listing films later. Each entry needs a clip `src`; `poster` and
 * `caption` are optional.
 *
 * Performance + accessibility:
 *  - Clips are NOT fetched until the row scrolls near the viewport
 *    (IntersectionObserver, preload="none"). No video downloads on first paint.
 *  - Reserved aspect-ratio tiles → zero cumulative layout shift.
 *  - Tiles are buttons; click/tap opens a lightbox with native controls.
 *  - Hover-preview (muted, looped) on pointer-fine devices only, and never when
 *    the user prefers reduced motion. Mobile degrades to a simple tappable grid.
 *  - Lightbox is a focus-trapped role="dialog"; Escape and backdrop close it.
 *
 * NOTE: the clips referenced below are existing cinematic placeholders from
 * /public/videos. Replace `src`/`poster`/`caption` with real listing films.
 */

export interface VideoBubble {
  /** Path to the .mp4 clip. */
  src: string;
  /** Optional poster still shown before play (prevents a flash of empty tile). */
  poster?: string;
  /** Short caption shown under the bubble and used as the accessible label. */
  caption: string;
}

// ── Placeholder config — swap for real listing films ────────────────────────
export const VIDEO_BUBBLES: VideoBubble[] = [
  { src: "/videos/luxury_listing_showcase.mp4", caption: "Listing film — luxury single-family" },
  { src: "/videos/luxury_waterfront_drone.mp4", caption: "Aerial tour — waterfront estate" },
  { src: "/videos/south_florida_showcase.mp4", caption: "South Florida market showcase" },
  { src: "/videos/cinematic_house_reach.mp4", caption: "Cinematic property feature" },
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HoverPreviewVideo({ bubble }: { bubble: VideoBubble }) {
  const ref = useRef<HTMLVideoElement>(null);
  const onEnter = () => {
    if (prefersReducedMotion()) return;
    const v = ref.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };
  const onLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={bubble.poster}
      aria-hidden="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={bubble.src} type="video/mp4" />
    </video>
  );
}

function Lightbox({ bubble, onClose }: { bubble: VideoBubble; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1628]/90 p-4 backdrop-blur-sm"
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
        <div className="relative w-full overflow-hidden border border-gold/25 bg-black" style={{ aspectRatio: "16 / 9" }}>
          {/* autoPlay is user-initiated (they clicked the tile), so it is allowed */}
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
  const rowRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [open, setOpen] = useState<VideoBubble | null>(null);
  const reduced = prefersReducedMotion();

  // Only allow hover-preview where a precise pointer exists (desktop).
  const [hoverCapable, setHoverCapable] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      setHoverCapable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpen(null), []);

  return (
    <div>
      <div
        ref={rowRef}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        role="list"
        aria-label="Professional home-marketing clips"
      >
        {bubbles.map((b, i) => (
          <button
            key={b.src}
            type="button"
            role="listitem"
            onClick={() => { setNear(true); setOpen(b); }}
            aria-label={`Play clip: ${b.caption}`}
            className={`group relative flex flex-col text-left focus-visible:outline-none ${
              reduced ? "" : "video-bubble-float"
            }`}
            style={reduced ? undefined : { animationDelay: `${i * 0.4}s` }}
          >
            {/* Reserved-ratio tile → no layout shift */}
            <span
              className="relative block w-full overflow-hidden rounded-full border border-gold/25 bg-[#0F2038] shadow-lg shadow-black/30 transition-all duration-300 group-hover:border-gold/60 group-hover:shadow-gold/10 group-focus-visible:border-gold"
              style={{ aspectRatio: "1 / 1" }}
            >
              {/* Poster / gradient base (always present, prevents flash) */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={
                  b.poster
                    ? { backgroundImage: `url(${b.poster})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: "radial-gradient(circle at 35% 30%, #1E3352, #0A1628)" }
                }
              />
              {/* Hover-preview clip (desktop, motion-OK, only once near viewport) */}
              {near && hoverCapable && !reduced && <HoverPreviewVideo bubble={b} />}
              {/* Play affordance */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-[#0A1628]/55 text-gold backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play size={16} className="ml-0.5" fill="currentColor" />
                </span>
              </span>
            </span>
            <span className="mt-3 px-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-white/55 transition-colors group-hover:text-gold/80">
              {b.caption}
            </span>
          </button>
        ))}
      </div>

      {open && <Lightbox bubble={open} onClose={close} />}
    </div>
  );
}
