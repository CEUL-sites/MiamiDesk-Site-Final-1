import { getAttribution } from "./attribution";

type EventPayload = Record<string, unknown>;

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

export type LeadType = "seller" | "buyer" | "agent";

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
