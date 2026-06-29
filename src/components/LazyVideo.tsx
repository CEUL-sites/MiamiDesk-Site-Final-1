import { useEffect, useRef, useState, type CSSProperties } from "react";

interface LazyVideoProps {
  /** Path to the .mp4 source. */
  src: string;
  className?: string;
  style?: CSSProperties;
  /** Optional poster image shown before the video loads. */
  poster?: string;
  /**
   * Eagerly load + play as soon as mounted (use for above-the-fold hero videos).
   * Default false: the video only fetches + plays once it scrolls into view.
   */
  eager?: boolean;
  /** Margin around the viewport that counts as "in view" — preloads just before. */
  rootMargin?: string;
}

/**
 * Bandwidth-friendly background video.
 *
 * The site ships ~13MB of decorative video. Loading it all on first paint tanks
 * mobile load time — and most of it lives below the fold. LazyVideo defers each
 * clip: `preload="none"` means the browser fetches nothing until the element is
 * near the viewport, at which point we attach the source and autoplay it. When
 * it scrolls away we pause to free the decoder. Hero clips can opt into `eager`.
 *
 * Behaviour matches the previous inline tags: muted, looped, inline, decorative
 * (aria-hidden), object-cover via className.
 */
/**
 * Skip heavy decorative video on data-saver or slow (2g) connections —
 * these clips are purely decorative, so on constrained mobile links we
 * leave the navy background in place rather than spend the user's data and
 * delay first paint. Safe during SSR/prerender (navigator.connection is
 * absent in Node → returns false, so the prerendered markup is unchanged).
 */
function prefersLightMedia(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (!c) return false;
  return Boolean(c.saveData) || /(^|-)2g$/.test(c.effectiveType ?? "");
}

/**
 * Honor the OS "reduce motion" setting: decorative autoplay video is motion the
 * user has asked to avoid, so we leave the poster frame in place instead. Safe
 * during SSR/prerender (matchMedia absent in Node → false).
 */
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Don't load/animate decorative video on data-saver, slow links, or reduce-motion. */
function shouldSkipVideo(): boolean {
  return prefersLightMedia() || prefersReducedMotion();
}

export function LazyVideo({
  src,
  className,
  style,
  poster,
  eager = false,
  rootMargin = "300px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager && !shouldSkipVideo());

  useEffect(() => {
    if (shouldSkipVideo()) return; // skip heavy video on data-saver, slow links, or reduce-motion
    if (eager) return; // already active
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (old browsers) → just load it.
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
          } else if (active && ref.current) {
            // Pause off-screen to save CPU/battery; keep the buffered data.
            ref.current.pause();
          }
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, rootMargin, active]);

  // Once active, make sure playback (re)starts when it re-enters view.
  useEffect(() => {
    if (active && ref.current) {
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  }, [active]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      aria-hidden="true"
      preload={active ? "auto" : "none"}
      poster={poster}
      className={className}
      style={style}
      {...(active ? { autoPlay: true } : {})}
    >
      {active && <source src={src} type="video/mp4" />}
    </video>
  );
}
