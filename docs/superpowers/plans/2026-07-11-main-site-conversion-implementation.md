# Main-Site Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the main HomesProfessional.com conversion journey with an English-first Miami Global Listing Desk, a modern accessible review spotlight, stronger homepage hierarchy, and authentic Spain-to-Miami imagery while leaving city pages untouched.

**Architecture:** Add a small pure review-navigation model and a reusable `ReviewSpotlight` component that both homepage and shared testimonial surfaces consume from `src/data/reviews.ts`. Keep Global Desk bilingual copy in its existing page-local translation structure, change only the default-language contract, and add approved Drive media as optimized static assets with documented provenance.

**Tech Stack:** React 19, TypeScript 5.8, Tailwind CSS 4, Motion 12, Lucide React, Vite 6, `tsx` verification scripts, Google Drive connector, Netlify.

## Global Constraints

- Do not modify city pages.
- Keep public review text verbatim from `src/data/reviews.ts`.
- Do not display a total review count.
- Respect `prefers-reduced-motion` and keyboard accessibility.
- `/global-desk` must render English by default and retain an explicit Spanish option.
- Do not imply Carlos owns or operates an MLS or has official MIAMI REALTORS endorsement.
- Do not guarantee exposure, placement, leads, buyers, commissions, or sales.
- Use only the verified figures in `AGENTS.md`.
- Preserve the existing HomesProfessional.com typography, colors, and brand system.
- Do not add a carousel dependency.
- Do not publish placeholder imagery if suitable new Drive assets are unavailable.

---

### Task 1: Deterministic Review Navigation Model

**Files:**
- Create: `src/components/reviews/reviewSpotlightModel.ts`
- Create: `scripts/verify-review-spotlight.ts`

**Interfaces:**
- Produces: `wrapReviewIndex(index: number, length: number): number`
- Produces: `reviewWindow(activeIndex: number, length: number): { previous: number; active: number; next: number }`
- Produces: `shouldAutoAdvance(input: { inView: boolean; paused: boolean; documentVisible: boolean; reducedMotion: boolean }): boolean`

- [ ] **Step 1: Write the failing verification script**

Create `scripts/verify-review-spotlight.ts` with assertions for negative wrapping, overflow wrapping, single-item windows, and all auto-advance gates:

```ts
import assert from "node:assert/strict";
import {
  reviewWindow,
  shouldAutoAdvance,
  wrapReviewIndex,
} from "../src/components/reviews/reviewSpotlightModel";

assert.equal(wrapReviewIndex(-1, 5), 4);
assert.equal(wrapReviewIndex(5, 5), 0);
assert.deepEqual(reviewWindow(0, 5), { previous: 4, active: 0, next: 1 });
assert.deepEqual(reviewWindow(0, 1), { previous: 0, active: 0, next: 0 });
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: false }), true);
assert.equal(shouldAutoAdvance({ inView: false, paused: false, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: true, documentVisible: true, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: false, reducedMotion: false }), false);
assert.equal(shouldAutoAdvance({ inView: true, paused: false, documentVisible: true, reducedMotion: true }), false);

console.log("review spotlight model verified");
```

- [ ] **Step 2: Run the script and verify it fails**

Run:

```powershell
node_modules\.bin\tsx.cmd scripts\verify-review-spotlight.ts
```

Expected: failure because `reviewSpotlightModel.ts` does not exist.

- [ ] **Step 3: Implement the pure model**

Create `src/components/reviews/reviewSpotlightModel.ts`:

```ts
export function wrapReviewIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function reviewWindow(activeIndex: number, length: number) {
  const active = wrapReviewIndex(activeIndex, length);
  return {
    previous: wrapReviewIndex(active - 1, length),
    active,
    next: wrapReviewIndex(active + 1, length),
  };
}

export function shouldAutoAdvance(input: {
  inView: boolean;
  paused: boolean;
  documentVisible: boolean;
  reducedMotion: boolean;
}): boolean {
  return input.inView && !input.paused && input.documentVisible && !input.reducedMotion;
}
```

- [ ] **Step 4: Run focused and type verification**

Run:

```powershell
node_modules\.bin\tsx.cmd scripts\verify-review-spotlight.ts
node node_modules\typescript\bin\tsc --noEmit
```

Expected: `review spotlight model verified`; TypeScript exits `0`.

- [ ] **Step 5: Commit**

```powershell
git add src/components/reviews/reviewSpotlightModel.ts scripts/verify-review-spotlight.ts
git commit -m "Add review spotlight navigation model"
```

---

### Task 2: Accessible Review Spotlight Component

**Files:**
- Create: `src/components/reviews/ReviewSpotlight.tsx`
- Modify: `src/components/Proof.tsx`
- Modify: `src/components/Testimonials.tsx`

**Interfaces:**
- Consumes: `REVIEWS`, `VERIFIED_REVIEWS`, `REALTOR_PROFILE_URL`, `RATING_VALUE`, and `formatReviewDateShort` from `src/data/reviews.ts`
- Consumes: navigation helpers from Task 1
- Produces: `ReviewSpotlight({ reviews, compact? }: { reviews: Review[]; compact?: boolean })`

- [ ] **Step 1: Add a source-contract assertion before UI work**

Extend `scripts/verify-review-spotlight.ts`:

```ts
import { REVIEWS } from "../src/data/reviews";

assert.ok(REVIEWS.length >= 3, "spotlight requires at least three source reviews");
assert.ok(REVIEWS.every((review) => review.text.trim().length > 0));
```

Run the script. Expected: PASS, proving the component can use the canonical review source.

- [ ] **Step 2: Build `ReviewSpotlight`**

Implement a controlled component with:

```ts
export interface ReviewSpotlightProps {
  reviews: Review[];
  compact?: boolean;
}

export function ReviewSpotlight({ reviews, compact = false }: ReviewSpotlightProps) {
  // activeIndex state; IntersectionObserver visibility; matchMedia reduced-motion;
  // visibilitychange listener; hover/focus/pointer pause; 9-second interval;
  // previous/next buttons; touch start/end threshold; stable min-height.
}
```

Required implementation details:

- Use `ChevronLeft`, `ChevronRight`, `BadgeCheck`, and `Star` from `lucide-react`.
- Use icon-only previous/next buttons with `aria-label`, `title`, and visible focus rings.
- Render one active article and adjacent desktop previews from `reviewWindow`.
- Give the active review `aria-live="polite"`; mark preview duplicates `aria-hidden="true"`.
- Use a 9-second interval only when `shouldAutoAdvance(...)` returns true.
- Set pause on mouse enter, focus capture, and touch start; release on mouse leave, blur capture when focus leaves, and touch end.
- Treat a horizontal touch delta of at least 44px as navigation.
- Use `min-h-*` responsive constraints so review changes do not shift following content.
- Use Motion opacity/x transitions only when reduced motion is false.
- Never render `REVIEWS.length` or any review-count label.

- [ ] **Step 3: Replace homepage static reviews**

In `src/components/Proof.tsx`, retain the current verified rating header and attribution, but replace the static `VERIFIED_REVIEWS.slice(0, 3).map(...)` grid with:

```tsx
<ReviewSpotlight reviews={REVIEWS} />
```

Keep the Realtor.com link and individual-results disclaimer. Do not rewrite any review body.

- [ ] **Step 4: Replace the shared marquee**

In `src/components/Testimonials.tsx`, remove the duplicated marquee track and reuse:

```tsx
<ReviewSpotlight reviews={REVIEWS} />
```

Keep the section heading, verified attribution, and disclaimer so `/reviews`, `/markets`, and the main South Florida seller page retain context.

- [ ] **Step 5: Verify interaction contracts**

Run:

```powershell
node_modules\.bin\tsx.cmd scripts\verify-review-spotlight.ts
node node_modules\typescript\bin\tsc --noEmit
rg -n "REVIEWS\.length|reviewCount|marquee-track-slow" src\components\Proof.tsx src\components\Testimonials.tsx src\components\reviews\ReviewSpotlight.tsx
```

Expected: model verification and TypeScript pass; the scoped scan finds no total count and no review marquee.

- [ ] **Step 6: Commit**

```powershell
git add src/components/reviews/ReviewSpotlight.tsx src/components/Proof.tsx src/components/Testimonials.tsx scripts/verify-review-spotlight.ts
git commit -m "Add accessible client review spotlight"
```

---

### Task 3: English-First Miami Global Listing Desk

**Files:**
- Modify: `src/pages/GlobalDeskPage.tsx`
- Modify: `src/components/GlobalDeskTeaser.tsx`
- Modify: `src/components/forms/GlobalDeskListingForm.tsx` only if its first render derives from the parent language incorrectly

**Interfaces:**
- Existing `Lang = "es" | "en"` remains unchanged.
- Existing `pick(l: Lang)` persists an explicit visitor choice under `gd-lang`.

- [ ] **Step 1: Add a static verification script for the language contract**

Create `scripts/verify-global-desk-language.mjs` that reads `src/pages/GlobalDeskPage.tsx` and asserts:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile("src/pages/GlobalDeskPage.tsx", "utf8");
assert.match(source, /useState<Lang>\("en"\)/);
assert.match(source, /localStorage\.getItem\("gd-lang"\)/);
assert.match(source, /hrefLang="es"/);
assert.match(source, /Miami Global Listing Desk/);
console.log("global desk language contract verified");
```

Run it before editing. Expected: FAIL because the current initial state is Spanish.

- [ ] **Step 2: Change first render to English**

In `GlobalDeskPage.tsx`:

```ts
const [lang, setLang] = useState<Lang>("en");
```

Retain the explicit saved-language lookup. Ensure the English option is first in visual and DOM order and carries `aria-pressed={lang === "en"}`; Spanish uses `aria-pressed={lang === "es"}`.

- [ ] **Step 3: Strengthen first-viewport seller positioning**

Use the existing English translation structure to make the first viewport state:

- Audience: international property owners, developers, and listing agents.
- Outcome: selected inventory prepared for discovery and professional cooperation by Miami-area buyer agents.
- Operator: Carlos Uzcategui, Florida Realtor, through United Realty Group.
- Constraint: subject to brokerage, platform, property-eligibility, and compliance requirements.

Keep the primary CTA as a private introduction or listing-distribution review and WhatsApp as secondary. Do not introduce MLS ownership, official endorsement, or guarantees.

- [ ] **Step 4: Align teaser comment and copy**

Update `GlobalDeskTeaser.tsx` so its source comment no longer says the destination defaults to Spanish. Keep English shell copy and the link to `/global-desk`.

- [ ] **Step 5: Verify language and compliance**

Run:

```powershell
node scripts\verify-global-desk-language.mjs
node node_modules\typescript\bin\tsc --noEmit
rg -n -i "own.*MLS|operate.*MLS|official endorsement|guaranteed placement|guaranteed leads|guaranteed buyers|guaranteed commissions|guaranteed sales" src\pages\GlobalDeskPage.tsx src\components\GlobalDeskTeaser.tsx
```

Expected: language contract and TypeScript pass; no prohibited implication is found.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/GlobalDeskPage.tsx src/components/GlobalDeskTeaser.tsx scripts/verify-global-desk-language.mjs
git commit -m "Make Miami Global Listing Desk English first"
```

---

### Task 4: Approved Spain-To-Miami Media

**Files:**
- Create: `public/images/<approved-spain-asset>.webp` only after Drive review
- Create: `public/images/<approved-international-asset>.webp` only if a second distinct approved file adds useful context
- Modify: `public/images/README.md`
- Modify: `src/pages/GlobalDeskPage.tsx`

**Interfaces:**
- Consumes: Google Drive files selected by visual quality, authenticity, relevance, and permission context.
- Produces: optimized local image paths with documented source title and Drive ID.

- [ ] **Step 1: Discover newly uploaded media**

Search Drive for files modified after `2026-07-11T00:00:00Z`, filtering to image and video MIME types. Also inspect direct children of the known Marketing CEUL and AI Videos RE Marketing folders when recent search results are empty.

Record each candidate's title, ID, MIME type, dimensions when available, and intended use. Do not choose an asset by filename alone.

- [ ] **Step 2: Inspect and rank candidates**

Fetch candidate images or representative video frames and rank them against:

1. Clearly recognizable Spain property/place/professional context.
2. Inspectable subject rather than atmospheric stock treatment.
3. Sufficient resolution for a 16:9 or editorial 4:3 crop.
4. No misleading people or affiliation claims.
5. Visual compatibility with navy, ivory, and gold site styling.

If no candidate passes, complete the task with no new asset and retain existing approved photography.

- [ ] **Step 3: Optimize selected media**

Use the bundled image runtime to create WebP output at a maximum long edge of 1920px, preserve aspect ratio, strip unnecessary metadata, and target a practical web size below approximately 700KB when quality permits.

Do not overwrite original Drive files.

- [ ] **Step 4: Document provenance**

Add one line per selected asset to `public/images/README.md`:

```md
- `approved-spain-asset.webp` — source: Google Drive, `<original filename>`, file ID `<drive-id>`; approved use: Miami Global Listing Desk international-market editorial band.
```

- [ ] **Step 5: Add the editorial bridge**

In `GlobalDeskPage.tsx`, add one unframed, responsive editorial band after the opening distribution argument and before detailed process content. Use:

```tsx
<img
  src="/images/approved-spain-asset.webp"
  alt="Specific factual description of the visible Spain place or property"
  width={1920}
  height={1080}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover"
/>
```

Pair the Spain image with existing South Florida professional imagery through a two-column desktop composition that becomes a single-column sequence on mobile. Do not create nested cards or a generic gallery.

- [ ] **Step 6: Verify assets**

Run:

```powershell
Get-Item public\images\*.webp | Sort-Object LastWriteTime -Descending | Select-Object -First 6 Name,Length
node node_modules\typescript\bin\tsc --noEmit
rg -n "drive.google.com|loading=\"lazy\"|decoding=\"async\"" src\pages\GlobalDeskPage.tsx public\images\README.md
```

Expected: selected images exist locally, no Drive URL is embedded in the page, and below-fold media is lazy/async.

- [ ] **Step 7: Commit**

```powershell
git add public/images src/pages/GlobalDeskPage.tsx
git commit -m "Add Spain-to-Miami editorial imagery"
```

If no asset passes review, omit this commit and record the no-placeholder decision in the task ledger.

---

### Task 5: Homepage Hierarchy And Shared CTA Collision Cleanup

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Proof.tsx`
- Modify: `src/components/AboutContact.tsx`
- Modify: `src/components/MobileStickyCTA.tsx` only if browser review proves overlap
- Modify: `src/components/WhatsAppFloat.tsx` only if browser review proves overlap
- Modify: `src/index.css` only for shared responsive or reduced-motion rules required by the spotlight

**Interfaces:**
- Consumes: `ReviewSpotlight` from Task 2.
- Preserves: existing `HeroSellerForm`, seller CTA destinations, and brand tokens.

- [ ] **Step 1: Capture the current homepage at 1440x900 and 390x844**

Run the local Vite server and record screenshots plus measurements for:

- Hero headline and seller form.
- Hero feature bubble and progress controls.
- Review proof section.
- Cookie notice, WhatsApp float, and sticky CTA overlap.

Record `document.documentElement.scrollWidth` and `clientWidth`; expected baseline should show whether overflow already exists.

- [ ] **Step 2: Simplify competing hero proof**

Keep the primary headline and seller form dominant. If the cycling media bubble competes with the form at mobile width, move it below the form or hide the decorative clip under the smallest breakpoint while retaining its desktop presentation. Do not add review bubbles over the hero.

Add only a compact client-proof link near the seller decision path:

```tsx
<a href="#client-reviews" className="...">
  <Star size={14} aria-hidden="true" />
  Verified client experiences
  <ChevronRight size={14} aria-hidden="true" />
</a>
```

The link must not include a total review count.

- [ ] **Step 3: Give the proof section a stable anchor**

Set `id="client-reviews"` on the homepage proof section and ensure scroll positioning is not hidden behind navigation.

- [ ] **Step 4: Remove unsupported shared homepage descriptors**

In `AboutContact.tsx`, replace unsupported founding-year and in-house-title claims with verified language:

```tsx
<p>
  From his Weston, Florida office, Carlos serves South Florida sellers and buyers through United Realty Group, with 3,500+ agents and 20 Florida offices. He also coordinates selected international property opportunities through documented professional and brokerage relationships.
</p>
```

Update the video title and caption to use only verified figures and supplied credentials.

- [ ] **Step 5: Fix only proven mobile collisions**

If the 390px screenshot shows collision, adjust the smallest responsible component. Preferred outcome:

- Cookie notice remains readable.
- Exactly one sticky conversion control occupies the bottom action area.
- WhatsApp remains reachable without covering form fields or review controls.

Do not modify desktop navigation or unrelated global layout without visual evidence.

- [ ] **Step 6: Verify homepage contracts**

Run:

```powershell
node node_modules\typescript\bin\tsc --noEmit
rg -n -i "founded 2002|in-house title|total reviews|review count" src\components\Hero.tsx src\components\Proof.tsx src\components\AboutContact.tsx
```

Expected: TypeScript passes and unsupported/count language is absent.

- [ ] **Step 7: Commit**

```powershell
git add src/components/Hero.tsx src/components/Proof.tsx src/components/AboutContact.tsx src/components/MobileStickyCTA.tsx src/components/WhatsAppFloat.tsx src/index.css
git commit -m "Strengthen homepage seller conversion hierarchy"
```

Stage only files actually changed.

---

### Task 6: Integrated Verification And Release

**Files:**
- Modify: no product files unless verification finds a release regression
- Inspect: all files changed since `dc17b26`

**Interfaces:**
- Consumes: Tasks 1-5.
- Produces: verified production commit and live release evidence.

- [ ] **Step 1: Run deterministic checks**

```powershell
node_modules\.bin\tsx.cmd scripts\verify-review-spotlight.ts
node scripts\verify-global-desk-language.mjs
node node_modules\typescript\bin\tsc --noEmit
node node_modules\vite\bin\vite.js build
```

Expected: all commands exit `0`.

- [ ] **Step 2: Run scope and compliance scans**

```powershell
git diff --name-only dc17b26..HEAD
git diff --check dc17b26..HEAD
rg -n -i "own.*MLS|operate.*MLS|official endorsement|guaranteed placement|guaranteed leads|guaranteed buyers|guaranteed commissions|guaranteed sales|founded 2002|in-house title" src\pages\GlobalDeskPage.tsx src\components\GlobalDeskTeaser.tsx src\components\Hero.tsx src\components\Proof.tsx src\components\AboutContact.tsx
```

Expected: no city-page paths, whitespace errors, or prohibited public claims.

- [ ] **Step 3: Browser verification**

Review `/` and `/global-desk` at 1440x900 and 390x844. Also spot-check `/reviews`, `/markets`, and `/sell-south-florida` because they consume the shared review component.

Verify:

- English is the initial Global Desk language in a clean browser context.
- Spanish selection works and persists after reload.
- Previous/next controls are unique, keyboard accessible, and update the active review.
- Swipe works on mobile where implemented.
- Autoplay pauses on hover/focus and reduced motion disables automatic movement.
- No total review count appears.
- No horizontal overflow or CTA/overlay collision appears.
- New images load with nonzero natural dimensions and intentional crops.
- Console contains no new first-party errors.

- [ ] **Step 4: Review the complete release diff**

Request a fresh review of `dc17b26..HEAD`, prioritizing behavioral regressions, accessibility, timer cleanup, stale closures, language persistence, unsupported claims, mobile overlap, and city-page scope.

Address all high- and medium-severity findings, then rerun Steps 1-3.

- [ ] **Step 5: Publish the approved release**

Fetch `origin`, confirm `origin/main...main` has no remote-only commits, push `main`, and verify the corresponding Netlify production deployment.

- [ ] **Step 6: Verify production**

Confirm live `200` responses and new copy/assets on:

- `https://homesprofessional.com/`
- `https://homesprofessional.com/global-desk/`
- `https://homesprofessional.com/reviews/`

Confirm the production Global Desk first render is English in a clean browser context and the new image URLs return the correct image MIME type.
