import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * The FAQ block every landing page ends on, as a disclosure list instead of a
 * wall of prose.
 *
 * Seventeen English and three Spanish landing pages each printed five 400-plus
 * character answers fully expanded, one after another. That is the single
 * largest block of always-visible body copy on the site and the place visitors
 * stop reading — a screen and a half of grey paragraphs below the fold, with no
 * way to find the one question that applies to them.
 *
 * Every answer stays in the DOM whether open or closed. The panel collapses by
 * animating `grid-template-rows` from `0fr` to `1fr` rather than by unmounting,
 * so react-snap's prerendered HTML, crawlers, AI answer engines, and in-page
 * search (Cmd-F) all still see the full text — the same contract SectionTabs
 * keeps with its `hidden` panels. Only paint changes. Pages that emit FAQPage
 * structured data keep emitting it from the same array, so the schema and the
 * visible copy can never drift.
 *
 * Items toggle independently: a visitor scanning for two related answers should
 * not have the first one close when they open the second.
 *
 * Answers are plain text with no interactive children, so `aria-hidden` on a
 * collapsed panel cannot orphan a focusable element. Keep it that way — if an
 * answer ever needs a link, drop the `aria-hidden` and gate on `hidden` after
 * the transition instead.
 */

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({
  faqs,
  tone = "dark",
  defaultOpen = 0,
  className = "",
}: {
  faqs: readonly FaqItem[];
  /** `dark` sits on the navy FAQ band; `light` on ivory/white sections. */
  tone?: "dark" | "light";
  /** Index open on first paint. Pass `-1` to start fully collapsed. */
  defaultOpen?: number;
  className?: string;
}) {
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const baseId = useId();

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]));

  const dark = tone === "dark";
  const divide = dark ? "divide-white/10" : "divide-hairline";
  const question = dark ? "text-white" : "text-navy-deep";
  const answer = dark ? "text-white/70" : "text-ink-primary/70";
  const index = dark ? "text-gold/55" : "text-gold-ink/60";
  const hoverRow = dark ? "hover:bg-white/[0.03]" : "hover:bg-navy/[0.02]";

  return (
    <div className={`faq-accordion divide-y ${divide} ${className}`}>
      <style>{`
        .faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.34s cubic-bezier(0.22,1,0.36,1);
        }
        .faq-panel[data-open="true"] { grid-template-rows: 1fr; }
        .faq-panel > div { overflow: hidden; }
        .faq-panel-body {
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.28s ease 0.04s, transform 0.28s ease 0.04s;
        }
        .faq-panel[data-open="true"] .faq-panel-body { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .faq-panel, .faq-panel-body { transition: none; }
        }
      `}</style>

      {faqs.map((faq, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={faq.q}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-q-${i}`}
                className={`group flex w-full items-start gap-4 px-2 py-5 text-left transition-colors ${hoverRow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 md:py-6`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-1 shrink-0 font-mono text-[10px] tabular-nums tracking-[0.18em] ${index}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`flex-1 font-serif text-lg leading-snug ${question}`}>{faq.q}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`mt-1 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`}
                />
              </button>
            </h3>

            <div
              className="faq-panel"
              data-open={isOpen}
              id={`${baseId}-panel-${i}`}
              role="region"
              aria-labelledby={`${baseId}-q-${i}`}
              aria-hidden={!isOpen}
            >
              <div>
                <p
                  className={`faq-panel-body max-w-3xl pb-6 pl-9 pr-2 font-sans text-[0.9rem] leading-relaxed ${answer} md:pb-7`}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
