import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

/** A poster costs no video bandwidth. Only a deliberate play mounts audible media. */
export function StoryVideo({ src, poster, label, lang = "en", shape = "portrait", note }: {
  src: string; poster: string; label: string; lang?: "en" | "es";
  shape?: "bubble" | "portrait" | "landscape"; note?: string;
}) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const playButton = useRef<HTMLButtonElement>(null);
  const es = lang === "es";
  const previewMotion = () => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData && !/2g/.test(connection?.effectiveType ?? "")) setPreviewing(true);
  };
  useEffect(() => {
    if (!started) return;
    const el = video.current;
    el?.focus();
    el?.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) el?.pause(); });
    if (el) observer.observe(el);
    const pause = () => { if (document.hidden) el?.pause(); };
    document.addEventListener("visibilitychange", pause);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pause); el?.pause(); };
  }, [started]);
  return <figure className={`story-video story-video--${started ? "open" : shape}`}>
    <div className="story-video-frame">
      {started ? <video ref={video} data-story-playback src={src} poster={poster} controls playsInline preload="metadata" tabIndex={0} aria-label={label} onPlay={() => { document.querySelectorAll<HTMLVideoElement>('video[data-story-playback]').forEach(el => { if (el !== video.current) el.pause(); }); }} onError={() => setFailed(true)} /> : <button ref={playButton} type="button" className="story-video-launch" onMouseEnter={previewMotion} onMouseLeave={() => setPreviewing(false)} onFocus={previewMotion} onBlur={() => setPreviewing(false)} onClick={() => { setPreviewing(false); setStarted(true); }} aria-label={`${es ? "Reproducir" : "Play"}: ${label}`}>
        <img src={poster} alt="" width={720} height={1280} loading="lazy" decoding="async" />
        {previewing && <video className="story-hover-video" src={src} autoPlay muted loop playsInline preload="none" aria-hidden="true" />}
        <span className="story-video-shade" />
        <span className="story-play"><Play size={24} fill="currentColor" aria-hidden="true" /></span>
        <span className="story-video-hint">{es ? "Reproducir con sonido" : "Play with sound"}</span>
      </button>}
    </div>
    {started && <button type="button" className="story-video-reset" onClick={() => { video.current?.pause(); setStarted(false); setFailed(false); requestAnimationFrame(() => playButton.current?.focus()); }}><RotateCcw size={15} aria-hidden="true" />{es ? "Volver a la vista previa" : "Back to preview"}</button>}
    {failed && <p role="status">{es ? "El video no está disponible. Puede solicitar su estrategia con el formulario." : "The film is unavailable. You can request your strategy using the form."}</p>}
    {note && <figcaption>{note}</figcaption>}
  </figure>;
}
