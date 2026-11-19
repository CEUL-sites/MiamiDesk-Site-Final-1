// No router hooks here: tests/hero-address-transfer.test.ts renders Hero
// through a minimal hook dispatcher without context support.
//
// In-flow House Bot for a page hero: figure + one-line speech bubble.
//
// It sits in normal document flow below the hero CTAs (never absolutely
// positioned), so it cannot overlap a headline or CTA at any width.
// data-housebot-hero is what HouseBotDock watches to know when the visitor
// has scrolled past the hero.

import { useEffect, useState, type KeyboardEvent } from "react";
import { openMiamiDeskChat } from "../../lib/miamiDeskChat";
import { trackMicroConversion } from "../../lib/analytics";
import { HouseBotStage } from "./HouseBotStage";
import { COMPLIANCE_FOOTER, DESKTOP_MIN_WIDTH, UI_COPY, bubbleLine, type HouseBotLang, type HouseBotVariant } from "./houseBotModel";

export function activateOnKey(e: KeyboardEvent<HTMLElement>, fn: () => void) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
}

export function HouseBotHero({
  variant,
  lang = "en",
  tone = "dark",
  className = "",
}: {
  variant: HouseBotVariant;
  /** Page language. Spanish pages pass "es"; Global Desk passes its in-page toggle. */
  lang?: HouseBotLang;
  tone?: "dark" | "light";
  className?: string;
}) {
  const line = bubbleLine(variant, lang);
  const ui = UI_COPY[lang];
  const [unavailable, setUnavailable] = useState(false);
  const [size, setSize] = useState(112);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const on = () => setSize(mq.matches ? 112 : 64);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (!line || unavailable) return null;

  const open = () => {
    trackMicroConversion("housebot_open", { location: `hero_${variant}`, lang });
    openMiamiDeskChat();
  };

  const bubble =
    tone === "dark"
      ? "border-gold/35 bg-navy-deep/85 text-white/90"
      : "border-gold/40 bg-white/95 text-navy-deep";
  const fine = tone === "dark" ? "text-white/65" : "text-navy-deep/70";

  return (
    <div data-housebot-hero className={`mt-6 flex items-center gap-3 md:gap-4 ${className}`}>
      <div
        role="button"
        tabIndex={0}
        aria-label={ui.openLabel}
        onClick={open}
        onKeyDown={(e) => activateOnKey(e, open)}
        className="shrink-0 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
      >
        <HouseBotStage mode="hero" size={size} onUnavailable={() => setUnavailable(true)} />
      </div>
      <div className={`relative max-w-sm rounded-xl border px-4 py-3 text-left shadow-xl backdrop-blur-sm ${bubble}`}>
        <span
          aria-hidden="true"
          className={`absolute -left-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-b border-l ${bubble}`}
        />
        <p className="relative font-sans text-sm leading-snug">{line}</p>
        <p className={`relative mt-2 font-mono text-[9.5px] uppercase leading-snug tracking-[0.08em] ${fine}`}>
          {ui.aiDisclosure} {COMPLIANCE_FOOTER}
        </p>
      </div>
    </div>
  );
}
