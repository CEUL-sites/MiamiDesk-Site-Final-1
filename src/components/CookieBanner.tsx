import { useEffect, useState } from "react";
import { getConsent, setConsent as storeConsent, type Consent } from "../lib/consent";

export function CookieBanner() {
  const [consent, setConsentState] = useState<Consent>("accepted"); // start hidden to avoid SSR flash

  useEffect(() => {
    setConsentState(getConsent());
  }, []);

  if (consent !== null) return null;

  // storeConsent persists the choice and emits "hp-consent-change" so the
  // tracking layer (src/lib/analytics.ts) honors it immediately this session.
  const accept = () => { storeConsent("accepted"); setConsentState("accepted"); };
  const decline = () => { storeConsent("declined"); setConsentState("declined"); };

  return (
    <div
      role="dialog"
      aria-label="Cookie preference"
      className="fixed bottom-[68px] left-0 right-0 z-[9999] border-t border-gold/20 bg-navy-deep/95 px-4 py-2.5 shadow-2xl backdrop-blur-sm md:bottom-6 md:left-6 md:right-auto md:max-w-xs md:border md:border-gold/25 md:bg-navy-deep md:px-5 md:py-4 lg:bottom-6"
    >
      {/* Mobile: one compact row — keeps the cookie notice from crowding the
          sticky CTA and the above-the-fold lead path. Desktop keeps the fuller
          card. */}
      <div className="flex items-center gap-3 md:block">
        <p className="min-w-0 flex-1 font-sans text-[11px] leading-snug text-white/65 md:text-xs md:leading-relaxed">
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-gold md:mb-1.5 md:block">Cookie Notice</span>
          Analytics cookies only — declining won't affect the site.{" "}
          <a href="/privacy" className="underline hover:text-gold">Privacy</a>
        </p>
        <div className="flex flex-shrink-0 gap-2 md:mt-3">
          <button
            onClick={accept}
            className="bg-gold px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90 md:flex-1 md:py-2.5"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white md:flex-1 md:py-2.5"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
