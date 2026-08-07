import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/**
 * Consolidates a run of stacked sections into one tabbed module.
 *
 * The marketing pages got long by section count, not sentence length — /agents
 * ran ten consecutive sections all arguing the same case from different angles,
 * so a visitor scrolled 9,000px to reach a form. Tabs put those arguments in
 * one screen's worth of space and let the visitor pick the one they care about.
 *
 * Every panel stays mounted and is hidden with the `hidden` attribute rather
 * than unmounted, so all copy remains in the DOM for crawlers, react-snap's
 * prerendered markup, and in-page search. Only paint changes.
 *
 * Panels keep their own section markup, including their own background, so the
 * consolidated sections need no recolouring — a dark panel stays dark.
 *
 * Keyboard support follows the WAI-ARIA tabs pattern: arrows move between tabs,
 * Home/End jump to the ends.
 */
export function SectionTabs({
  tabs,
  eyebrow,
  heading,
  className = "",
}: {
  tabs: { id: string; label: string; panel: ReactNode }[];
  eyebrow?: string;
  heading?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    btnRefs.current[next]?.focus();
  };

  return (
    <div className={className}>
      {(eyebrow || heading) && (
        <div className="bg-ivory px-6 pt-10 text-center md:pt-14">
          {eyebrow && (
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
          )}
          {heading && (
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:text-3xl">
              {heading}
            </h2>
          )}
        </div>
      )}

      {/* Tab rail — scrolls horizontally on narrow screens rather than wrapping
          into a second row that reintroduces the height we just removed.
          Deliberately not sticky: `#root { overflow-x: hidden }` makes #root a
          scroll container, which silently breaks position:sticky site-wide, and
          relaxing that rule to pin this rail would let any wide element
          introduce horizontal page scroll. */}
      <div className="z-20 border-b border-hairline bg-ivory/95">
        <div
          role="tablist"
          aria-label={heading ?? "Sections"}
          onKeyDown={onKeyDown}
          className="scrollbar-hide mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 md:justify-center"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => { btnRefs.current[i] = el; }}
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative whitespace-nowrap px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 md:text-[11px] ${
                i === active ? "text-navy-deep" : "text-navy/45 hover:text-navy/75"
              }`}
            >
              {t.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-gold transition-opacity duration-300"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            </button>
          ))}
        </div>
      </div>

      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${baseId}-panel-${t.id}`}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          hidden={i !== active}
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
