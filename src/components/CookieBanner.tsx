import { useEffect, useState } from "react";

const COOKIE_KEY = "hp_cookie_consent";

type Consent = "accepted" | "declined" | null;

function getStoredConsent(): Consent {
  try {
    return (localStorage.getItem(COOKIE_KEY) as Consent) ?? null;
  } catch {
    return null;
  }
}

function storeConsent(value: "accepted" | "declined") {
  try {
    localStorage.setItem(COOKIE_KEY, value);
  } catch {
    // storage unavailable — banner will reappear next visit
  }
}

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>("accepted"); // start hidden to avoid SSR flash

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  if (consent !== null) return null;

  const accept = () => { storeConsent("accepted"); setConsent("accepted"); };
  const decline = () => { storeConsent("declined"); setConsent("declined"); };

  return (
    <div
      role="dialog"
      aria-label="Cookie preference"
      className="fixed bottom-[72px] left-0 right-0 z-[9999] border-t border-gold/20 bg-navy-deep px-4 py-3 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-xs md:border md:border-gold/25 md:px-5 md:py-4 lg:bottom-6"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">Cookie Notice</p>
      <p className="mt-1.5 font-sans text-xs leading-relaxed text-white/65">
        We use analytics cookies to understand site usage. Declining does not affect core functionality.{" "}
        <a href="/privacy" className="underline hover:text-gold">Privacy Policy</a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-gold py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90 md:py-2.5"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-white/20 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white md:py-2.5"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
