// ──────────────────────────────────────────────────────────────────────────
// Direct backup lead alert.
//
// Every form POSTs to Netlify Forms, which asynchronously fires the
// submission-created function to alert Carlos (Sheets + email + WhatsApp).
// That async hop can be lost: Netlify may spam-file a submission, and the
// function only runs for "verified" submissions. To guarantee a lead is never
// lost, the forms ALSO call the lead-notify function directly with this helper.
//
// The two paths de-duplicate server-side (see netlify/functions/_shared/
// leadDedup.ts), so Carlos is alerted once when both succeed.
//
// `keepalive` lets the request complete even though most forms redirect to a
// /thanks page immediately after submitting.
// ──────────────────────────────────────────────────────────────────────────

export interface DirectLead {
  name?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  city?: string;
  timeline?: string;
  message?: string;
  sourcePage?: string;
  leadSource?: string;
  desk?: string;
  /**
   * The Netlify `form-name`, passed explicitly rather than inferred from
   * `sourcePage`. The two are NOT interchangeable: sourcePage carries the page
   * ("hero-en", "sell-brickell", "referral-intake-es") while form-name
   * identifies the form. Lead triage scores intent off the form, so sending it
   * verbatim is what keeps this backup path scoring a lead identically to the
   * Netlify Forms path — whichever one wins the dedup race.
   * See netlify/functions/_shared/leadScore.ts.
   */
  formName?: string;
  /** Scoring signals. Optional — only the forms that collect them send them. */
  valueBand?: string;
  occupancy?: string;
  /** Google Places id, set only when the address came from autocomplete. */
  placeId?: string;
  /** "yes" when the lead opted into WhatsApp/SMS follow-up. */
  messagingConsent?: string;
  /** Honeypot value + form-render timestamp — see requestGuard spam check in lead-notify.ts. */
  botField?: string;
  formRenderedAt?: string;
}

/** Fire-and-forget backup alert. Never throws; failures are non-fatal. */
export function notifyLeadDirect(lead: DirectLead): void {
  try {
    void fetch("/.netlify/functions/lead-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* ignore — primary Netlify Forms path is still in flight */
  }
}
