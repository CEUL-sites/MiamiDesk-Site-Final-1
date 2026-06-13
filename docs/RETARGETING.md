# Retargeting Playbook — HomesProfessional.com

How to turn the site's mid-funnel tracking events into warm seller audiences
in Meta Ads Manager and GA4. These events fire automatically; nothing on the
site needs to change to follow this guide.

## Event inventory

| dataLayer event (GTM/GA4) | Meta custom event | Fires when | Intent signal |
|---|---|---|---|
| `seller_intake_step1` | `SellerIntakeStep1` | Visitor enters a property address in the 2-step seller form (step 1 of 2) | **Hot** — has a specific property, started the funnel |
| `exit_intent_capture` | `ExitIntentCapture` | Visitor submits email in the exit-intent Net Sheet modal | **Hot** — gave contact info on the way out |
| `exit_intent_shown` | `ExitIntentShown` | Exit-intent modal displayed (desktop, once/session) | Warm — was leaving, saw the offer |
| `net_sheet_download` | `NetSheetDownload` | Email-gated Seller's Net Sheet download (homepage strip) | **Warm** — researching sale proceeds |
| `sticky_cta_home_value` | `StickyCtaHomeValue` | Click on "Get My Home Value" in the desktop sticky bar | **Warm** — valuation interest |
| `hero_cta_mobile` | `HeroCtaMobile` | Tap on the mobile hero "Get My Free Home Value" button | **Warm** — valuation interest |
| `contact_click` | `Contact` (standard) | Tap on any Call (`tel:`) or WhatsApp link | **Hot** — direct outreach intent |
| `generate_lead` | `Lead` (standard) | Any completed lead form (existing) | **Converted** — use as exclusion |

`contact_click` carries `contact_method` (`phone` / `whatsapp`) and `location`
(`mobile_sticky`, `desktop_sticky`, `float`, `navbar`, `navbar_mobile`) so you
can segment call intent from chat intent and see which surface drives outreach.

All events carry first-touch attribution (utm_source/medium/campaign, landing
page) so audience performance is traceable to the channel that produced it.

## Meta Ads Manager setup

1. **Verify events are arriving**: Events Manager → your Pixel (`1342120122583302`)
   → Overview. The custom events appear by their PascalCase names within ~20
   minutes of firing on the live site.
2. **Create Custom Audiences**: Audiences → Create → Custom Audience → Website.
   Choose the Pixel, then "From your events" and pick the custom event.

### Suggested 3-tier structure

| Audience | Definition | Window |
|---|---|---|
| `HP — Hot Sellers` | `SellerIntakeStep1` OR `ExitIntentCapture` OR `Contact` | 30 days |
| `HP — Warm Sellers` | `NetSheetDownload` OR `StickyCtaHomeValue` OR `ExitIntentShown` | 90 days |
| `HP — Converted Leads` | standard `Lead` event | 180 days |

Always **exclude** `HP — Converted Leads` from prospecting and retargeting ad
sets — don't pay to re-reach people already in the CRM.

### First campaign suggestion

- **Audience**: `HP — Hot Sellers`, exclude `HP — Converted Leads`.
- **Objective**: Leads (optimize for the standard `Lead` event).
- **Destination**: `/home-value`.
- **Creative angle**: the confidential MLS-based valuation — "a licensed
  REALTOR®'s analysis, not an algorithm." Keep claims factual; no guaranteed
  outcomes, prices, or timelines (compliance rule for all front-facing copy).
- Hot audiences are small; expect to also run the Warm tier with the Net
  Sheet or a journal guide as the hook before asking for the valuation.

## GA4 / GTM setup

1. In GTM, the events already arrive on the dataLayer under their snake_case
   names. Create one GA4 Event tag per event (or a single tag with
   `{{Event}}` as the event name) firing on Custom Event triggers:
   `seller_intake_step1`, `exit_intent_shown`, `exit_intent_capture`,
   `net_sheet_download`, `sticky_cta_home_value`, `hero_cta_mobile`,
   `contact_click`. Without this step the call/WhatsApp taps fire on the page
   but never reach GA4 — the events are emitted in code, GTM has to forward
   them. For `contact_click`, map the `contact_method` and `location`
   dataLayer values to GA4 event parameters to keep the call-vs-chat split.
2. In GA4 Admin → Events, confirm they arrive, then Admin → Audiences →
   New audience → build the same hot/warm tiers from these events.
3. Link GA4 to Google Ads to use those audiences for Search/Display
   remarketing (e.g., bid boosts on "sell my house miami" searches from
   warm-audience members).

## Maintenance notes

- Event names are defined in `src/lib/analytics.ts`. Mid-funnel signals go
  through `trackFunnelEvent`; call/WhatsApp taps through `trackContact`
  (GA4 `contact_click` + Meta standard `Contact`). Add new signals through
  these helpers so they reach both platforms with attribution attached.
- The Meta standard `Contact` event appears in Events Manager automatically
  once a real tap fires on the live site; no extra Pixel config is needed,
  but confirm it under Events Manager → your Pixel → Overview before relying
  on it for optimization.
- The exit-intent modal fires at most once per session, so `ExitIntentShown`
  volume approximates unique exiting visitors, not page views.
