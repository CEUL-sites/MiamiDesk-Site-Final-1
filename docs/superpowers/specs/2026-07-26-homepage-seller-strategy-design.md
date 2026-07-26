# Homepage Seller Strategy Conversion Design

## Objective

Increase qualified South Florida seller inquiries by making the homepage answer the seller's first decision—how the property should be positioned—before explaining distribution scale. Preserve the existing brand, routes, bilingual infrastructure, lead delivery, analytics, SEO, performance controls, and Netlify production configuration.

## Approved information hierarchy

1. Navbar
2. Seller-strategy hero with Carlos's authority, one dominant form action, a WhatsApp alternative, and compact distribution support
3. Compact authority/proof strip
4. Editorial four-part execution sequence: Position, Activate, Report, Adjust
5. Verified distribution proof
6. Verified reviews and outcomes
7. Global Desk teaser
8. Market and Journal entry points
9. Carlos profile, direct contact, and seller consultation
10. Footer

Buyers, Spain services, and generic market content remain secondary to the seller path.

## Component approach

- Refactor `Hero` within the current visual system. Keep the existing deferred `LazyVideo` background, poster, save-data, intersection/idle, and reduced-motion behavior. Remove the multi-clip hero bubble so the initial media payload cannot increase and the form can sit inside the first decision viewport.
- Convert `HeroSellerForm` to a two-step form backed by a pure step model. Step 1 holds address, name, and phone. Step 2 holds optional email, market, timeline, and messaging consent. The final POST field names and lead side effects remain unchanged.
- Add compact homepage-only authority and editorial execution components. Distribution remains a separate proof section and no longer repeats the four execution steps as SaaS-style cards.
- Give `AboutContact` a `showForm` option. The homepage and About page keep their form; Contact renders its existing desk-aware `LeadForm` once and uses `AboutContact showForm={false}` for Carlos's profile and direct alternatives.

## Lead and event path

### Client-side form path

1. First focus emits existing `form_start` for `seller-hero`.
2. Step 1 validation runs in the browser. Advancing emits only `step_progress`; it does not POST, notify, acknowledge, or emit a lead.
3. Back preserves all entered values and emits only `step_progress`.
4. Final submit POSTs `seller-hero` URL-encoded data to `/` with the Netlify form name, honeypot, render timestamp, Places ID/coordinates/map URL, final field names, and first-touch attribution.
5. A successful response calls `notifyLeadDirect`, then `trackLead("seller")`, then the best-effort `lead-acknowledgment` function, and finally renders the existing success state.
6. `trackLead` emits `generate_lead`, `form_submit_seller`, Meta `Lead`, and LinkedIn lead conversion once.

### Delivery path

- Primary: Netlify Forms invokes `submission-created`, which normalizes fields, writes Google Sheets, alerts Carlos by Resend and CallMeBot WhatsApp, deduplicates each channel through Netlify Blobs, stores a dead letter if all delivery channels fail, and enrolls email-bearing seller leads in nurture.
- Backup: `lead-notify` runs directly with `keepalive`, applies origin/rate/honeypot/timing checks, writes the same Sheets/alert channels, shares dedup markers with `submission-created`, and stores a dead letter on total failure.
- Acknowledgment: `lead-acknowledgment` sends the visitor a Resend email when an email is supplied. Its failure remains non-blocking.

### Supporting events

- WhatsApp anchors emit delegated `whatsapp_click_us` or `whatsapp_click_madrid` plus `contact_whatsapp`; explicitly tracked CTA locations also emit `contact_click` and Meta `Contact`.
- The success-state net-sheet link emits `net_sheet_download`; delegated download tracking also emits `lead_magnet_download` and `download_guide`.

## Reuse map

- `HeroSellerForm`: `/` through `Hero`; `/es` directly through `EsHomePage`.
- `LeadForm`: directly on `/contact`; indirectly wherever `AboutContact` renders.
- `AboutContact`: `/`, `/about`, and `/contact`.
- Current duplicate: `/contact` renders a direct desk-aware `LeadForm` and a second unsegmented `LeadForm` inside `AboutContact`.

## Accessibility and performance

- Exactly one homepage H1.
- Explicit labels, required-state validation, focus transfer to the first invalid field, step/status announcements, logical tab order, 16px inputs, and retained autofill attributes.
- Mobile touch targets remain at least 44px; sticky CTA guards and consent suppression remain unchanged.
- No new initial video. The retained hero video continues to defer until load/idle, use its poster, skip constrained connections, and respect reduced motion.
- Desktop and 390×844 mobile QA cover homepage, contact, both form steps, validation, and success.

## Metadata

Only the homepage title and description change to the approved seller-strategy copy. Canonical, hreflang, schema, sitemap, routes, and production configuration remain intact.

## Audit baseline

- Branch point: `89ac482` on `main`.
- `lint`: passed before edits.
- `verify:homepage-conversion`: passed via `node --import tsx`; the repository's `tsx` CLI cannot create its IPC pipe in this sandbox.
- `verify:journal`: passed for 59 public posts.
- Vite production bundle: passed; `react-snap` postbuild could not launch because the committed dependency setup did not download Chromium in this environment.
- `yarn install`: attempted through Corepack but the legacy Yarn registry endpoint was blocked; local dependencies were installed without lockfile changes through npm for verification.

