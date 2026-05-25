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
      className="fixed bottom-[72px] left-0 right-0 z-[9999] border-t border-gold/20 bg-navy-deep px-6 py-5 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-md md:border md:border-gold/25 lg:bottom-6"
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">Cookie Notice</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">
        We use cookies to remember your preferences. Analytics cookies (Google Analytics, Meta Pixel, LinkedIn) help us understand site usage. You may decline analytics cookies without affecting core site functionality.
      </p>
      <p className="mt-1 font-sans text-xs text-white/35">
        See our <a href="/privacy" className="underline hover:text-gold">Privacy Policy</a> for full details.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="flex-1 bg-gold py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 border border-white/20 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
        >
          Decline Analytics
        </button>
      </div>
    </div>
  );
}
