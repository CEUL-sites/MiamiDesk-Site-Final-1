# Homepage Seller Strategy Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the homepage seller journey, progressive hero form, and contact-page form hierarchy without changing routes, lead delivery, or production settings.

**Architecture:** Keep React/Vite/Netlify conventions already present. Add pure form-step behavior for executable tests, two focused homepage sections, and a prop-controlled `AboutContact`; update the existing verification script to cover the approved contracts.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Motion 12, Netlify Forms/functions, Node assert verification scripts.

## Global Constraints

- Branch from `main` as `conversion/homepage-seller-strategy`.
- Do not merge or deploy production.
- Preserve routes, bilingual infrastructure, Netlify Forms/functions, analytics, attribution, notifications, acknowledgments, SEO/prerender/sitemap/canonical/hreflang/schema, and production settings.
- Do not add unverified outcomes, people, prices, timing, percentages, or distribution figures.
- Do not increase initial video payload.
- Keep final `seller-hero` field names and lead events unchanged; add only `step_progress` for step navigation.

---

### Task 1: Progressive seller-form behavior

**Files:**
- Create: `src/components/heroSellerFormModel.ts`
- Modify: `scripts/verify-homepage-conversion.ts`
- Modify: `src/components/HeroSellerForm.tsx`

**Interfaces:**
- Produces: `validateHeroSellerStepOne`, `nextHeroSellerStep`, and `previousHeroSellerStep`.
- Preserves: `seller-hero` POST payload and success/delivery effects.

- [ ] **Step 1: Write failing model and source-contract assertions**

Add assertions that an empty address/name/phone is invalid, valid Step 1 advances to Step 2, Back returns to Step 1, and source contracts retain the final field names, notification, acknowledgment, success, English/Spanish copy, and one `trackLead` call.

- [ ] **Step 2: Run the verification and confirm the missing model fails**

Run `node --import tsx scripts/verify-homepage-conversion.ts`.

- [ ] **Step 3: Implement the pure step model and two-step UI**

Render address/name/phone and a non-submit Continue button in Step 1; render optional email/market/timeline/consent, Back, and the final submit in Step 2. Use `step_progress` on successful Continue and Back only.

- [ ] **Step 4: Run focused verification and lint**

Run `node --import tsx scripts/verify-homepage-conversion.ts` and `npm run lint`.

### Task 2: Homepage message and hierarchy

**Files:**
- Modify: `scripts/verify-homepage-conversion.ts`
- Modify: `src/components/Hero.tsx`
- Create: `src/components/SellerAuthorityStrip.tsx`
- Create: `src/components/SellerExecutionSystem.tsx`
- Modify: `src/components/Distribution.tsx`
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- `Hero` renders the approved H1, support copy, primary action, WhatsApp alternative, trust line, and compact proof.
- `SellerExecutionSystem` renders Position, Activate, Report, Adjust as an editorial rail.

- [ ] **Step 1: Add failing homepage-contract assertions**

Assert exact approved hero copy, CTA hierarchy, section order, execution language, one H1 contract, and homepage metadata.

- [ ] **Step 2: Run and confirm the copy/order assertions fail**

Run `node --import tsx scripts/verify-homepage-conversion.ts`.

- [ ] **Step 3: Refactor hero and add the focused sections**

Use the existing navy/ivory/gold system and deferred hero media. Remove the multi-clip bubble and move verified distribution scale into compact support.

- [ ] **Step 4: Separate execution from distribution and reorder homepage**

Remove the old execution card grid from `Distribution`; order sections exactly as approved.

- [ ] **Step 5: Run focused verification and lint**

Run `node --import tsx scripts/verify-homepage-conversion.ts` and `npm run lint`.

### Task 3: Contact single-form correction

**Files:**
- Modify: `scripts/verify-homepage-conversion.ts`
- Modify: `src/components/AboutContact.tsx`
- Modify: `src/pages/ContactPage.tsx`

**Interfaces:**
- `AboutContact({ showForm?: boolean, compact?: boolean })`
- `/contact` retains one desk-aware `LeadForm`.

- [ ] **Step 1: Add a failing duplicate-form contract**

Assert `ContactPage` renders one direct `LeadForm`, calls `AboutContact` with `showForm={false}`, and `AboutContact` conditionally renders its form.

- [ ] **Step 2: Run and confirm the duplicate-form assertion fails**

Run `node --import tsx scripts/verify-homepage-conversion.ts`.

- [ ] **Step 3: Add the reusable no-form profile mode**

Keep profile, credentials, URG affiliation, direct contact, office, and compliance visible when the form is hidden.

- [ ] **Step 4: Run focused verification and lint**

Run `node --import tsx scripts/verify-homepage-conversion.ts` and `npm run lint`.

### Task 4: Full verification and rendered QA

**Files:**
- Verify all changed source.
- Save screenshots outside committed source.

**Interfaces:**
- Produces: reproducible command evidence and desktop/mobile screenshots for the draft PR.

- [ ] **Step 1: Run required automated checks**

Run Yarn-form commands where the runtime permits, plus the `node --import tsx` sandbox fallback, `npm run verify:journal`, `npm run build`, and discovered verification scripts.

- [ ] **Step 2: Start the production preview**

Serve `dist` locally without changing Netlify configuration.

- [ ] **Step 3: Review desktop and mobile**

Capture homepage and contact at 1440×1000 and 390×844; exercise Step 1, required validation, Step 2, Back/data retention, success, sticky CTA, overflow, focus, and console health.

- [ ] **Step 4: Review final diff**

Confirm no routes, lead fields, functions, analytics events, schema, sitemap, canonical/hreflang, or production environment settings were removed.

### Task 5: Draft pull request

**Files:**
- Commit only intended source, tests, and design/plan documentation.

**Interfaces:**
- Produces: pushed branch and draft PR against `main`.

- [ ] **Step 1: Commit and push**

Push `conversion/homepage-seller-strategy` without force.

- [ ] **Step 2: Open the draft PR**

Include business objective, message/form/contact summaries, files, tests, screenshots, limitations, preservation confirmation, and the Netlify Deploy Preview URL when available.

- [ ] **Step 3: Inspect preview/check status**

Wait for Netlify/GitHub status, attach the preview URL and screenshots, and leave the PR unmerged.

