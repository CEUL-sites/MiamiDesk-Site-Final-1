import { useEffect, useRef, useState } from "react";
import { countEase, formatFigure, parseFigure } from "./countUpModel";

/**
 * A verified figure that counts up once, the first time it is scrolled into view.
 *
 * The figure renders as its final, exact string on first paint and only then
 * animates on the client, so the prerendered HTML always carries the correct
 * number. During react-snap prerendering the animation never starts at all
 * (`navigator.webdriver`) — a snapshot taken mid-count would bake a wrong figure
 * into the static HTML, and these numbers are cited claims.
 *
 * Reduced-motion visitors get the final value with no animation.
 */
export function CountUp({
  value,
  durationMs = 1400,
  className,
}: {
  /** The figure exactly as it is cited, e.g. "93,000" or "437+". */
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const parsed = parseFigure(value);
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (done.current || !parsed.animatable) return;
    if (typeof navigator !== "undefined" && navigator.webdriver) return; // prerender
    if (typeof window === "undefined") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = (now - start) / durationMs;
        setDisplay(formatFigure(parsed, parsed.value * countEase(t)));
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs, parsed.animatable, parsed.value, parsed.grouped, parsed.prefix, parsed.suffix]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
