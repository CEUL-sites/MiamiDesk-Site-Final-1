# Miami Desk — CLAUDE.md

Project memory for Claude Code sessions. Update this file when significant decisions, preferences, or context changes.

---

## Project Overview

**Miami Desk** is the production real estate advisory website for **Carlos Uzcategui**, Florida Licensed Realtor® SL705771.
- **Live domain:** homesprofessional.com
- **Deployed on:** Netlify
- **Focus:** South Florida seller strategy + international cross-border transactions (Miami ↔ Madrid)
- **Audiences:** Sellers, buyers, investors, agents, Spanish-speaking real estate professionals

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 19 + React Router 7 + TypeScript 5.8 |
| Styling | Tailwind CSS 4 (utility-only, no CSS modules) |
| Animation | Motion (Framer Motion-compatible) |
| Build | Vite 6 (ES2019 target, code-split by page) |
| Pre-rendering | react-snap (45+ routes → static HTML for SEO) |
| Serverless | Netlify Functions (TypeScript) |
| AI | Google Gemini 2.5-Flash (`@google/genai`) |
| MLS Data | Bridge Data OData API (Miami REALTORS® IDX) |
| Blob Storage | Netlify Blobs (market feed cache) |
| Email | Resend |
| Lead alerts | CallMeBot (WhatsApp) + Google Sheets (Apps Script webhook) |
| i18n | i18next + react-i18next (EN/ES, path-based: `/es/*`) |
| Icons | Lucide React |
| SEO | react-helmet-async + SchemaOrg component + vite-plugin-sitemap |

---

## Repository Structure

```
/
├── netlify/functions/         # 9 Netlify serverless functions
│   ├── ai-desk.ts             # Gemini AI chat + MLS context
│   ├── bridge-listings.ts     # General MLS search (city/price/type)
│   ├── listings-search.ts     # Advanced search (zone/bed/bath/pagination)
│   ├── ticker-listings.ts     # Homepage ticker ($900K+, 30 listings)
│   ├── market-feed.ts         # Read cached market feed from Blobs
│   ├── refresh-market-feed.ts # @weekly scheduled refresh to Blobs
│   ├── lead-notify.ts         # Sheets + WhatsApp alert to Carlos
│   ├── lead-acknowledgment.ts # Auto-reply email to lead (EN/ES)
│   ├── submission-created.ts  # Netlify Form webhook → Sheets + email
│   └── _shared/               # Shared utilities
│       ├── aiDeskIntentRouter.ts      # Visitor type classification
│       ├── aiDeskSystemPrompt.ts      # Gemini system prompt builder
│       ├── aiDeskResponseGuardrails.ts # Pattern-match compliance filters
│       ├── bridgeMlsForAi.ts          # Safe MLS fields for AI context
│       └── leadCaptureFormatter.ts    # Lead data formatter
│
├── src/
│   ├── pages/                 # 15+ page components (lazy-loaded, except HomePage)
│   ├── components/            # 40+ React components
│   │   └── forms/             # SellerIntakeForm, BuyerMandateForm, ReferralIntakeForm
│   ├── content/journal/       # Markdown blog posts (frontmatter + body)
│   ├── config/cityMarkets.ts  # 20 market city configs (slug, Bridge city, meta, copy)
│   ├── i18n/                  # i18next setup + en.json / es.json
│   ├── constants.ts           # CONTACT, NAVIGATION, LEAD_MAGNETS, URG_CITIES
│   ├── lib/analytics.ts       # GTM pushEvent()
│   ├── lib/markdown.ts        # Frontmatter parser + Markdown→HTML
│   └── main.tsx               # React Router entry, lazy page loading
│
├── public/                    # Static assets (images, videos, PDFs, favicons)
├── vite.config.ts             # Vite config (sitemap, code splitting)
├── netlify.toml               # Build, redirects, headers, cache, scheduled functions
├── ENVIRONMENT_VARIABLES.md   # Env var reference doc
└── CLAUDE.md                  # This file
```

---

## Netlify Functions Reference

| Function | Method | Purpose | Cache |
|---|---|---|---|
| `ai-desk` | POST | Gemini AI chat (intent classify → MLS fetch → respond) | None |
| `bridge-listings` | GET | General MLS search by city/price/type | 1hr in-process |
| `listings-search` | GET | Zone-based search with pagination (24/page) | 30min in-process |
| `ticker-listings` | GET | Homepage ticker ($900K+ Active/Pending, 30 results) | 1hr in-process |
| `market-feed` | GET | Read weekly-cached Weston featured listings | Netlify Blobs |
| `refresh-market-feed` | POST | @weekly refresh → write to Netlify Blobs | N/A |
| `lead-notify` | POST | Google Sheets + CallMeBot WhatsApp alert | None |
| `lead-acknowledgment` | POST | Resend auto-reply email to lead (EN or ES) | None |
| `submission-created` | POST | Netlify Form event → Sheets + Resend email to Carlos | None |

---

## Environment Variables

All secrets are stored in Netlify environment variables (never in code or client bundle).

| Variable | Used By | Notes |
|---|---|---|
| `Gemini_API_Key` | ai-desk | Google Gemini API |
| `BRIDGE_API_TOKEN` | bridge-listings, listings-search, ticker-listings, refresh-market-feed | Bridge OData bearer token |
| `BRIDGE_DATASET_ID` | bridge-listings, ai-desk | Default: `miamire` |
| `BRIDGE_DATASET` | refresh-market-feed | Alternate dataset config |
| `BRIDGE_BASE_URL` | refresh-market-feed | Alternate Bridge base URL |
| `RESEND_API_KEY` | lead-acknowledgment, submission-created | Resend email API |
| `RESEND_FROM` | lead-acknowledgment | Must be a verified Resend sender |
| `GOOGLE_SHEET_WEBHOOK` | lead-notify | Apps Script webhook URL |
| `GOOGLE_SHEETS_WEBHOOK_URL` | submission-created | Apps Script webhook URL |
| `CALLMEBOT_APIKEY` | lead-notify | WhatsApp alerts to Carlos |
| `MARKET_FEED_REFRESH_SECRET` | refresh-market-feed | Header auth for manual POST refresh |

---

## Key Design Decisions & Conventions

### Styling
- **Tailwind utility classes only** — no custom CSS files, no CSS modules
- **Color palette:**
  - Navy `#0B1E3F` — primary text/backgrounds
  - Gold `#B08D57` — accent, CTAs
  - White-soft / bone — backgrounds, borders
- **Responsive:** mobile-first, `lg:` breakpoints for desktop
- **Animations:** Motion library with shared easing `EASE = [0.22, 1, 0.36, 1]`

### Components
- Functional components + hooks only (no class components)
- All pages except `HomePage` are lazy-loaded (`React.lazy()`) with `<Suspense fallback={null}>`
- No Redux or Zustand — local state + prop drilling
- Forms: controlled inputs, multi-step submission (Netlify Form API → function calls → GTM event → redirect)

### Routing
- React Router v7, flat route structure
- Dynamic routes: `/market/:city`, `/journal/:slug`
- Spanish pages under `/es/*` (path-based language detection)
- SPA fallback in netlify.toml: `/* → /index.html` (200)

### Forms & Lead Flow
1. User submits form → POST to `/` (Netlify Forms, `application/x-www-form-urlencoded`)
2. `submission-created` function fires (Netlify webhook) → Google Sheets + Resend to Carlos
3. `lead-acknowledgment` called client-side → auto-reply email to lead
4. `lead-notify` called client-side → Sheets + WhatsApp to Carlos
5. GTM event pushed, user redirected to `/thanks/[type]`
6. 12-second abort timeout with user-friendly error message

### AI Desk (Gemini)
- Classifies visitor into 18 intent types (seller, buyer, investor, agent, Spain inquiry, etc.)
- Fetches Bridge MLS data when relevant (safe fields only via `bridgeMlsForAi.ts`)
- Guardrails (`aiDeskResponseGuardrails.ts`) block: legal advice, investment guarantees, appraisals, neighborhood steering
- Bilingual: responds in Spanish when detected
- Max 3-turn conversation context sent to Gemini

### Content / Journal
- Posts stored as Markdown in `src/content/journal/`
- Frontmatter format: `---\ntitle: "..."\ndate: "YYYY-MM-DD"\nslug: "..."\nexcerpt: "..."\ncategory: "..."\n---\n[body]`
- Parsed at build time via `import.meta.glob()` (eager)
- Auto-sorted newest first

### Market Pages
- 20 cities configured in `src/config/cityMarkets.ts`
- Each has: name, slug, Bridge city name, meta title/description, market paragraph, extended content
- Luxury submarkets (Coral Gables, Miami Beach, Brickell) have extended 5-8 paragraph deep dives
- Live Bridge search embedded on each city page

### Analytics
- All events pushed to Google Tag Manager via `pushEvent(eventName, payload)` in `src/lib/analytics.ts`
- Events: `form_submit_seller`, `form_submit_buyer`, `form_submit_agent`

### Build & Pre-rendering
- `yarn build` = Vite build + react-snap pre-render
- react-snap generates static HTML for 45+ routes (SEO + initial load performance)
- Sitemap auto-generated from market routes + static routes + journal slugs
- Vendor chunks: vendor-react, vendor-motion, vendor-ui

---

## Carlos's Contact Info (from constants.ts)

- **Phone:** As configured in constants.ts
- **WhatsApp (Miami):** Configured in constants.ts
- **WhatsApp (Madrid):** +34 646 853 078
- **License:** Florida SL705771
- **Brokerage:** As configured

---

## Compliance Items (Pending — Carlos must verify)

- [ ] MLS display rules: IDX attribution text, logo placement, required fields
- [ ] Address masking rules for Active listings on public IDX pages
- [ ] Image usage rights for MLS listing photos
- [ ] IDX disclaimer wording (exact text per MLS board)
- [ ] Listing data freshness disclosure (weekly vs daily minimum per board)
- [ ] FL Real Estate Commission disclosures (license number, brokerage, Equal Housing)
- [ ] Rules for Sold/Pending listing display if added in future

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:3000
npm run build        # Production build + react-snap pre-render
npm run preview      # Serve dist/ locally
npm run lint         # TypeScript type check (no emit)
```

Manual market feed refresh:
```bash
curl -X POST https://homesprofessional.com/.netlify/functions/refresh-market-feed \
  -H "x-refresh-secret: YOUR_SECRET"
```

---

## Git Workflow

- Feature branches: `claude/*` naming convention
- PR-based workflow
- Current working branch: `claude/memory-across-chats-2KBLc`
- Push to: `origin claude/memory-across-chats-2KBLc`

---

## Notes & Decisions Log

_Add dated notes here as the project evolves._

- **2026-05-30** — CLAUDE.md created to provide persistent project memory across sessions.
