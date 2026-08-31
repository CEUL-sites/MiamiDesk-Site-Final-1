# HomesProfessional.com — Development Guide

Marketing + lead-generation site for Carlos Uzcategui, a Florida licensed
Realtor® (SL705771) with United Realty Group. Bilingual (EN + `/es`), heavy on
SEO landing pages, a flat-file journal, live MLS data, and a multi-path lead
pipeline.

Read this file before changing anything. Two sections are non-negotiable and
override any instruction elsewhere: **Compliance rules** and **Verified figures**.

---

## Commands

```bash
npm install                 # or: yarn install --frozen-lockfile
npm run dev                 # Vite dev server on :3000
npm run lint                # tsc --noEmit — the only type gate; run before every commit
npm run build               # vite build + postbuild (react-snap prerender + motion fix)
npm run preview             # serve dist/
npm run clean               # rm -rf dist

npm run verify                      # all five checks below, in order — run before every commit
npm run verify:journal              # frontmatter, compliance, banned figures, OG images, sitemap
npm run verify:homepage-conversion  # hero/sticky-CTA form model assertions
npm run verify:review-spotlight     # review spotlight model + static render
npm run verify:global-desk          # GlobalDeskPage language-toggle contract
npm run verify:visitor-tracking     # index.html pixel guards + privacy page disclosure
npm run verify:lead-score           # lead triage model + both notifier paths
```

There is no test runner. The `verify:*` scripts are the test suite — plain
`node:assert` scripts asserting on source text and pure model functions. They
are cheap (a few seconds total), so prefer `npm run verify` over picking one.

**npm vs yarn**: both lockfiles are committed. Netlify builds with `yarn build`,
the CI build workflow uses `yarn install --frozen-lockfile`, and the daily
journal workflow uses `npm ci`. Use whichever matches the surface you're
touching; if you change dependencies, update **both** lockfiles.

---

## Architecture

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript + Vite 6 |
| Styling | Tailwind CSS v4 — tokens: navy `#0B1E3F`, gold `#B08D57`, ivory `#F9F7F2` |
| Routing | React Router v7, all routes declared in `src/main.tsx` — **there is no `App.tsx`** |
| Head tags | `react-helmet-async` per page + `src/components/SEO/` for JSON-LD |
| i18n | `i18next` / `react-i18next`, locale chosen from the URL prefix |
| Prerender | `react-snap` over the `reactSnap.include` list in `package.json` |
| Hosting | Netlify — auto-deploy from `main`, functions in `netlify/functions/` |
| Forms | Netlify Forms + a direct backup POST (see Lead pipeline) |
| MLS data | Bridge IDX API, always server-side through Netlify functions |
| Journal | `import.meta.glob` loads `src/content/journal/[^_]*.md` at build time |

### Rendering model

`src/main.tsx` uses `createRoot`, **not** `hydrateRoot`, deliberately. react-snap
snapshots a live browser DOM, so hydration could never match and threw React
#418 on every route. Don't "fix" this to hydration.

Only `HomePage` is eagerly imported; every other page is `lazy()`. Keep it that
way — the homepage bundle is the LCP budget.

### The prerender pipeline

`npm run build` → `vite build` → `react-snap` → `scripts/fix-prerender-motion.mjs`.

The motion fix exists because react-snap captures framer-motion entry animations
in their *pre*-animation state (`opacity:0` + `translateY(...)`), which is what
no-JS visitors and some crawlers would see. The script strips `opacity:0` only
when it is paired with a translate transform; scale-only and video-crossfade
states are left alone on purpose.

Netlify serves prerendered files first. `/journal/*` falls back to `/200.html`
(SPA render) as a safety net for a post that missed the include list; everything
else falls through to a real `404.html` with HTTP 404 — do not restore a
catch-all 200 rewrite, it made every unknown URL a soft 404.

### Adding or changing a route — the four-file rule

A route is only fully live when all four are updated together:

1. `src/main.tsx` — the `<Route>` (plus a `lazy()` import)
2. `package.json` → `reactSnap.include` — otherwise crawlers get an empty JS shell
3. `public/sitemap.xml` — hand-maintained so it can carry per-URL priorities and
   EN/ES `hreflang` alternates that `vite-plugin-sitemap` cannot emit
4. `netlify.toml` — a 301 from the old URL when a route is renamed or retired

Retired routes keep both a `<Navigate>` in `main.tsx` and a `netlify.toml` 301.

---

## Directory map

```
src/
  main.tsx                  Routes, providers, global chrome (Analytics, CookieBanner, WhatsAppFloat)
  constants.ts              CONTACT, LEAD_MAGNETS, route predicates; mirrors figures.json for legacy imports
  pages/                    One file per route. SellXxxPage.tsx = per-city SEO landing pages
  pages/es/                 Spanish routes (EsHomePage, EsVenderPage, …)
  pages/thanks/             Post-conversion pages — GA4 conversion fires here
  components/               Section-level components, mostly one per homepage/landing band
  components/forms/         The five lead forms
  components/listings/      IDX listing card + browser
  components/reviews/       Review spotlight + its pure model
  components/SEO/           SchemaOrg (sitewide JSON-LD), JsonLd (per-page), HtmlLang
  components/es/            Spanish-only variants of shared sections
  content/journal/*.md      Journal posts (see Publishing a Journal Post)
  content/journal/_drafts/  Never published — see _drafts/_WORKFLOW.md
  data/                     figures.json, cityMarketStats.ts, marketStats.json, reviews.ts, …
  i18n/                     i18next init + locales/{en,es}.json
  lib/                      markdown, analytics, attribution, consent, listings, googlePlaces, leadNotify
netlify/functions/          Serverless handlers
netlify/functions/_shared/  Cross-function helpers (whatsapp, leadDedup, leadScore, nurture, requestGuard, AI desk)
scripts/                    Build helpers, OG renderers, verify:* scripts, daily journal publisher
docs/sources/               Primary documents backing every verified figure
.claude/agents/             Project subagents (see Subagents)
```

### Component conventions

Page components follow a fixed shape — copy an existing `SellXxxPage.tsx`
rather than inventing one:

1. `<Helmet>` with `title`, `description`, `keywords`, canonical, and the full
   OG + Twitter card set (absolute `https://homesprofessional.com/...` URLs)
2. `<JsonLd id="…-breadcrumb">` and `<JsonLd id="…-faq">` blocks
3. `<Navbar />` … sections … `<Footer />`
4. `<MobileStickyCTA />`, `<DesktopStickyCTA />`, `<ExitIntentModal />`

Keep `<title>` under ~60 characters — Google truncates past that, and several
commits exist purely to walk titles back under the limit.

Logic worth asserting on is extracted into a plain `*Model.ts` next to the
component (`heroSellerFormModel.ts`, `mobileStickyModel.ts`,
`reviewSpotlightModel.ts`) so a `verify:*` script can import it without a DOM.

---

## Bilingual structure

Spanish pages live under `/es/*` and get their locale from the URL prefix
(`src/i18n/index.ts` reads `window.location.pathname`). `src/components/SEO/HtmlLang.tsx`
keeps `<html lang>` in sync.

Two separate predicates in `constants.ts` — do not conflate them:

- `isSpanishLangRoute(path)` — the page is *rendered* in Spanish, so sticky-CTA
  labels must be Spanish.
- `isSpainMarketRoute(path)` — the audience converts on the Spain WhatsApp line
  (+34) rather than the US line (+1). Covers `/es/*` plus `/global-desk`,
  `/spain-mls-listing`, `/la-comision-secreta`, and legacy Spain URLs.

A Spanish prospect must never be routed to the US number, and vice versa.

Spanish copy is held to **identical** compliance rules as English. `src/i18n/index.ts`
carries a standing TODO: all `es.json` copy needs native Castilian review.

Every EN page with an ES counterpart needs reciprocal `hreflang` alternates in
`public/sitemap.xml`.

---

## Lead pipeline

Every form submits down **two** paths on purpose, because either one can silently
drop a lead:

1. **Netlify Forms** → fires `netlify/functions/submission-created.ts`
   asynchronously → Google Sheets webhook + Resend email + CallMeBot WhatsApp
   alert. Netlify only fires this for "verified" submissions, so spam-filing
   loses leads.
2. **Direct backup** → `src/lib/leadNotify.ts` POSTs to
   `netlify/functions/lead-notify.ts` with `keepalive` (the form redirects to a
   `/thanks/*` page immediately after submit).

The two paths de-duplicate server-side in `_shared/leadDedup.ts`, so Carlos is
alerted once when both succeed. **Do not remove either path** as "duplicate
work" — the redundancy is the design. Failures land in `_shared/leadDeadLetter.ts`.

### Lead triage

Both notifier paths score every lead through `_shared/leadScore.ts` and render
the alert from that module's formatters. The score is a transparent 0–100 sum
of five signals (timeline urgency, address specificity, value band,
reachability, form intent) that tiers a lead **P1 / P2 / P3** and states the
recommended first action. Scoring only reorders attention — it never suppresses
a lead, and every tier still routes through every configured channel.

Two invariants hold this together:

- **Both paths must score a lead identically.** They race through `leadDedup`,
  so whichever wins decides what Carlos sees. `DirectLead` in
  `src/lib/leadNotify.ts` therefore carries the same scoring signals the
  Netlify Forms path reads from its fields.
- **`formName` is not `sourcePage`.** `sourcePage` is the page (`hero-en`,
  `sell-brickell`, `referral-intake-es`); `formName` is the Netlify
  `form-name`. Intent is scored off `formName`, so every `notifyLeadDirect`
  call site passes it explicitly — inferring it from `sourcePage` would drop
  the highest-intent forms into the unknown bucket.

Alerts render the phone in E.164 plus a `wa.me` link, because WhatsApp
auto-links both — that is what makes the alert one tap to call. When the
country can't be determined the links are omitted rather than guessed.
`npm run verify:lead-score` covers the model and asserts both handlers still
use the shared formatters.

Anti-spam on both paths: a hidden `bot-field` honeypot plus a `formRenderedAt`
timestamp; submissions arriving under 1.5s are dropped. Submissions without
`formRenderedAt` are allowed through for backward compatibility. The honeypot
must stay both visually hidden **and** `aria-hidden`.

First-touch attribution (`utm_*`, `landing_page`, referrer) is captured in
`src/lib/attribution.ts` on landing and attached to every submission.

Analytics (`src/lib/analytics.ts`) pushes to GTM's `dataLayer` and mirrors
custom events to Meta Pixel / LinkedIn. Every event is gated on
`isTrackingAllowed()` from `src/lib/consent.ts` — never fire an event that
bypasses the cookie banner. Full lead conversions fire on the `/thanks/*` pages;
mid-funnel signals (`seller_intake_step1`, `exit_intent_shown`,
`net_sheet_download`, …) are custom events used to build retargeting audiences.

Forms: `SellerIntakeForm`, `BuyerMandateForm`, `AgencyPartnerForm`,
`GlobalDeskListingForm`, `ReferralIntakeForm`, plus `HeroSellerForm` and
`LeadForm` at the component root.

---

## Netlify functions

| Function | Purpose | Bridge API? |
|---|---|---|
| `submission-created.ts` | Netlify Forms webhook → Sheets + email + WhatsApp + nurture enqueue | no |
| `lead-notify.ts` | Direct backup lead alert from the browser | no |
| `lead-acknowledgment.ts` | Auto-reply to the lead | no |
| `seller-nurture.ts` | Scheduled `@daily` Resend drip from the Blobs queue | no |
| `nurture-unsubscribe.ts` | Unsubscribe endpoint for the drip | no |
| `refresh-market-feed.ts` | Scheduled `@weekly` pull → writes Netlify Blobs | **yes** |
| `market-feed.ts` | Reads Blobs, `Cache-Control: max-age=3600` | no |
| `bridge-listings.ts` | Per-city-page listings, 1h in-memory cache | **yes** |
| `listings-search.ts` | Search queries, 30min in-memory cache | **yes** |
| `ticker-listings.ts` | MLS ticker, 1h in-memory cache | **yes** |
| `city-stats.ts` | City-level stats | **yes** |
| `ai-desk.ts` | Gemini-backed concierge → intent routing, MLS context, lead handoff | via `_shared` |
| `nano-banana-stage.ts` | AI virtual staging | no |

In-memory caches are ephemeral per cold start — that's accepted, not a bug.
Only Blobs-backed data survives.

`BRIDGE_API_TOKEN` and every other server secret are **server-side only**. Never
prefix them with `VITE_` and never read them from a component. The only
browser-exposed key is `VITE_GOOGLE_MAPS_KEY`. Full inventory and setup steps in
`ENVIRONMENT_VARIABLES.md` and `.env.example`.

The AI desk is guardrailed in `_shared/aiDeskSystemPrompt.ts` and
`_shared/aiDeskResponseGuardrails.ts` — compliance rules below apply to model
output too. Changes there need the same review as hand-written copy.

---

## Market data

| Source | Covers | Update path |
|---|---|---|
| `src/data/cityMarketStats.ts` | City-level median price + months supply | Quarterly, from MIAMI REALTORS® county PDFs |
| `src/data/marketStats.json` | Aggregate market figures | With each monthly report |
| `src/data/figures.json` | Network/brokerage statistics | Only with a primary source in `docs/sources/` |
| `src/data/reviews.ts` | Testimonials + `AGGREGATE_RATING` for schema | Manual |

`cityMarketStats.ts` documents its own refresh procedure in the header comment:
download the latest county reports, transcribe the by-City rows verbatim, bump
`MARKET_STATS_PERIOD`. Segments sourced from an older release (currently
Miami-Dade and Broward condo/townhome, from May 2026) must be **labeled with
their own period** wherever displayed — never relabeled to the newer quarter.

Transcribe. Never interpolate, extrapolate, or average a figure that isn't
printed in the report.

---

## Verified figures — never invent a number

Every network/brokerage statistic used anywhere on the site (member counts,
office counts, agent counts, MLS counts, etc.) must trace back to
`src/data/figures.json`, which is the single source of truth (`src/constants.ts`
mirrors it for legacy imports). Each entry there carries a `source` field —
check `docs/sources/SOURCES.md` for the primary documents backing those
sources before changing or adding a figure.

**United Realty Group office positioning**: do not publish a definitive office
count. The official URG office page, verified 2026-08-31, labels 21 total branch
locations and lists 19 Florida locations, including Pembroke Pines as "Opening
Soon," plus Texas and North Carolina. That live directory conflicts with the
earlier internal confirmation used by this repository. Public copy therefore
uses the neutral phrase **Florida office network** until the brokerage confirms
the institutional count it wants advertised. Exact official branch names,
addresses, states, and status live in `src/data/urgOffices.json`; service areas
and referral markets are separate fields and must never be presented as offices.

**MLS ranking**: the merged association is the **third-largest MLS in the
United States** and the largest MLS owned by a single U.S. Realtor association.
Never phrase it as "largest local MLS in the world" — Bright MLS and CRMLS have
more subscribers.

---

## Compliance rules

These apply to **all** public-facing copy — English, Spanish, journal posts, AI
desk responses, meta descriptions, and alt text alike. `.claude/agents/compliance-reviewer.md`
is the enforcing agent; these are its hard rules.

1. **No `$69B` / `$69 billion` anywhere.** That figure belongs to the
   association, not to Carlos or URG. Approved network facts: 3,500+ URG agents,
   Florida office network, 25+ years South Florida presence, full-service brokerage
   with in-house title company.
2. **No time-based promises** — no "Day 1 MLS activation," "within 24 hours,"
   "same day," or any listing-timeline guarantee.
3. **93,000-agent framing**: the listing enters the MLS ecosystem that 90,000+
   South Florida agents work from daily. Never an instant blast or day-one
   notification to 93,000 agents.
4. **No unverifiable superlatives** — no "#1," "largest in Florida," "best," no
   awards without attribution.
5. **Banned vocabulary in body copy**: dream, passionate, best, stunning,
   amazing, rare gem, world-class, excited, exclamation marks.
6. Carlos is a **sales associate**, license `SL705771`. Never "broker." The
   license number appears exactly as `SL705771`, and `Realtor®` never as
   `Realtor(R)`.
7. **Compliance footer on every public page**, exactly:
   `Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.`
   (The `Footer` component injects it — journal bodies don't need to repeat it,
   but any footer-like line in a body must match this form exactly.)
8. No third-party Spanish agency names in public copy without a signed
   cooperation agreement on file.
9. Every statistic carries a source citation **as displayed**.
10. No guarantee of sale outcome, price, or timeline. Never imply Carlos is
    licensed outside Florida. No front-facing "effective [date]" language.

`npm run verify:journal` mechanically enforces several of these (banned figures,
the `Realtor(R)` spelling, the footer form). Passing it is necessary, not
sufficient — rules 2–5 still need a human or the compliance-reviewer agent.

---

## Publishing a Journal Post

The `/journal` section is a flat-file blog. No CMS, no database. Publishing =
drop a `.md` file, commit, push. The daily publisher adds one most mornings, so
the post count moves — `ls src/content/journal/*.md` is the live answer.

### 5 steps

**1. Create the file**

```
src/content/journal/<slug>.md
```

Use kebab-case matching the `slug` frontmatter field. Example: `miami-market-q4-2026.md`.
Files starting with `_` are excluded from the site — `_drafts/` holds work in
progress (see `src/content/journal/_drafts/_WORKFLOW.md`).

**2. Fill in frontmatter**

```md
---
title: "Miami Market Q4 2026 — What Sellers Need to Know"
date: "2026-10-01"
slug: "miami-market-q4-2026"
excerpt: "One or two sentences shown on the index card and in meta description. Under 160 chars."
category: "Market Analysis"
image: ""
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | On-page H1, and the `<title>` unless `seoTitle` is set |
| `date` | ✅ | ISO 8601 `YYYY-MM-DD` — posts sort newest first |
| `slug` | ✅ | Must match filename without `.md` |
| `excerpt` | ✅ | Meta description + card text — hard limit 160 chars |
| `category` | ✅ | Badge on card. Common: `Market Analysis`, `Seller Strategy`, `International`, `New Construction`, `Buyer Guide` |
| `seoTitle` | — | Short `<title>` (~60 chars) when `title` is longer and more descriptive |
| `updated` | — | `YYYY-MM-DD` — drives schema `dateModified` |
| `image` | — | Cover / OG image, e.g. `/images/journal/og/<slug>.jpg` |
| `created_by` | — | `claude` \| `codex` \| `manual` \| `unknown` — attribution reporting |
| `content_goal` | — | `seller_lead` \| `buyer_lead` \| `agent_referral` \| `international_listing` \| `credibility` \| `market_report` |
| `market` | — | Primary geographic market |
| `funnel_stage` | — | `awareness` \| `consideration` \| `bottom_funnel` |

**3. Write the body**

Standard Markdown, parsed by `src/lib/markdown.ts`. Supported formatting:

| Syntax | Result |
|--------|--------|
| `## Heading` | H2 section heading |
| `### Sub-heading` | H3 |
| `**bold**` | Bold |
| `*italic*` | Italic |
| `` `code` `` | Inline code |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `> text` | Blockquote / pull quote |
| `[label](url)` | Link |
| `![alt](url)` | Image |
| `---` | Horizontal divider |

Copy `src/content/journal/_template.md` as a starting point.

**4. Generate the share card + register the route**

```bash
node scripts/render-journal-og.mjs                # posts missing a card
node scripts/render-journal-og.mjs --slug=<slug>  # just one post
node scripts/render-journal-og.mjs --force        # re-render all
```

Then set the post's frontmatter to `image: "/images/journal/og/<slug>.jpg"`, add
`/journal/<slug>` to the `reactSnap.include` list in `package.json`, and add the
URL to `public/sitemap.xml`. Posts missing from the include list are NOT
prerendered — crawlers and social scrapers would see an empty JS shell.
`npm run verify:journal` fails if a post's `image` points at a file that isn't
there, so render the card before setting the field.

**5. Commit and push**

```bash
npm run verify:journal && npm run lint
git add -A
git commit -m "Add journal: <post title>"
git push origin main
```

Netlify auto-deploys in ~60 seconds. The post appears at `https://homesprofessional.com/journal/<slug>`.

The consultation CTA block, author byline, breadcrumb, and compliance footer are
injected automatically — no need to write them in the post body.

### The daily automated post

`.github/workflows/daily-journal.yml` runs `scripts/daily-journal-publisher.mjs`
at 12:35 UTC daily (8:35 AM ET during DST), generating one templated post from a
rotating market × angle matrix. It does steps 1 through 5 on its own — including
rendering the share card, setting `image:`, updating `reactSnap.include` and
`sitemap.xml`, and running `verify:journal`, `lint`, and `build` before it
commits — so automated posts need no manual follow-up.

If no browser can be launched, the post still publishes without a card rather
than losing the day's run — but it is no longer silent about it: the publisher
emits a GitHub Actions `::warning` annotation and a job-summary entry, so the
run page shows the miss. The workflow then re-runs `render-journal-og.mjs` on
every run, which renders any missing card **and** writes the `image:` field, so
a one-day browser outage self-heals on the next run.

The renderer resolves a browser in this order: `PUPPETEER_EXECUTABLE_PATH` if
set (a bad value fails loudly rather than silently falling back), then
puppeteer's bundled Chromium, then any system Chrome it can find — Playwright's
cache under `PLAYWRIGHT_BROWSERS_PATH`, then the usual `/usr/bin` locations.
react-snap pins puppeteer 1.x, whose bundled Chromium needs `libXss` and will
not start on a slim container; that fallback is what keeps cards rendering
there.

#### How a generated post stays distinct

Each post is built from a market record (`markets` in the publisher) that carries
that market's `setting`, `diligence`, `pricing`, `competition`, `hook`, and
`risk`. The prose is assembled from those fields, so two posts on the same angle
differ because the market facts differ — not because wording was shuffled.

The supporting blocks every post must carry (distribution, bio, FAQ, source note)
come from pools whose sizes are deliberately **coprime — 4, 5, 3, and 7**. Equal
pool sizes collide in lockstep no matter what stride you select with; coprime
sizes do not repeat a combination until 420 posts, well beyond the 12 markets an
angle covers.

Three gates run before anything is written:

| Gate | Fails when |
|------|-----------|
| `assertQuality` | Missing compliance footer, source basis, CTA, or non-guarantee disclaimer; excerpt over 160 characters |
| `assertVerifiedFigures` | Any number appears that is not in `VERIFIED_FIGURE_PHRASES` (mirrored from `figures.json`) |
| `assertDistinct` | The new post exceeds `MAX_SIMILARITY` (50%) shingle overlap with any existing post |

`assertDistinct` is the guard against the failure that produced a dozen
93%-identical posts: a template varying only by city name still generates and
still passes every other check. If it trips, add market-specific substance —
do not raise the threshold.

**When adding a market**, fill in every field; a market missing `diligence` or
`pricing` produces generic prose that will trip the distinctness gate. **When
adding an angle**, keep pool sizes coprime if you add supporting-block variants.

---

## Deployment

`main` auto-deploys to Netlify (`bash scripts/fetch-videos.sh && yarn build`).
`.github/workflows/build.yml` type-checks and builds every PR, and deploys on
push to `main`.

Security headers, cache policy, and every redirect live in `netlify.toml`. The
CSP is currently `Content-Security-Policy-Report-Only` — tighten it to enforcing
only after checking the violation reports.

Production promotion of anything risky goes through the `deploy-gate` agent:
preview branch first, explicit approval from Carlos second. That agent never
merges to `main` or triggers a production deploy on its own.

---

## Subagents

Project agents in `.claude/agents/`, use them for what they own:

| Agent | Use for |
|---|---|
| `auditor` | Read-only sweep of lead pipeline, forms, `/es` parity, SEO, compliance. Run first in a session. |
| `compliance-reviewer` | **Mandatory** gate on any public-facing copy diff before staging or deploy. |
| `data-updater` | Monthly/quarterly market data refresh from REALTORS® report PDFs. |
| `seo-engineer` | Sitemap, schema, meta tags, internal linking, SellCity pages. Its copy still needs compliance review. |
| `deploy-gate` | The only agent that builds and pushes; preview branch only. |

---

## Gotchas

- **`src/main.tsx` is the router.** Searching for `App.tsx` finds nothing.
- **Four files per route** (main.tsx / reactSnap.include / sitemap.xml /
  netlify.toml). Miss one and the page ships broken in a way local dev won't show.
- **`createRoot`, not `hydrateRoot`** — intentional, documented in main.tsx.
- **The dual lead path is not duplication.** See Lead pipeline.
- **`Intl.NumberFormat` needs explicit `minimumFractionDigits`** — older ICU
  defaults it to 2 for currency and throws `RangeError` during prerendering,
  which kills the build for that route.
- **`navigator.webdriver` guards** keep third-party pixels and funnel events from
  firing during react-snap prerendering. Don't strip them.
- **`/404.html` redirects to `/`** so bot hits on the prerender artifact don't
  inflate GA4 Direct sessions.
- **Both lockfiles** (`package-lock.json` and `yarn.lock`) must stay in sync.
- **No figure ships without a source.** When in doubt, leave the number out.

---

## Routes

| Path | Page |
|------|------|
| `/` | HomePage (eager) |
| `/sell-south-florida` | SellSouthFloridaPage |
| `/sell-{weston,coral-gables,aventura,doral,brickell,coral-springs,pembroke-pines,fort-lauderdale,plantation,sunrise,miami,kendall,downtown-miami,north-miami,pompano-beach,hallandale-beach}` | Per-city seller landing pages |
| `/home-value` | HomeValuePage |
| `/buy` | BuyersPage |
| `/new-construction` | NewConstructionPage |
| `/listings` | ListingsPage |
| `/markets` | MarketsPage |
| `/market-data` | MarketDataPage |
| `/journal`, `/journal/:slug` | JournalListPage, JournalPostPage |
| `/global-desk` | GlobalDeskPage (nav label: "Global Desk"; `/spain-desk` 301s here) |
| `/spain-mls-listing` | SpainMlsListingPage |
| `/la-comision-secreta` | LaComisionSecretaPage (Spanish) |
| `/agents` | AgentsPage |
| `/about`, `/contact` | AboutPage, ContactPage |
| `/reviews`, `/leave-a-review` | ReviewsPage, LeaveReviewPage |
| `/privacy`, `/terms` | PrivacyPage, TermsPage |
| `/thanks/{seller,buyer,agent}` | Conversion pages — GA4 lead events fire here |
| `/es` | EsHomePage |
| `/es/{vender,comprar,agentes,spain-desk,gracias/agente}` | Spanish core pages |
| `/es/vender-{doral,brickell,coral-gables}` | Spanish per-city seller pages |
| `*` | NotFoundPage (served as a real 404 by netlify.toml) |

Legacy `/sell`, `/madrid`, `/madrid-miami`, `/miami-mls-international-desk`,
`/developers-agencies`, `/market`, `/market/:city`, `/es/madrid` all redirect —
both in `main.tsx` and `netlify.toml`.
