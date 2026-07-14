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
      className="fixed bottom-4 left-4 right-4 z-[9999] rounded-lg border border-gold/25 bg-navy-deep/95 px-4 py-3 shadow-2xl backdrop-blur md:bottom-6 md:left-auto md:right-6 md:max-w-xs md:px-5 md:py-4"
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
