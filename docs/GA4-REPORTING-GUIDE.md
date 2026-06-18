# GA4 Lead Intelligence — Reporting Guide
## HomesProfessional.com · Carlos Uzcategui

---

## What is now tracked (code-side, June 2026)

All events push to `window.dataLayer` → GTM container `GTM-K3CKFM94` → GA4.

### Core conversion events

| Event name | When it fires | Key dimensions |
|---|---|---|
| `generate_lead` | On any form submission | `lead_type`, `form`, attribution fields |
| `form_submit_seller` | Seller form submitted | `form` (seller-hero / seller-intake / seller-consultation), attribution |
| `form_submit_buyer` | Buyer form submitted | `form` (buyer-mandate), attribution |
| `form_submit_agent` | Agent/referral form submitted | `form` (referral-intake), attribution |

### Funnel measurement events

| Event name | When it fires | Key dimensions |
|---|---|---|
| `form_start` | First field focus on any form | `form_name`, `page_path`, `funnel_stage` |
| `seller_intake_step1` | Seller advances from address step | `city`, `page` |
| `journal_view` | Journal post page loaded | `journal_slug`, `category`, `market`, `funnel_stage`, `content_goal`, `created_by`, attribution |
| `journal_cta_click` | Any journal CTA button clicked | `cta_type`, `cta_location` (post_top/post_mid/post_bottom), `journal_slug`, `market`, attribution |
| `net_sheet_download` | Seller Net Sheet downloaded | `source`, `lang` |
| `spa_pageview` | Every client-side page transition | `page_path`, `page_location`, `page_title` |
| `404_view` | 404 page rendered | `page_path`, `referrer` |
| `whatsapp_click_us` | WhatsApp US link clicked | `destination` |
| `whatsapp_click_madrid` | WhatsApp Madrid link clicked | `destination` |
| `contact_click` | Call/WhatsApp contact intent | `contact_method`, `location`, attribution |

### Attribution dimensions attached to conversion events

| Field | Example values |
|---|---|
| `utm_source` | google, facebook, organic |
| `utm_medium` | cpc, email, social |
| `utm_campaign` | seller-q2-weston |
| `landing_page` | /journal/selling-weston-florida-2026 |
| `referrer` | google.com, facebook.com |

---

## Step 1 — Mark Key Events in GA4 Admin (required — not automatic)

Without this step, `generate_lead` and `form_start` appear in GA4 but are not counted as conversions.

**Path:** GA4 → Admin → Data display → Events → find each event → toggle "Mark as key event"

Mark these as Key Events:
1. `generate_lead` — primary conversion, every form submission
2. `form_submit_seller` — seller-specific conversion
3. `form_start` — top-of-funnel signal (shows form engagement vs abandonment)
4. `journal_cta_click` — journal-to-contact conversion signal
5. `net_sheet_download` — lead magnet download (warm signal)

---

## Step 2 — Journal → Lead attribution report

**Path:** GA4 → Explore → Blank → Funnel Exploration

Build this funnel:
1. `journal_view` (journal visit)
2. `journal_cta_click` (clicked a CTA)
3. `form_start` (opened a form)
4. `generate_lead` (submitted)

**Breakdown dimensions to add:**
- `journal_slug` — which post converts best
- `market` — which market (Weston, Coral Gables, Brickell, etc.) produces leads
- `content_goal` — seller vs buyer vs international vs market_report
- `funnel_stage` — awareness vs consideration vs bottom_funnel
- `created_by` — claude vs manual (shows AI-generated ROI)

---

## Step 3 — Source attribution report

**Path:** GA4 → Reports → Acquisition → Traffic acquisition

**Segments to watch:**
- Organic Search → which posts are ranking (filter by `landing_page` contains `/journal/`)
- Direct → likely typed URL or email forward → good signal for referral/word-of-mouth
- Filter for sessions where `generate_lead` fired → this is your true lead-source breakdown

**Custom report (recommended):**
GA4 → Reports → Library → Create new report:
- Dimensions: Session source/medium, landing page
- Metrics: Sessions, Key events (generate_lead), Engagement rate

---

## Step 4 — Market performance by city

**Path:** GA4 → Explore → Free form

Configure:
- Dimension rows: `market` (custom parameter)
- Metric columns: Event count (journal_view), Event count (journal_cta_click), Event count (generate_lead)
- Date: Last 30 days

This tells you: Weston posts get 400 views but only 2 CTAs → top-of-funnel content, needs stronger mid CTA. Coral Gables posts get 150 views but 12 CTAs → high-intent audience, publish more.

---

## Step 5 — 30-day sprint reporting cadence

Check weekly:
- Which 3 journal posts drove the most `journal_view` events?
- Which posts had a `journal_cta_click` rate > 5%? (cta_clicks / journal_views)
- Which `market` dimension had the highest `generate_lead` count?
- How many `form_start` events vs `generate_lead` events? (gap = form abandonment rate)

Check monthly:
- Attribution report: which UTM source + medium produced verified leads?
- `created_by: "claude"` vs `created_by: "manual"` — total leads attributed per content type
- 404 volume: is `404_view` event count declining? (validates routing fixes)

---

## GTM configuration note

The GTM container already receives all events. To surface them in GA4 as proper parameters (not just event names), add a **GA4 Event tag** in GTM for each event category:

1. `generate_lead` → GA4 Event: send all dataLayer variables as event parameters
2. `journal_view` → GA4 Event: send `journal_slug`, `market`, `funnel_stage`, `content_goal`, `created_by`, `landing_page`, `utm_source`
3. `journal_cta_click` → GA4 Event: send `cta_type`, `cta_location`, `journal_slug`, `market`

Without this GTM configuration, the events reach GA4 but the extra dimensions (market, slug, funnel_stage) are stripped. Carlos or your GTM operator needs to add these parameter mappings once.

---

## Compliance note

All event parameters follow first-party data principles:
- No PII in dataLayer events (no name, email, phone)
- Attribution data (UTM, referrer) is session-level, not individual-level
- No cross-site tracking; all data stays within the GA4 property
