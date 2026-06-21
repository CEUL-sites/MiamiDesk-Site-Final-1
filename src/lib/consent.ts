// Single source of truth for analytics / marketing consent.
//
// Opt-out model: tracking is allowed until the visitor explicitly DECLINES via
// the cookie banner. Once "declined" is stored, every client-side Pixel / GTM /
// LinkedIn event is suppressed (see src/lib/analytics.ts and
// src/components/Analytics.tsx), and the deferred third-party pixel libraries in
// index.html are not loaded on a returning declined visit.
//
// To switch to a stricter opt-IN model (block until the visitor accepts),
// change isTrackingAllowed() to `return getConsent() === "accepted";`.

const CONSENT_KEY = "hp_cookie_consent";

export type Consent = "accepted" | "declined" | null;

export function getConsent(): Consent {
  try {
    return (localStorage.getItem(CONSENT_KEY) as Consent) ?? null;
  } catch {
    return null;
  }
}

export function setConsent(value: "accepted" | "declined"): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // storage unavailable — choice won't persist, banner reappears next visit
  }
  // The native `storage` event only fires in OTHER tabs, so emit our own event
  // for same-tab listeners that want to react immediately to a consent change.
  try {
    window.dispatchEvent(new CustomEvent("hp-consent-change", { detail: value }));
  } catch {
    // no window (SSR/prerender)
  }
}

/** True unless the visitor has explicitly declined analytics/marketing cookies. */
export function isTrackingAllowed(): boolean {
  return getConsent() !== "declined";
}
