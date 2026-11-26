// Site-wide docked House Bot — the "section guide".
//
// - Appears (pops in and waves) once the visitor scrolls past the hero.
// - Floats gently in its corner. When a key section of the page comes into
//   view and the visitor pauses scrolling, it travels up the screen edge to
//   sit beside that section, leans toward it (Present) and shows one short
//   tip (desktop only; on phones it stays docked). After a few seconds — or as soon as the visitor scrolls on — it
//   returns to the corner.
// - At most MAX_TIPS_PER_PAGE tips per page and each tip once per session,
//   so it guides without nagging. prefers-reduced-motion keeps it still.
// - Click / Enter / Space opens the Miami Desk chat; "×" hides it for the
//   session. Mounted once in main.tsx.

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { openMiamiDeskChat, subscribeMiamiDeskChat } from "../../lib/miamiDeskChat";
import { trackMicroConversion } from "../../lib/analytics";
import { HouseBotStage } from "./HouseBotStage";
import { activateOnKey } from "./HouseBotHero";
import {
  DESKTOP_MIN_WIDTH,
  DISMISS_STORAGE_KEY,
  MAX_TIPS_PER_PAGE,
  TIP_COPY,
  TIP_DURATION_MS,
  TIP_LABEL,
  TIP_SCROLL_IDLE_MS,
  TIP_SEEN_KEY,
  UI_COPY,
  isDockSuppressedRoute,
  langForPath,
  tipTargetsFor,
  travelLift,
  type HouseBotLang,
  type TipKey,
} from "./houseBotModel";

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function readSeen(): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(TIP_SEEN_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function markSeen(key: string) {
  try {
    const seen = readSeen();
    seen.add(key);
    sessionStorage.setItem(TIP_SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    /* storage blocked — the per-page cap still applies */
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

/** Pages with an in-page EN/ES toggle mark their sections with lang. */
function langOf(el: Element, fallback: HouseBotLang): HouseBotLang {
  const l = el.closest("[lang]")?.getAttribute("lang") ?? "";
  return l.startsWith("es") ? "es" : l.startsWith("en") ? "en" : fallback;
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
  const [reducedMotion, setReducedMotion] = useState(true);
  // Mount the figure (and its WebGL context) only once the dock is first shown.
  const [revealed, setRevealed] = useState(false);
  const [greetSignal, setGreetSignal] = useState(0);
  const [presentSignal, setPresentSignal] = useState(0);
  const [lift, setLift] = useState(0);
  const [tip, setTip] = useState<{ key: TipKey; lang: HouseBotLang } | null>(null);

  const travelerRef = useRef<HTMLDivElement>(null);
  const state = useRef({ visible: false, chatOpen: false, tipActive: false, shown: 0, tipScrollY: 0 });

  useEffect(() => setDismissed(readDismissed()), []);
  useEffect(() => subscribeMiamiDeskChat(setChatOpen), []);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => {
      setSize(mq.matches ? 96 : 72);
      setReducedMotion(rm.matches);
    };
    on();
    mq.addEventListener("change", on);
    rm.addEventListener("change", on);
    return () => {
      mq.removeEventListener("change", on);
      rm.removeEventListener("change", on);
    };
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

  // First appearance: pop in and wave.
  useEffect(() => {
    if (pastHero && !revealed) {
      setRevealed(true);
      setGreetSignal((n) => n + 1);
    }
  }, [pastHero, revealed]);

  const visible = pastHero && !chatOpen;
  state.current.visible = visible && !dismissed;
  state.current.chatOpen = chatOpen;

  const endTip = useCallback(() => {
    state.current.tipActive = false;
    setTip(null);
    setLift(0);
  }, []);

  // Close any tip when the chat opens or the bot hides.
  useEffect(() => {
    if (!visible && state.current.tipActive) endTip();
  }, [visible, endTip]);

  // ── Section guide ───────────────────────────────────────────────────────
  useEffect(() => {
    state.current.shown = 0;
    endTip();
    const targets = tipTargetsFor(pathname);
    if (!targets.length) return;

    const ratios = new Map<Element, number>();
    const keyOf = new Map<Element, TipKey>();
    let io: IntersectionObserver | null = null;
    let idleTimer = 0;
    let tipTimer = 0;
    let findTimer = 0;
    let tries = 0;

    const tryShow = () => {
      const s = state.current;
      if (!s.visible || s.chatOpen || s.tipActive || s.shown >= MAX_TIPS_PER_PAGE) return;
      // On phones the tip bubble would cover the content it points at, on top
      // of the sticky CTA bar. The bot stays docked; tips are desktop-only.
      if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
      const seen = readSeen();
      const el = [...keyOf.keys()].find((e) => (ratios.get(e) ?? 0) >= 0.35 && !seen.has(keyOf.get(e) as string));
      const traveler = travelerRef.current;
      if (!el || !traveler) return;
      const key = keyOf.get(el) as TipKey;
      const rect = el.getBoundingClientRect();
      const restTop = traveler.getBoundingClientRect().top;
      s.tipActive = true;
      s.shown += 1;
      s.tipScrollY = window.scrollY;
      markSeen(key);
      setLift(travelLift(restTop, rect.top, window.innerHeight, traveler.offsetHeight, window.innerWidth >= DESKTOP_MIN_WIDTH));
      setPresentSignal((n) => n + 1);
      setTip({ key, lang: langOf(el, lang) });
      trackMicroConversion("housebot_tip_shown", { tip: key, page: pathname });
      window.clearTimeout(tipTimer);
      tipTimer = window.setTimeout(endTip, TIP_DURATION_MS);
    };

    const onScroll = () => {
      const s = state.current;
      if (s.tipActive && Math.abs(window.scrollY - s.tipScrollY) > 140) {
        window.clearTimeout(tipTimer);
        endTip();
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(tryShow, TIP_SCROLL_IDLE_MS);
    };

    const attach = () => {
      const found = targets
        .map((t) => ({ t, el: document.querySelector(t.selector) }))
        .filter((x): x is { t: (typeof targets)[number]; el: Element } => !!x.el);
      if (!found.length) {
        if (tries++ < 20) findTimer = window.setTimeout(attach, 200);
        return;
      }
      io = new IntersectionObserver(
        // Coverage of the section OR of the screen: a section taller than the
        // phone screen can never be 35% visible, but it can fill the screen.
        (entries) =>
          entries.forEach((e) => {
            const h = e.intersectionRect.height;
            const cover = Math.max(e.intersectionRatio, h / Math.max(1, window.innerHeight));
            ratios.set(e.target, cover);
          }),
        { threshold: [0, 0.1, 0.2, 0.35, 0.5, 0.75, 1] },
      );
      for (const { t, el } of found) {
        keyOf.set(el, t.key);
        io.observe(el);
      }
    };

    attach();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
      window.clearTimeout(tipTimer);
      window.clearTimeout(findTimer);
      io?.disconnect();
    };
  }, [pathname, lang, endTip]);

  if (dismissed || unavailable || isDockSuppressedRoute(pathname)) return null;

  const open = (location: string) => () => {
    trackMicroConversion("housebot_open", { location, lang });
    endTip();
    openMiamiDeskChat();
  };

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, "1");
    } catch {
      /* storage blocked — hide for this page view only */
    }
    endTip();
    setDismissed(true);
  };

  const motion = !reducedMotion;

  return (
    <div
      className={`fixed right-3 z-40 bottom-[calc(96px+env(safe-area-inset-bottom))] transition-opacity duration-300 lg:right-6 lg:bottom-28 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div
        ref={travelerRef}
        className="relative"
        style={{
          transform: `translateY(${-lift}px)`,
          transition: motion ? "transform 750ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        <div className={motion && visible ? (revealed ? "housebot-pop" : "") : ""}>
          <div className={motion && !tip ? "housebot-float" : ""}>
            <div
              role="button"
              tabIndex={visible ? 0 : -1}
              aria-label={ui.openLabel}
              onClick={open("dock")}
              onKeyDown={(e) => activateOnKey(e, open("dock"))}
              className="cursor-pointer overflow-hidden rounded-full border border-gold/30 bg-navy-deep/80 shadow-2xl shadow-black/40 backdrop-blur-md outline-none transition-colors hover:border-gold focus-visible:ring-2 focus-visible:ring-gold"
            >
              {revealed ? (
                <HouseBotStage
                  mode="dock"
                  size={size}
                  greetSignal={greetSignal}
                  presentSignal={presentSignal}
                  onUnavailable={() => setUnavailable(true)}
                />
              ) : (
                <div style={{ width: size, height: size }} />
              )}
            </div>
          </div>
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

        {/* Tip bubble — beside the bot, toward the section it points at */}
        <div role="status" aria-live="polite" className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2">
          {tip && (
            <div
              className={`pointer-events-auto relative w-[min(240px,calc(100vw-128px))] max-md:w-[min(210px,calc(100vw-128px))] rounded-xl border border-gold/40 bg-navy-deep/95 px-3.5 py-3 text-left text-white shadow-2xl shadow-black/50 backdrop-blur-md ${
                motion ? "housebot-tip-in" : ""
              }`}
            >
              <span aria-hidden="true" className="absolute -right-[7px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-gold/40 bg-navy-deep/95" />
              <p className="pr-5 font-mono text-xs uppercase tracking-[0.12em] text-gold">{TIP_LABEL[tip.lang]}</p>
              <button type="button" onClick={open(`tip_${tip.key}`)} className="mt-1 block text-left font-sans text-[13px] leading-snug text-white/90 hover:text-white">
                {TIP_COPY[tip.lang][tip.key]}
              </button>
              <button
                type="button"
                onClick={endTip}
                aria-label={tip.lang === "es" ? "Cerrar sugerencia" : "Close tip"}
                className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-white/60 hover:text-white"
              >
                <X size={11} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
