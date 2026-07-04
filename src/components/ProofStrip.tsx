import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const QUOTES = [
  {
    text: "Carlos maintained the same level of professionalism and dedication through the whole experience — available at all times, from listing to closing.",
    name: "A. Martinez",
    location: "Sunrise, FL",
  },
  {
    text: "Carlos was exceptional in selling our home swiftly at a great price and securing a beneficial 7-month post-occupancy that eased our family's relocation.",
    name: "Diego Tolotto",
    location: "Weston, FL",
  },
  {
    text: "Amazing negotiating skills and professional work on a 1031 exchange — sold a retail property and bought two properties in Miami.",
    name: "Raimundo Vazquez",
    location: "Doral, FL",
  },
] as const;

const INTERVAL_MS = 7000;

function StarRow() {
  return (
    <span className="flex gap-0.5 flex-shrink-0" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 12 12"
          fill="currentColor"
          className="text-gold"
        >
          <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z" />
        </svg>
      ))}
    </span>
  );
}

export function ProofStrip() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current || paused) return;

    const tick = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % QUOTES.length);
        setVisible(true);
      }, 350);
    }, INTERVAL_MS);

    return () => clearInterval(tick);
  }, [paused]);

  const quote = QUOTES[index];

  return (
    <div className="border-t border-b border-hairline bg-ivory py-5">
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        {/* Left: stars + label */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <StarRow />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70 whitespace-nowrap">
            5.0 · Verified Client Reviews
          </p>
        </div>

        {/* Divider — desktop only */}
        <div
          className="hidden sm:block h-8 w-px bg-hairline flex-shrink-0"
          aria-hidden="true"
        />

        {/* Center: rotating quote */}
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <blockquote
            className="flex-1 min-w-0"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          >
            <p className="font-serif italic text-sm leading-relaxed text-navy/80">
              "{quote.text}"
            </p>
            <footer className="mt-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
                — {quote.name} · {quote.location}
              </span>
            </footer>
          </blockquote>

          {/* Pause control — WCAG 2.2.2 requires a way to stop content that
              auto-updates past 5s; sized for a comfortable touch target. */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume rotating reviews" : "Pause rotating reviews"}
            aria-pressed={paused}
            className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-navy/70 transition-colors hover:border-gold hover:text-gold"
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>

        {/* Right: all reviews link */}
        <a
          href="https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex flex-shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink hover:text-navy transition-colors whitespace-nowrap"
          aria-label="Read all verified client reviews on Realtor.com"
        >
          All reviews →
        </a>
      </div>
    </div>
  );
}
