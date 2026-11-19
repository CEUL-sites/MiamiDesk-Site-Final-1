// Site-wide docked House Bot: a small floating button bottom-right that
// appears once the visitor has scrolled past the hero. Click opens the Miami
// Desk chat; "×" hides it for the rest of the session (sessionStorage).
// Mounted once in main.tsx, beside WhatsAppFloat.

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { openMiamiDeskChat, subscribeMiamiDeskChat } from "../../lib/miamiDeskChat";
import { trackMicroConversion } from "../../lib/analytics";
import { HouseBotStage } from "./HouseBotStage";
import { activateOnKey } from "./HouseBotHero";
import { DESKTOP_MIN_WIDTH, DISMISS_STORAGE_KEY, UI_COPY, isDockSuppressedRoute, langForPath } from "./houseBotModel";

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** The element whose exit from view means "scrolled past the hero". */
function findHero(): Element | null {
  return (
    document.querySelector("[data-housebot-hero]") ??
    document.querySelector(".hero-root") ??
    document.querySelector("main section, section")
  );
}

export function HouseBotDock() {
  const { pathname } = useLocation();
  const lang = langForPath(pathname);
  const ui = UI_COPY[lang];
  const [dismissed, setDismissed] = useState(true);
  const [pastHero, setPastHero] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [size, setSize] = useState(96);

  useEffect(() => setDismissed(readDismissed()), []);
  useEffect(() => subscribeMiamiDeskChat(setChatOpen), []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const on = () => setSize(mq.matches ? 96 : 72);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Lazy routes render after Suspense resolves, so retry briefly until the
  // hero exists, then watch it.
  useEffect(() => {
    setPastHero(false);
    let io: IntersectionObserver | null = null;
    let tries = 0;
    let timer = 0;
    const attach = () => {
      const hero = findHero();
      if (!hero) {
        if (tries++ < 20) timer = window.setTimeout(attach, 150);
        else setPastHero(true);
        return;
      }
      io = new IntersectionObserver(
        ([e]) => setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0),
        { threshold: 0 },
      );
      io.observe(hero);
    };
    attach();
    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  if (dismissed || unavailable || isDockSuppressedRoute(pathname)) return null;

  const visible = pastHero && !chatOpen;

  const open = () => {
    trackMicroConversion("housebot_open", { location: "dock", lang });
    openMiamiDeskChat();
  };

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      /* storage blocked — hide for this page view only */
    }
    setDismissed(true);
  };

  return (
    <div
      className={`fixed right-3 z-40 bottom-[calc(96px+env(safe-area-inset-bottom))] transition-all duration-300 lg:right-6 lg:bottom-28 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        role="button"
        tabIndex={visible ? 0 : -1}
        aria-label={ui.openLabel}
        onClick={open}
        onKeyDown={(e) => activateOnKey(e, open)}
        className="cursor-pointer overflow-hidden rounded-full border border-gold/30 bg-navy-deep/80 shadow-2xl shadow-black/40 backdrop-blur-md outline-none transition-colors hover:border-gold focus-visible:ring-2 focus-visible:ring-gold"
      >
        <HouseBotStage mode="dock" size={size} onUnavailable={() => setUnavailable(true)} />
      </div>
      <button
        type="button"
        onClick={dismiss}
        tabIndex={visible ? 0 : -1}
        aria-label={ui.hideLabel}
        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-navy-deep text-white/80 shadow hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
      >
        <X size={12} aria-hidden="true" />
      </button>
    </div>
  );
}
