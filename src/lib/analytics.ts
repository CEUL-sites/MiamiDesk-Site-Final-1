import { getAttribution } from "./attribution";

export type EventPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    lintrk?: (action: string, payload?: Record<string, unknown>) => void;
  }
}

export function pushEvent(eventName: string, payload?: EventPayload): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
}

/** Convert snake_case to PascalCase for Meta custom event names. */
function toPascalCase(name: string): string {
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Fire a mid-funnel intent signal to GTM and Meta Pixel as a CUSTOM event.
 *
 * These are NOT full lead conversions — they are warm-intent signals used to
 * build retargeting audiences in Meta Ads Manager and GA4 (via GTM):
 *   - seller_intake_step1   → visitor entered a property address
 *   - exit_intent_shown     → exit-intent modal was displayed
 *   - exit_intent_capture   → visitor submitted their email in the exit modal
 *   - net_sheet_download    → visitor downloaded the Seller's Net Sheet
 *   - sticky_cta_home_value → visitor clicked "Get My Home Value" in sticky bar
 *
 * GTM: pushed as snake_case dataLayer events (same pattern as pushEvent).
 * Meta Pixel: fired as fbq("trackCustom", PascalCaseName) so they appear in
 *   Events Manager as custom events and can be used to define Custom Audiences.
 * LinkedIn: intentionally omitted — Insight Tag custom conversions are
 *   URL-match / conversion-ID based and don't benefit from JS custom events.
 *
 * Attribution (UTM / referrer / landing page) is attached automatically,
 * identical to trackLead, so every audience segment is source-attributable.
 */
export function trackFunnelEvent(name: string, payload?: EventPayload): void {
  const attribution = getAttribution();
  const detail: EventPayload = { ...attribution, ...payload };

  // GTM / GA4 dataLayer
  pushEvent(name, detail);

  // Meta Pixel — custom event (not standard Lead)
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", toPascalCase(name), detail);
  }
}

export type LeadType = "seller" | "buyer" | "agent";

export type ContactMethod = "phone" | "whatsapp";

/**
 * Fire a contact-intent conversion when a visitor taps a call or WhatsApp link.
 *
 * Phone calls and WhatsApp chats are a major share of seller contacts (the
 * equity-rich seller demographic skews toward calling), but were previously
 * untracked — so Meta/Google couldn't optimize ad delivery toward call-intent
 * users, and the channel's ROI was invisible.
 *   • GTM / GA4  — `contact_click` event with method + location
 *   • Meta Pixel — standard `Contact` event (ad sets can optimize for it)
 *
 * Attribution (UTM/referrer/landing page) is attached so each contact is
 * source-attributable, identical to trackLead. We deliberately fire `Contact`
 * (not `Lead`) so form submissions remain the clean primary conversion and
 * calls/chats are a distinct, measurable mid-funnel signal.
 */
export function trackContact(method: ContactMethod, location: string): void {
  const attribution = getAttribution();
  const detail: EventPayload = { contact_method: method, location, ...attribution };

  // GTM / GA4 dataLayer
  pushEvent("contact_click", detail);

  // Meta Pixel — standard Contact event.
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact", detail);
  }
}

/**
 * Fire a lead conversion across every connected channel at once:
 *   • GTM dataLayer  — `generate_lead` + the existing form_submit_* event
 *   • Meta Pixel     — standard `Lead` event (so ad sets can optimize for it)
 *   • LinkedIn       — Insight Tag conversion
 *
 * The first-touch attribution (UTM/referrer/campaign) is attached automatically
 * so every conversion is tied back to the channel that produced it.
 */
export function trackLead(type: LeadType, payload?: EventPayload): void {
  const attribution = getAttribution();
  const detail = { lead_type: type, ...attribution, ...payload };

  // GTM / GA4 — generic conversion + keep the legacy granular event.
  pushEvent("generate_lead", detail);
  pushEvent(`form_submit_${type}`, detail);

  // Meta Pixel — standard Lead event.
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", {
      content_category: type,
      content_name: payload?.form ?? type,
      ...attribution,
    });
  }

  // LinkedIn Insight Tag conversion.
  if (typeof window.lintrk === "function") {
    window.lintrk("track", { conversion_id: `lead_${type}` });
  }
}
