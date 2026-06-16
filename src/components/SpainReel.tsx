import { useEffect, useRef, useState } from "react";

/**
 * Portrait auto-cycling reel for the Global Desk video panel.
 *
 * Fills its (positioned) parent and rotates through vertical clips, advancing
 * on each clip's end. Loading is deferred until the panel nears the viewport —
 * same bandwidth discipline as LazyVideo — and tapping a dot jumps to a clip.
 */
export function SpainReel({ clips }: { clips: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const [near, setNear] = useState(false);
  const [idx, setIdx] = useState(0);

  // Defer load until near the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Load & play the active clip whenever it changes. Updating the <source>
  // element's src (instead of the <video>'s src directly) and then calling
  // load() avoids a spurious DEMUXER_ERROR_NO_SUPPORTED_STREAMS that
  // Chromium throws when video.src is set directly.
  useEffect(() => {
    const v = videoRef.current;
    const s = sourceRef.current;
    if (!v || !s || !near) return;
    v.muted = true;
    s.src = clips[idx];
    v.load();
    const tryPlay = () => { const p = v.play(); if (p) p.catch(() => {}); };
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [idx, near, clips]);

  const handleEnded = () => setIdx((i) => (i + 1) % clips.length);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {near && (
        <video
          ref={videoRef}
          muted
          playsInline
          aria-hidden="true"
          preload="auto"
          loop={clips.length === 1}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source ref={sourceRef} type="video/mp4" />
        </video>
      )}

      {clips.length > 1 && (
        <div className="absolute left-1/2 top-3 z-10 flex -translate-x-1/2 gap-1.5">
          {clips.map((c, i) => (
            <button
              key={c}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Clip ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${i === idx ? "w-5 bg-gold" : "w-1.5 bg-white/35"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
