import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Progressive disclosure for card body copy.
 *
 * The density problem on the marketing pages isn't the number of words — it's
 * that every word is painted at once, so a nine-card grid reads as a wall.
 * RevealText paints only the first `lines` at rest and expands on tap.
 *
 * The full text always stays in the DOM (CSS line-clamp, never conditional
 * rendering), so crawlers, prerendered markup, and screen readers still get
 * every word — the SEO and compliance surface is unchanged. Only the painted
 * height shrinks.
 *
 * The toggle only appears when the text actually overflows at the current
 * width, so short copy never grows a pointless "More" affordance.
 */
export function RevealText({
  children,
  lines = 2,
  className = "",
  moreLabel = "More",
  lessLabel = "Less",
}: {
  children: ReactNode;
  lines?: number;
  className?: string;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Measure only while collapsed — once expanded, scrollHeight === clientHeight
  // and a naive check would decide the text no longer overflows, hiding the
  // control the visitor needs to collapse it again.
  useEffect(() => {
    if (open) return;
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 2);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, children]);

  return (
    <div>
      <p
        ref={ref}
        className={className}
        style={
          open
            ? undefined
            : {
                display: "-webkit-box",
                WebkitLineClamp: lines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {children}
      </p>
      {(overflows || open) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            size={12}
            aria-hidden="true"
            className="transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
          />
        </button>
      )}
    </div>
  );
}
