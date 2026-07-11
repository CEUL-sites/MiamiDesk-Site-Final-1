# Task 3 Report: English-First Miami Global Listing Desk

## Completion

- Commit: `57fd9b23f78d27dbd10a6cf5aa7e7535f2e54742` (`Make Miami Global Listing Desk English first`)
- Scope: Task 3 only. No media or city pages changed.

## Files Changed

- `src/pages/GlobalDeskPage.tsx`
  - Changed the initial language state to English while preserving the explicit `gd-lang` local-storage choice.
  - Put English before Spanish in the language control while retaining `aria-pressed` state for each option.
  - Strengthened the English hero for international owners, developers, and listing agents; it now names the Miami-area buyer-agent discovery and professional-cooperation outcome, Carlos Uzcategui and United Realty Group as the operator, and property-eligibility constraints.
  - Rephrased two service descriptions to avoid any misleading interpretation that the service operates an MLS.
- `src/components/GlobalDeskTeaser.tsx`
  - Updated the destination-language comment to English-first.
- `scripts/verify-global-desk-language.mjs`
  - Added the required static language-contract assertions.

`src/components/forms/GlobalDeskListingForm.tsx` was reviewed and left unchanged because it receives the parent `lang` prop directly.

## Verification

RED:

```powershell
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts\verify-global-desk-language.mjs
```

Outcome: failed as intended on `useState<Lang>("en")` while the page still defaulted to Spanish.

GREEN:

```powershell
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts\verify-global-desk-language.mjs
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\typescript\bin\tsc --noEmit
rg -n -i "own.*MLS|operate.*MLS|official endorsement|guaranteed placement|guaranteed leads|guaranteed buyers|guaranteed commissions|guaranteed sales" src\pages\GlobalDeskPage.tsx src\components\GlobalDeskTeaser.tsx
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe' diff --check
```

Outcomes:

- `global desk language contract verified`
- TypeScript exited `0`.
- Compliance scan returned no prohibited implication.
- `git diff --check` exited `0`.

Rendered QA:

- `/global-desk` rendered with an English document language, English selected, the revised English heading, and the private-introduction CTA at desktop width.
- The EN/ES toggle changed both document language and visible hero copy in each direction.
- At 390px wide, the page rendered the English hero with `scrollWidth` equal to `clientWidth` (no horizontal overflow).

## Self-Review

- Confirmed only Task 3 product files and the required verification script were committed.
- Confirmed no media, city page, or listing-form modification was included.
- Confirmed the English hero states the required audience, outcome, operator, and constraints without MLS ownership, endorsement, or outcome guarantees.

## Concerns

- The existing unresolved cookie notice obscures part of the mobile hero, and the existing mobile sticky CTA occupies the same first-viewport region. This is outside Task 3's allowed files and belongs to the broader homepage/mobile collision work.
- Local browser logs include an existing failed fetch from `https://r2.leadsy.ai/tag.js`; this is an external analytics-tag issue, not introduced by this change.

## Review Fix Round 1

- Removed the unsupported legacy `62%` / `€2.5M` market claim and replaced it with qualitative, compliant market-and-buyer positioning using the South Florida professional real estate ecosystem and buyer-agent activation framing.
- Made Global Desk Open Graph title, description, and locale follow the active EN/ES language state.
- Updated `HtmlLang` so `/global-desk` is owned by the page-level language metadata instead of receiving a route-level `en_US` locale while Spanish is active.
- Removed the page-local Global Desk `Service` JSON-LD so the sitewide canonical service schema in `src/components/SEO/SchemaOrg.tsx` remains the only Global Desk service schema.

Verification after fix:

```powershell
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts\verify-global-desk-language.mjs
& 'C:\Users\carlo\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' node_modules\typescript\bin\tsc --noEmit
rg -n -i "62%|2\.5M|€2|own.*MLS|operate.*MLS|official endorsement|guaranteed placement|guaranteed leads|guaranteed buyers|guaranteed commissions|guaranteed sales|founded 2002|in-house title" src\pages\GlobalDeskPage.tsx src\components\GlobalDeskTeaser.tsx src\components\SEO\HtmlLang.tsx src\components\Proof.tsx src\components\Testimonials.tsx
```

Outcomes:

- `global desk language contract verified`
- TypeScript exited `0`
- Scoped prohibited-copy scan returned no matches
