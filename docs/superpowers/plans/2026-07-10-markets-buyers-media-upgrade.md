# Markets and Buyers Media Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend Miami Global Listing Desk positioning into Markets and Buyers and add three optimized, authentic proof images without weakening performance, compliance, or the buyer journey.

**Architecture:** Keep page ownership inside the existing React page modules and serve approved Drive photography from `public/images`. Correct shared verified figures first, then update Markets, Buyers, and Global Desk as independent page tasks with disjoint write scopes. Reuse the existing local Spain video and `LazyVideo`; do not add a new media abstraction or hotlink Google Drive.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Pillow 12.2 for image optimization, Netlify.

## Global Constraints

- Use `Miami Global Listing Desk` as the public service name.
- Use only these network figures in refreshed claims: 93,000 members, 200+ global portals, 19 languages, 260+ U.S. MLSs, 437+ international agreements, 11 MLS data exchanges, $69B 2025 volume, 3,500+ United Realty Group agents, and 20 United Realty Group Florida offices.
- Attribute $69B to the applicable association network, never to Carlos or United Realty Group.
- Do not imply that Carlos owns or operates an MLS, that MIAMI REALTORS® endorses the service, or that placement, leads, buyers, commissions, offers, or sales are guaranteed.
- Preserve `Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.` on public-facing surfaces.
- Do not hotlink Google Drive or modify unrelated pages and global components.

---

### Task 1: Align Verified Figure Sources

**Files:**
- Modify: `src/constants.ts`
- Modify: `src/data/figures.json`

**Interfaces:**
- Consumes: Carlos's authoritative verified-figure contract.
- Produces: `ASSOCIATION_STATS.networkVolume` and a consistent 20-office source for page modules.

- [ ] **Step 1: Run the failing compliance scan**

Run:

```powershell
rg -n 'Do NOT add: \$69B|"urgOffices": \{ "value": "21"' src/constants.ts src/data/figures.json
```

Expected: matches in both files, demonstrating the conflict.

- [ ] **Step 2: Correct the shared values**

Update `ASSOCIATION_STATS` to include:

```ts
networkVolume: "$69B",
networkVolumeLabel: "combined 2025 association-network transaction volume",
```

Replace the obsolete `$69B` prohibition with a comment requiring association attribution. In `figures.json`, set `urgOffices.value` to `20` and restore its source to the supplied United Realty Group Florida office directory without claiming 21 offices.

- [ ] **Step 3: Run the passing data scan**

Run:

```powershell
rg -n 'networkVolume|"urgOffices": \{ "value": "20"' src/constants.ts src/data/figures.json
rg -n '"urgOffices": \{ "value": "21"|Do NOT add: \$69B' src/constants.ts src/data/figures.json
```

Expected: the first command finds the approved values; the second returns no matches.

- [ ] **Step 4: Commit**

```powershell
git add src/constants.ts src/data/figures.json
git commit -m "Align verified distribution figures"
```

### Task 2: Import and Optimize Approved Drive Photography

**Files:**
- Create: `public/images/urg-weston-office.webp`
- Create: `public/images/carlos-miami-river.webp`
- Create: `public/images/carlos-property-media-team.webp`
- Modify: `public/images/README.md`

**Interfaces:**
- Consumes: Google Drive files `URG office Weston.jpg`, `CEUmiamiriver.jpg`, and `takingpics.jpg`.
- Produces: stable local public URLs used by the three page tasks.

- [ ] **Step 1: Verify the assets do not already exist**

Run:

```powershell
Get-Item public/images/urg-weston-office.webp,public/images/carlos-miami-river.webp,public/images/carlos-property-media-team.webp
```

Expected: file-not-found errors.

- [ ] **Step 2: Fetch the three approved files from Drive**

Use raw Drive fetch for these IDs and write the returned bytes to temporary source files:

```text
12SmXAkAl9jDYXNSBeoBsR5uItzAekAiq -> URG office Weston.jpg
1vWYV_2NcaTw7srhte6w6rO21igVONLzH -> CEUmiamiriver.jpg
1jpMvmI6T-qR8HWUyjegASlqyaBB_RQR7 -> takingpics.jpg
```

- [ ] **Step 3: Create optimized WebP assets**

Use Pillow with EXIF orientation correction, proportional resizing to a maximum width of 1920 pixels, and WebP quality 82. Preserve each full composition; page CSS owns the crop.

```python
from PIL import Image, ImageOps

for source, target in ASSETS:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > 1920:
            height = round(image.height * 1920 / image.width)
            image = image.resize((1920, height), Image.Resampling.LANCZOS)
        image.save(target, "WEBP", quality=82, method=6)
```

- [ ] **Step 4: Verify dimensions and weight**

Run a Pillow inspection that prints file name, dimensions, and byte size. Expected: valid WebP files, maximum width 1920 pixels, and each file materially smaller than its JPEG source.

- [ ] **Step 5: Document asset provenance**

Add the three filenames to `public/images/README.md`, identifying them as Carlos-supplied Drive photography and recording their intended use. Do not describe the property media team as United Realty Group agents.

- [ ] **Step 6: Commit**

```powershell
git add public/images/urg-weston-office.webp public/images/carlos-miami-river.webp public/images/carlos-property-media-team.webp public/images/README.md
git commit -m "Add approved brokerage and market photography"
```

### Task 3: Strengthen Markets Seller Distribution Positioning

**Files:**
- Modify: `src/pages/MarketsPage.tsx`

**Interfaces:**
- Consumes: `ASSOCIATION_STATS`, `CONTACT`, `/images/urg-weston-office.webp`, and the existing `/videos/miami_madrid_transition.mp4`.
- Produces: a seller-led Markets page with verified distribution proof and a private listing-distribution CTA.

- [ ] **Step 1: Capture the failing page scan**

Run:

```powershell
rg -n '21 South Florida offices|75\+ countries|one of Florida.s largest|Direct access across every market' src/pages/MarketsPage.tsx
```

Expected: unsupported or non-authoritative claims are present.

- [ ] **Step 2: Update metadata, FAQ, hero, and distribution panel**

Identify Miami Global Listing Desk as the international activation mechanism. Replace categorical access language with eligible distribution language subject to brokerage, platform, MLS, legal, and compliance requirements.

Render the verified institutional proof in this order:

```ts
[
  { value: "93,000", label: "Member agents" },
  { value: "200+", label: "Global portals" },
  { value: "260+", label: "U.S. MLSs" },
  { value: "437+", label: "International agreements" },
  { value: "19", label: "Languages" },
  { value: "11", label: "MLS data exchanges" },
  { value: "$69B", label: "2025 association-network volume" },
]
```

Remove `75+ countries`, `21 offices`, and independent-brokerage superlatives from visible copy and FAQ schema.

- [ ] **Step 3: Add authentic brokerage proof**

Replace the video-only URG presentation with a responsive media-and-copy composition that includes:

```tsx
<img
  src="/images/urg-weston-office.webp"
  alt="United Realty Group office interior in Weston, Florida"
  width={1440}
  height={1080}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover object-center"
/>
```

Keep the existing authentic United Realty Group YouTube video available as a secondary, lazy-loaded element only if the section remains balanced on mobile.

- [ ] **Step 4: Clarify Spain execution and seller CTA**

State that Carlos operates as the Florida licensed principal of record where applicable, while affiliated local Spanish agencies handle local buyer qualification, showings, and negotiation. End with `Request a Private Listing-Distribution Review` and explain that the review covers fit, positioning, and the applicable activation path.

- [ ] **Step 5: Run the page compliance scan**

Run:

```powershell
rg -n 'Miami Global Listing Desk|260\+|11|\$69B|urg-weston-office|Private Listing-Distribution Review' src/pages/MarketsPage.tsx
rg -n '21 South Florida offices|75\+ countries|one of Florida.s largest|Direct access across every market' src/pages/MarketsPage.tsx
```

Expected: approved terms are present and the second command returns no matches.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/MarketsPage.tsx
git commit -m "Strengthen Markets distribution positioning"
```

### Task 4: Refine Buyers Institutional Proof

**Files:**
- Modify: `src/pages/BuyersPage.tsx`

**Interfaces:**
- Consumes: `CONTACT`, verified association figures, and `/images/carlos-miami-river.webp`.
- Produces: a buyer-first page with compliant brokerage scale and clear Spain referral boundaries.

- [ ] **Step 1: Capture the failing claim scan**

Run:

```powershell
rg -n '#1 transactional|one of Florida.s largest|One of every five|52%|60\+ international banks|1,400\+' src/pages/BuyersPage.tsx
```

Expected: unsupported or out-of-scope claims are present.

- [ ] **Step 2: Replace unsupported proof with verified infrastructure**

Keep the hero buyer-focused. Replace the unsupported market and brokerage claims with a concise explanation that Carlos works through United Realty Group's 3,500+ agents and 20 Florida offices and participates in the professional South Florida real estate ecosystem.

- [ ] **Step 3: Add Carlos market-presence photography**

Insert a stable landscape figure beside the local execution narrative:

```tsx
<img
  src="/images/carlos-miami-river.webp"
  alt="Carlos Uzcategui at a Miami waterfront property"
  width={1920}
  height={1080}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover object-[center_42%]"
/>
```

Use nearby copy to connect local presence to property review, buyer-agent coordination, and bilingual execution without implying a guaranteed inventory outcome.

- [ ] **Step 4: Preserve buyer CTA and clarify Spain referral service**

Keep `Request a Buyer Consultation` as the primary action. State plainly that Carlos is licensed in Florida and that Spain purchases are handled through introductions and cooperating local professionals, not direct Spanish brokerage by Carlos.

- [ ] **Step 5: Run the passing claim scan**

Run:

```powershell
rg -n '3,500\+|20 Florida offices|carlos-miami-river|Request a Buyer Consultation|referral-based' src/pages/BuyersPage.tsx
rg -n '#1 transactional|one of Florida.s largest|One of every five|52%|60\+ international banks|1,400\+' src/pages/BuyersPage.tsx
```

Expected: verified positioning is present and the second command returns no matches.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/BuyersPage.tsx
git commit -m "Refine Buyers institutional proof"
```

### Task 5: Add Global Desk Property-Presentation Proof

**Files:**
- Modify: `src/pages/GlobalDeskPage.tsx`

**Interfaces:**
- Consumes: `/images/carlos-property-media-team.webp` and existing bilingual copy objects.
- Produces: one responsive proof panel after the operating-structure section without changing the hero.

- [ ] **Step 1: Confirm the proof asset is absent**

Run:

```powershell
rg -n 'carlos-property-media-team' src/pages/GlobalDeskPage.tsx
```

Expected: no matches.

- [ ] **Step 2: Add bilingual proof-panel labels**

Add Spanish and English eyebrow, title, body, and caption copy to the existing language object. The body explains that qualified inventory is prepared for professional presentation to South Florida buyer agents; the caption identifies Carlos with a property media team and does not identify the other people as United Realty Group agents.

- [ ] **Step 3: Insert the responsive figure**

Place the figure immediately after `The structure, stated plainly`:

```tsx
<img
  src="/images/carlos-property-media-team.webp"
  alt={t.proofAlt}
  width={1920}
  height={1080}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover object-center"
/>
```

Use a full-width section band with a constrained inner grid, not a card nested inside another card. Preserve the existing brand typography and CTA hierarchy.

- [ ] **Step 4: Verify bilingual and compliance copy**

Run:

```powershell
rg -n 'carlos-property-media-team|buyer-agent|equipo de medios|Florida Licensed Realtor' src/pages/GlobalDeskPage.tsx
```

Expected: the proof panel and established compliance line are present.

- [ ] **Step 5: Commit**

```powershell
git add src/pages/GlobalDeskPage.tsx
git commit -m "Add Global Desk presentation proof"
```

### Task 6: Verify, Review, and Publish

**Files:**
- Verify all files changed in Tasks 1-5.

**Interfaces:**
- Consumes: completed implementation and project scripts.
- Produces: validated production build, responsive review evidence, and the published Netlify release.

- [ ] **Step 1: Run static checks**

Run:

```powershell
pnpm run lint
pnpm run build
```

Expected: TypeScript passes and the Vite/prerender build completes.

- [ ] **Step 2: Run scoped compliance scans**

Scan the three pages, constants, and figures for `21 offices`, Drive URLs, unsupported superlatives, guarantee wording, and figures outside the approved set. Review each result in context; legitimate disclaimer uses of `guarantee` remain allowed.

- [ ] **Step 3: Run responsive and console review**

Start the Vite server and inspect `/markets`, `/buy`, and `/global-desk` at approximately 390x844 and 1440x900. Confirm stable images, deliberate crops, no overlap or horizontal scrolling, working CTAs, reduced-motion poster behavior for existing video, and no browser console errors.

- [ ] **Step 4: Review the final diff**

Run:

```powershell
git status --short
git diff HEAD~5 -- src/constants.ts src/data/figures.json public/images src/pages/MarketsPage.tsx src/pages/BuyersPage.tsx src/pages/GlobalDeskPage.tsx
```

Expected: only approved copy, media, data, and page-layout changes.

- [ ] **Step 5: Publish and verify production**

Push the reviewed commits to the repository's production branch. Confirm the corresponding Netlify production deploy is ready, then verify the three live URLs and their image assets on `https://homesprofessional.com`.
