# Global Desk Operating Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual, brokerage-led Global Desk conversion page that leads with professional activation and qualified buyer cooperation while preserving the existing lead, analytics, SEO, and Netlify infrastructure.

**Architecture:** One route-derived bilingual page serves `/global-desk` and `/es/global-desk`; legacy Spain desk routes become permanent redirects. Copy and section data move into a focused model module, the existing Global Desk form becomes a two-stage progressive form, and source-text verification asserts the public contract and four-file route consistency.

**Tech Stack:** React 19, TypeScript, React Router 7, Tailwind CSS 4, Netlify Forms/functions, react-helmet-async, react-snap, Node assertion scripts.

**Spec:** `docs/superpowers/specs/2026-08-22-global-desk-operating-model-design.md`

## Global Constraints

- Start from `origin/main` on `conversion/global-desk-operating-model`; do not merge or deploy production.
- `CLAUDE.md` compliance and verified-figure rules control all public copy.
- Preserve Netlify dual submission, deduplication, scoring, acknowledgment, attribution, analytics, anti-spam, and WhatsApp handling.
- Canonicals are `/global-desk` and `/es/global-desk`; legacy routes retain React and Netlify redirects.
- Do not add dependencies or change either lockfile.
- Do not guarantee placement, distribution, outreach, buyer interest, leads, offers, compensation, or transactions.

---

### Task 1: Encode the bilingual product and route contract

**Files:**
- Create: `src/pages/globalDeskContent.ts`
- Modify: `scripts/verify-global-desk-language.mjs`
- Test: `scripts/verify-global-desk-language.mjs`

**Interfaces:**
- Produces: `GLOBAL_DESK_CONTENT`, `GlobalDeskLang`, `GLOBAL_DESK_STATS`, and route/copy assertions used by the page.

- [ ] **Step 1: Replace the stale verification assertions with failing checks** for the two canonical routes, the approved English/Spanish hero copy, section-order keys, buyer qualification terms, agent-control paths, 365-day qualifier, prohibited `$69B`, and prohibited “pre-approved buyer”.
- [ ] **Step 2: Run `node scripts/verify-global-desk-language.mjs`** and confirm it fails because `globalDeskContent.ts` and `/es/global-desk` do not exist.
- [ ] **Step 3: Add `globalDeskContent.ts`** with concise English and Castilian Spanish content, sourced stat labels, FAQ data, and typed section arrays.
- [ ] **Step 4: Run the contract again** and confirm remaining failures point only to the page/routes not yet implemented.

### Task 2: Recompose the Global Desk page around activation and cooperation

**Files:**
- Modify: `src/pages/GlobalDeskPage.tsx`
- Modify: `src/components/SEO/SchemaOrg.tsx`
- Test: `scripts/verify-global-desk-language.mjs`

**Interfaces:**
- Consumes: `GLOBAL_DESK_CONTENT`, `GlobalDeskLang`, and `GLOBAL_DESK_STATS`.
- Produces: one route-derived bilingual page with stable section IDs `audience`, `difference`, `mandate`, `proof`, `buyer-introduction`, `agent-protection`, `activation`, `relationships`, `listing-request`, and `faq`.

- [ ] **Step 1: Add failing source assertions** for route-derived language, canonical/hreflang pairs, section IDs/order, exact CTAs, sourced proof, and the absence of local-storage language toggling.
- [ ] **Step 2: Run the contract** and verify those assertions fail on the PR #134 page.
- [ ] **Step 3: Rebuild `GlobalDeskPage.tsx`** using the existing Navbar, Footer, sticky CTA, LazyVideo, motion conventions, JSON-LD, and form while reducing repeated explanatory bands and cards.
- [ ] **Step 4: Update the sitewide service schema** to the approved activation/cooperation definition with `areaServed: "South Florida"` and no guaranteed activity.
- [ ] **Step 5: Run the contract and TypeScript gate**; confirm the page assertions pass.

### Task 3: Convert the Global Desk intake to progressive disclosure

**Files:**
- Modify: `src/components/forms/GlobalDeskListingForm.tsx`
- Modify: `scripts/verify-global-desk-language.mjs`
- Test: `scripts/verify-global-desk-language.mjs`

**Interfaces:**
- Consumes: `lang: GlobalDeskLang`.
- Preserves: form name `global-desk-listing`, dual submissions, existing hidden fields, attribution, analytics, acknowledgment, consent, and conditional detail payload fields.
- Produces: first-stage paths `inventory`, `mandate`, and `buyer_opportunity`, then a second-stage detail form.

- [ ] **Step 1: Add failing assertions** that the first stage contains exactly the three approved paths and only contact fields, that detail/upload UI is gated behind stage two, and that all infrastructure calls/hidden fields remain.
- [ ] **Step 2: Run the contract** and verify failure on the current single-page form.
- [ ] **Step 3: Implement stage state and conditional fields** without changing submission endpoints or removing any existing payload protection.
- [ ] **Step 4: Run the contract and TypeScript gate**; confirm all form assertions pass.

### Task 4: Consolidate bilingual routes and SEO files

**Files:**
- Modify: `src/main.tsx`
- Modify: `package.json`
- Modify: `public/sitemap.xml`
- Modify: `netlify.toml`
- Modify: `src/constants.ts`
- Test: `scripts/verify-global-desk-language.mjs`

**Interfaces:**
- Produces: canonical `/es/global-desk`; redirects `/es/spain-desk` to it and `/spain-mls-listing` to `/global-desk`; matching prerender, sitemap, hreflang, and contact routing.

- [ ] **Step 1: Add failing four-file route assertions** and legacy-content checks.
- [ ] **Step 2: Run the contract** and confirm failures identify the old routes.
- [ ] **Step 3: Update router, prerender includes, sitemap, Netlify redirects, and route predicates**; remove legacy pages from active routing without deleting their source files.
- [ ] **Step 4: Run the contract, `npm run lint`, and a production build**; inspect prerendered canonical and alternate links.

### Task 5: Rendered QA, compliance sweep, and draft PR

**Files:**
- Modify only files required by defects found during QA.
- Create outside repo: desktop/mobile English/Spanish screenshots and before screenshots for the PR.

**Interfaces:**
- Produces: verified branch commits and a draft PR to `main` with Netlify preview evidence.

- [ ] **Step 1: Run fresh `npm run verify`, `npm run lint`, and `npm run build`**; separately identify any pre-existing unrelated baseline failures.
- [ ] **Step 2: Run English and Spanish desktop/mobile browser QA** for page identity, content hierarchy, console health, accessibility basics, section order, and overflow.
- [ ] **Step 3: Exercise all three form entry paths** through stage transition without submitting test leads; verify required fields, back navigation, focus, and no first-stage uploads.
- [ ] **Step 4: Inspect prerendered HTML and redirect configuration** for canonical, hreflang, sitemap, and legacy URLs.
- [ ] **Step 5: Compare implementation screenshots with the three concept references using `view_image`** and resolve material hierarchy, spacing, typography, palette, media, and mobile mismatches.
- [ ] **Step 6: Stage only confirmed files, commit, push the feature branch, and open a draft PR** with summary, before/after desktop/mobile EN/ES screenshots, validation results, known baseline failures, and no-merge warning.
- [ ] **Step 7: Wait for the Netlify bot and add the Deploy Preview URL** after checking the preview routes and form UI.
