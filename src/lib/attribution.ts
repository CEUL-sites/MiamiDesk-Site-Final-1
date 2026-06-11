// ──────────────────────────────────────────────────────────────────────────
// Lead source attribution — first-touch capture
//
// On a visitor's FIRST page load we capture where they came from: UTM tags
// (set by paid ads / campaigns), the referring site, and the landing page.
// We persist it for the session so that whichever form they eventually submit
// carries the original source. Carlos then sees, on every lead, the channel
// and campaign that produced it — in Google Sheets, the email/WhatsApp alert,
// and the ad-platform conversion event.
//
// First-touch (not last-touch): we only write if nothing is stored yet, so the
// ad/referrer that *won* the visitor is preserved even as they browse the site.
// ──────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "hp_attribution";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// Common click identifiers worth keeping for ad-platform matching.
const CLICK_ID_KEYS = ["gclid", "fbclid", "msclkid", "li_fat_id"] as const;

export type Attribution = Record<string, string>;

function safeSession(): Storage | null {
  try {
    return window.sessionStorage;
  } catch {
    return null; // privacy mode / blocked storage
  }
}

/**
 * Run once, as early as possible, on first load. Captures source data only if
 * none is already stored this session (first-touch wins).
 */
export function captureAttribution(): void {
  const store = safeSession();
  if (!store) return;
  if (store.getItem(STORAGE_KEY)) return; // already captured this session

  const params = new URLSearchParams(window.location.search);
  const data: Attribution = {};

  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) data[key] = v.slice(0, 200);
  }
  for (const key of CLICK_ID_KEYS) {
    const v = params.get(key);
    if (v) data[key] = v.slice(0, 200);
  }

  // Fallbacks so EVERY lead is attributable, even with no UTM tags.
  const ref = document.referrer || "";
  if (ref && !ref.includes(window.location.hostname)) {
    data.referrer = ref.slice(0, 200);
    if (!data.utm_source) {
      try {
        data.utm_source = new URL(ref).hostname.replace(/^www\./, "");
        data.utm_medium = data.utm_medium || "referral";
      } catch {
        /* ignore malformed referrer */
      }
    }
  }
  if (!data.utm_source) {
    data.utm_source = "direct";
    data.utm_medium = data.utm_medium || "none";
  }

  data.landing_page = (window.location.pathname + window.location.search).slice(0, 200);
  data.first_seen = new Date().toISOString();

  try {
    store.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage full / blocked — non-fatal */
  }
}

/** Returns the stored first-touch attribution as a flat object (or {}). */
export function getAttribution(): Attribution {
  const store = safeSession();
  if (!store) return {};
  try {
    const raw = store.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** A compact "source / medium / campaign" label for alert messages. */
export function getLeadSource(): string {
  const a = getAttribution();
  return [a.utm_source || "direct", a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") || "direct";
}
