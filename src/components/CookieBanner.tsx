import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConsent, setConsent as storeConsent, type Consent } from "../lib/consent";

// How long to wait for a route's hero CTA to mount before concluding the page
// has none. Every page except the homepage is a lazy chunk, so the CTA is not
// in the DOM when this component's effects first run.
const CTA_SETTLE_MS = 1500;

export function CookieBanner() {
  const { pathname } = useLocation();
  const [consent, setConsentState] = useState<Consent>("accepted"); // start hidden to avoid SSR flash
  const [ctaCovered, setCtaCovered] = useState(false);
  // Whether we yet know if this route has a hero CTA in view. Until it settles
  // the banner holds, so it can't flash over a CTA that is still loading.
  const [ctaResolved, setCtaResolved] = useState(false);
  // Backstop so yielding to the CTA can never swallow the prompt entirely: a
  // visitor who reads the hero without ever scrolling still gets the choice.
  const [waitedOut, setWaitedOut] = useState(false);

  useEffect(() => {
    setConsentState(getConsent());
  }, []);

  // On desktop the banner sits bottom-left, which is the same band the hero's
  // primary CTA occupies on shorter laptop viewports (~1440x780) — it lands on
  // top of the one button the page exists to get clicked. Yield until the CTA
  // has scrolled away, mirroring how MobileStickyCTA yields to its guards.
  //
  // Mobile is deliberately untouched: there the banner spans the full width
  // well below the CTA and never covers it, and MobileStickyCTA waits on the
  // consent choice, so delaying the banner there would delay the pill too.
  //
  // This does not weaken consent. Non-essential storage is gated independently
  // of this banner — Google Consent Mode defaults to denied for EU/EEA/UK/ES,
  // and pixelsAllowed() in index.html holds Meta/LinkedIn until an explicit
  // opt-in — so nothing fires early just because the banner renders later.
  //
  // Every route except the homepage is a lazy chunk, so querying for the CTA
  // once on mount found nothing on exactly the pages that have one
  // (/sell-south-florida, /buy, /global-desk) and the banner rendered straight
  // over it. Watch the tree until the CTA mounts, and re-run per route so a
  // client-side navigation re-evaluates instead of keeping the previous page's
  // answer.
  useEffect(() => {
    setCtaCovered(false);
    setCtaResolved(false);

    const desktop = window.matchMedia("(min-width: 768px)");
    let observer: IntersectionObserver | null = null;
    let mutation: MutationObserver | null = null;
    let settle: number | undefined;
    let cta: Element | null = null;

    const sync = () => {
      observer?.disconnect();
      observer = null;
      if (!cta) return;
      if (!desktop.matches) {
        setCtaCovered(false);
        setCtaResolved(true);
        return;
      }
      // Resolve inside the callback, not at observe() time: the first
      // intersection record arrives a frame later, and resolving early would
      // show the banner for that frame.
      observer = new IntersectionObserver(
        ([entry]) => {
          setCtaCovered(entry.isIntersecting);
          setCtaResolved(true);
        },
        { threshold: 0.1 }
      );
      observer.observe(cta);
    };

    const findCta = () => {
      const found = document.querySelector(".hero-cta-main");
      if (!found || found === cta) return;
      cta = found;
      mutation?.disconnect();
      mutation = null;
      window.clearTimeout(settle);
      sync();
    };

    findCta();
    if (!cta) {
      mutation = new MutationObserver(findCta);
      mutation.observe(document.body, { childList: true, subtree: true });
      // No CTA showed up in time — this page has none, so stop holding.
      settle = window.setTimeout(() => setCtaResolved(true), CTA_SETTLE_MS);
    }

    desktop.addEventListener("change", sync);
    return () => {
      observer?.disconnect();
      mutation?.disconnect();
      window.clearTimeout(settle);
      desktop.removeEventListener("change", sync);
    };
  }, [pathname]);

  useEffect(() => {
    const id = window.setTimeout(() => setWaitedOut(true), 12000);
    return () => window.clearTimeout(id);
  }, []);

  if (consent !== null) return null;
  // The 12s backstop overrides both gates, so a slow or missing CTA can never
  // suppress the prompt for the whole visit.
  if (!waitedOut && (!ctaResolved || ctaCovered)) return null;

  // storeConsent persists the choice and emits "hp-consent-change" so the
  // tracking layer (src/lib/analytics.ts) honors it immediately this session.
  const accept = () => { storeConsent("accepted"); setConsentState("accepted"); };
  const decline = () => { storeConsent("declined"); setConsentState("declined"); };

  return (
    <div
      role="dialog"
      aria-label="Cookie preference"
      className="fixed bottom-4 left-4 right-4 z-[9999] rounded-lg border border-gold/25 bg-navy-deep/95 px-4 py-3 shadow-2xl backdrop-blur md:bottom-6 md:left-6 md:right-auto md:max-w-xs md:px-5 md:py-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Cookie Notice</p>
      <p className="mt-1 font-sans text-xs leading-relaxed text-white/65">
        We use analytics cookies to understand site usage. Declining does not affect core functionality.{" "}
        <a href="/privacy" className="underline hover:text-gold">Privacy Policy</a>
      </p>
      <div className="mt-2.5 flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-gold py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90 md:py-2.5"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-white/20 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white md:py-2.5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
