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
export function LazyVideo({
  src,
  className,
  style,
  poster,
  eager = false,
  rootMargin = "300px",
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);

  useEffect(() => {
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
      preload={eager ? "auto" : "none"}
      poster={poster}
      className={className}
      style={style}
      {...(eager ? { autoPlay: true } : {})}
    >
      {active && <source src={src} type="video/mp4" />}
    </video>
  );
}
