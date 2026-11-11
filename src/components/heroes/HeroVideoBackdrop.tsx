import { useEffect, useState } from "react";
import { LazyVideo } from "../LazyVideo";
import "./hero-video.css";

/**
 * Full-bleed video backdrop for the redesigned page heroes.
 *
 * Performance contract (the homepage LCP budget depends on it):
 * - The poster <img> is the first paint and the LCP element. It carries
 *   fetchPriority="high" and real dimensions; the video never competes with it.
 * - The clip itself goes through LazyVideo in `idle` mode: nothing is fetched
 *   until window `load` plus an idle slot, and nothing loads at all on
 *   data-saver, 2g or prefers-reduced-motion. Those visitors keep the poster.
 * - Phones get a vertical cut chosen on mount (and on breakpoint changes). The
 *   clip is never mounted during react-snap prerendering, so the static HTML
 *   holds only the responsive poster.
 *
 * Clips are AI-generated conceptual imagery from the HomesProfessional video
 * library (public/videos/hero/*). Each page passes its own `name`.
 */
export type HeroVideoName = "home" | "sellers" | "buyers" | "markets" | "global";

const MOBILE_QUERY = "(max-width: 767px)";

export function HeroVideoBackdrop({
  name,
  position = "center",
  mobileCut = true,
  scrim = "side",
}: {
  name: HeroVideoName;
  position?: string;
  /** Use the vertical phone cut below 768px. Set false to center-crop the landscape clip instead (sharper for some sources). */
  mobileCut?: boolean;
  /** "side" for copy on the left (default); "center" for centered copy, as on the Spanish pages;
   *  "none" when the page already layers its own overlays. */
  scrim?: "side" | "center" | "none";
}) {
  const [isMobile, setIsMobile] = useState(false);
  // The clip mounts only in a real browser document (never in DOM-less test harnesses).
  const [hasDocument, setHasDocument] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    // react-snap (puppeteer) sets navigator.webdriver during prerender. Keep the clip out of the
    // snapshot so the static HTML carries only the responsive poster, never a <video src preload>.
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    setHasDocument(true);
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia(MOBILE_QUERY);
    setIsMobile(query.matches);
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    query.addEventListener?.("change", onChange);
    return () => query.removeEventListener?.("change", onChange);
  }, []);

  const useMobileCut = isMobile && mobileCut;
  const poster = useMobileCut ? `/images/hero/${name}-mobile.webp` : `/images/hero/${name}.webp`;
  const src = useMobileCut ? `/videos/hero/${name}-mobile.mp4` : `/videos/hero/${name}.mp4`;

  return (
    <div className={scrim === "center" ? "hero-video-backdrop hero-video-backdrop--center" : "hero-video-backdrop"} aria-hidden="true">
      <picture>
        {mobileCut && <source media={MOBILE_QUERY} srcSet={`/images/hero/${name}-mobile.webp`} />}
        <img
          className="hero-video-media"
          src={`/images/hero/${name}.webp`}
          width="1280"
          height="720"
          alt=""
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: position }}
        />
      </picture>
      {hasDocument && (
        <LazyVideo
          src={src}
          poster={poster}
          idle
          className="hero-video-media hero-video-clip"
          style={{ objectPosition: position }}
        />
      )}
      {scrim !== "none" && <div className="hero-video-scrim" />}
    </div>
  );
}
