import { Pause, Play } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const VIDEO_SRC = "/media/hero-property-network.mp4";
const POSTER_SRC = "/images/hero-property-network.webp";

type NetworkInformation = {
  saveData?: boolean;
};

export function HeroPropertyAnimation() {
  const captionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPausedByUser, setIsPausedByUser] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

    const updateMotionPreference = () => {
      setCanAnimate(!reducedMotion.matches && !connection?.saveData);
    };

    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);
    return () => reducedMotion.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const shouldLoadVideo = canAnimate && isIntersecting;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncPlayback = async () => {
      if (!shouldLoadVideo || document.hidden || isPausedByUser) {
        video.pause();
        return;
      }

      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
    };

    void syncPlayback();
    const handleVisibilityChange = () => void syncPlayback();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [isPausedByUser, shouldLoadVideo]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      setIsPausedByUser(true);
      video.pause();
      return;
    }

    setIsPausedByUser(false);
    void video.play().catch(() => setIsPlaying(false));
  };

  return (
    <div ref={containerRef} className="hero-property-animation relative h-full w-full overflow-hidden">
      <img
        src={POSTER_SRC}
        alt=""
        aria-hidden="true"
        width="900"
        height="900"
        fetchPriority="high"
        className={`hero-property-media absolute inset-0 h-full w-full transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        playsInline
        loop
        preload="none"
        poster={POSTER_SRC}
        src={shouldLoadVideo ? VIDEO_SRC : undefined}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="hero-property-media absolute inset-0 h-full w-full"
      />

      <p
        id={captionId}
        role="note"
        className="absolute top-3 left-3 z-10 lg:top-auto lg:bottom-4 lg:left-4 max-w-[calc(100%-5rem)] rounded-sm bg-[#060D18]/75 px-2 py-1 font-sans text-[10px] leading-4 text-white/85 backdrop-blur-sm"
      >
        Illustrative service connections
      </p>

      {shouldLoadVideo && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause property animation" : "Play property animation"}
          aria-describedby={captionId}
          className="absolute bottom-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/45 bg-[#060D18]/80 text-white shadow-lg backdrop-blur-sm transition hover:bg-[#060D18] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {isPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
        </button>
      )}
    </div>
  );
}
