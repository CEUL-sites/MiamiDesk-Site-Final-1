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
 * - Phones get a vertical cut chosen once on mount; the prerendered markup is
 *   the desktop poster, so react-snap output is unchanged.
 *
 * Clips are AI-generated conceptual imagery from the HomesProfessional video
 * library (public/videos/hero/*). Each page passes its own `name`.
 */
export type HeroVideoName = "home" | "sellers" | "buyers" | "markets" | "global";

const MOBILE_QUERY = "(max-width: 767px)";

export function HeroVideoBackdrop({ name, position = "center" }: { name: HeroVideoName; position?: string }) {
  const [isMobile, setIsMobile] = useState(false);
  // The clip mounts only in a real browser document (never in DOM-less test harnesses).
  const [hasDocument, setHasDocument] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    setHasDocument(true);
    if (typeof window.matchMedia === "function") setIsMobile(window.matchMedia(MOBILE_QUERY).matches);
  }, []);

  const poster = isMobile ? `/images/hero/${name}-mobile.webp` : `/images/hero/${name}.webp`;
  const src = isMobile ? `/videos/hero/${name}-mobile.mp4` : `/videos/hero/${name}.mp4`;

  return (
    <div className="hero-video-backdrop" aria-hidden="true">
      <picture>
        <source media={MOBILE_QUERY} srcSet={`/images/hero/${name}-mobile.webp`} />
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
      <div className="hero-video-scrim" />
    </div>
  );
}
