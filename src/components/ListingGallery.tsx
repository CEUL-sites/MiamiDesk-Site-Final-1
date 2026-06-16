// Listing-media gallery — Visual 1 "show the work".
// Manifest-driven: populate src/data/galleryManifest.ts to fill slots.
// Films: click-to-play, never autoplay. Photos: large, 1.02 scale on hover.
// Placeholder slots show gracefully when assets are absent — never stock imagery.

import { useRef, useState } from "react";
import { Play, ArrowRight, ImageOff } from "lucide-react";
import { GALLERY_ITEMS, GALLERY_CAPTION, GALLERY_CTA } from "../data/galleryManifest";

const NAVY_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%230B1E3F'/%3E%3C/svg%3E";

// Individual film player — poster until clicked, then plays in place.
function FilmTile({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster?: string;
  caption: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Attach src only on click — never preloaded.
    const v = videoRef.current;
    if (!v) return;
    if (!v.src) {
      v.src = src;
      v.load();
    }
    v.play().catch(() => {});
  };

  return (
    <div className={`group relative overflow-hidden bg-[#060D18] ${className ?? ""}`}>
      {/* Video element — src attached on first play click */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster={poster ?? NAVY_POSTER}
        controls={playing}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Play overlay — hidden once playing */}
      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play: ${caption}`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy-deep/20 transition-all duration-500 group-hover:bg-navy-deep/10"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-navy-deep/70 text-gold shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </span>
        </button>
      )}

      {/* Caption strip */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent px-4 pb-3 pt-8">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/70">{caption}</p>
      </div>
    </div>
  );
}

// Photo tile — scale on hover, graceful placeholder when src is absent.
function PhotoTile({
  src,
  caption,
  needed,
  className,
}: {
  src?: string;
  caption: string;
  needed?: string;
  className?: string;
}) {
  if (!src) {
    // Placeholder state — clean, informative, never a stock image.
    return (
      <div
        className={`relative flex flex-col items-center justify-center gap-3 border border-dashed border-white/10 bg-[#06101E] p-6 text-center ${className ?? ""}`}
      >
        <ImageOff size={20} className="text-white/20" strokeWidth={1} />
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">{caption}</p>
        {needed && (
          <p className="max-w-[180px] font-sans text-[10px] leading-relaxed text-white/15">
            {needed}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`group relative overflow-hidden ${className ?? ""}`}>
      <img
        src={src}
        alt={caption}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/70 to-transparent px-4 pb-3 pt-8">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/70">{caption}</p>
      </div>
    </div>
  );
}

// Asymmetric editorial grid.
// Slot layout (desktop):
//   [ FILM — wide ] [ PHOTO portrait ]
//   [ PHOTO ]       [ PHOTO ]
//   [ FILM — wide            ]
//   [ PHOTO ]
// On mobile: single column stack.
export function ListingGallery() {
  const items = GALLERY_ITEMS;

  // Separate films and photos for layout assignment.
  const films  = items.filter((i) => i.type === "film");
  const photos = items.filter((i) => i.type === "photo");

  return (
    <section className="border-t border-hairline bg-[#050B17] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">The Work</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
              How the marketing<br />
              <em className="not-italic italic text-gold">actually looks.</em>
            </h2>
          </div>
          <p className="max-w-sm font-sans text-[14px] leading-relaxed text-white/50">
            {GALLERY_CAPTION}
          </p>
        </div>

        {/* Editorial grid */}
        <div className="grid gap-px bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-3">

          {/* Row 1 — wide film (spans 2 cols) + portrait photo */}
          {films[0] && (
            <div className="relative sm:col-span-2" style={{ paddingBottom: "42%" }}>
              <FilmTile
                src={films[0].src!}
                poster={films[0].poster}
                caption={films[0].caption}
                className="absolute inset-0"
              />
            </div>
          )}
          <div className="relative" style={{ paddingBottom: "100%" }}>
            {photos[0] ? (
              <PhotoTile
                src={photos[0].src}
                caption={photos[0].caption}
                needed={photos[0].needed}
                className="absolute inset-0"
              />
            ) : null}
          </div>

          {/* Row 2 — two square photos */}
          {[photos[1], photos[2]].map((photo, i) =>
            photo ? (
              <div key={i} className="relative" style={{ paddingBottom: "75%" }}>
                <PhotoTile
                  src={photo.src}
                  caption={photo.caption}
                  needed={photo.needed}
                  className="absolute inset-0"
                />
              </div>
            ) : null,
          )}

          {/* Row 2 continued — portrait photo */}
          {photos[3] && (
            <div className="relative" style={{ paddingBottom: "133%" }}>
              <PhotoTile
                src={photos[3].src}
                caption={photos[3].caption}
                needed={photos[3].needed}
                className="absolute inset-0"
              />
            </div>
          )}

          {/* Row 3 — second film, wide */}
          {films[1] && (
            <div className="relative sm:col-span-2 lg:col-span-3" style={{ paddingBottom: "36%" }}>
              <FilmTile
                src={films[1].src!}
                poster={films[1].poster}
                caption={films[1].caption}
                className="absolute inset-0"
              />
            </div>
          )}
        </div>

        {/* Asset placeholder notice (shown only when any photo slot is empty) */}
        {photos.some((p) => !p.src) && (
          <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
            Photography slots pending asset delivery — see manifest for shot list
          </p>
        )}

        {/* Caption + CTA */}
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
            Cinematic listing media · Professional photography · Virtual tours · 3D walkthroughs
          </p>
          <a
            href={GALLERY_CTA.href}
            className="group inline-flex items-center gap-2 border border-gold/40 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold/8"
          >
            {GALLERY_CTA.label}
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
