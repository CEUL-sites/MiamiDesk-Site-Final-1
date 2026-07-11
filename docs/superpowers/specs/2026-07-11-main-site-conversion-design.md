# Main-Site Conversion Design

**Date:** 2026-07-11
**Status:** Approved design direction
**Scope:** Homepage, Miami Global Listing Desk, shared review presentation, and shared navigation/CTA behavior. City pages are excluded.

## Objective

Improve the highest-traffic main-site experience so international property sellers and South Florida owners understand Carlos Uzcategui's professional distribution advantage, see credible client proof, and reach a specific seller conversation faster.

The release must preserve the current HomesProfessional.com visual identity while strengthening information hierarchy, authentic imagery, interaction quality, mobile usability, and conversion clarity.

## Audience And Conversion Priority

Primary audiences:

1. International property owners, developers, and listing agents seeking professional exposure to Miami-area buyer agents.
2. South Florida property owners evaluating seller representation.
3. Spain and LATAM professional partners evaluating a compliant referral or cooperation framework.

Primary conversion:

- Request a private listing-distribution or seller-strategy review with Carlos.

Secondary conversions:

- Start a WhatsApp conversation with Carlos.
- Review the Miami Global Listing Desk structure in English or Spanish.
- Verify Carlos's client experience through attributable reviews.

## Design Direction

Use a controlled editorial experience rather than decorative animation. Motion should support reading and discovery, not compete with the seller proposition.

The review presentation will use a curated spotlight carousel. One review remains fully readable while adjacent reviews provide visual evidence of depth. Automatic advancement is slow, pauses during interaction, supports swipe and explicit controls, and respects reduced-motion preferences.

The Global Desk will combine South Florida professional imagery with authentic Spain imagery to communicate an international bridge. Images must show real places, properties, or professional activity and must not imply an official association endorsement.

## Homepage

### Hero Hierarchy

- Preserve the existing brand treatment and hero media unless visual review identifies a concrete rendering problem.
- Keep the main seller value proposition dominant.
- Reduce competing proof elements or overlays that weaken the headline and primary CTA.
- Place one concise client-proof signal near the decision path without showing a total review count.
- Keep a specific seller CTA and WhatsApp path visible without creating overlapping mobile controls.

### Review Spotlight

Replace the continuous all-review marquee on the homepage with a shared `ReviewSpotlight` component.

Required behavior:

- Display one complete review and two adjacent preview states on desktop.
- Display one review at a time on mobile.
- Use previous and next icon buttons with accessible labels and tooltips.
- Support touch/swipe navigation when the existing interaction stack allows it without adding a heavy dependency.
- Advance automatically at a calm interval only when the section is visible.
- Pause on hover, focus, pointer interaction, or browser-tab inactivity.
- Disable automatic movement when `prefers-reduced-motion` is enabled.
- Maintain a stable component height across review changes.
- Do not display the total number of reviews.
- Do not truncate the active review so aggressively that its persuasive detail is lost.

Review data continues to come exclusively from `src/data/reviews.ts`. Verified attribution and the individual-results disclaimer remain visible. Review text must not be rewritten.

### Compact Proof Placement

Add a restrained review-proof treatment near the homepage seller CTA or immediately after the primary seller argument. It may rotate short excerpts from multiple reviews but must not duplicate the full spotlight or obscure the hero.

## Miami Global Listing Desk

### Language Behavior

- `/global-desk` defaults to English for first-time and returning visitors unless the visitor explicitly selected Spanish.
- The visible `EN | ES` control remains available near the page identity.
- An explicit visitor language choice may persist locally.
- The dedicated Spanish alternate route remains available and correctly referenced in metadata.
- English metadata, social metadata, structured content, and first render must match the English default.

### Positioning

The opening message must identify the service as an international property distribution and buyer-agent activation service for selected inventory entering the South Florida professional real estate ecosystem.

The page must be clear that:

- Carlos does not own or operate an MLS.
- MIAMI REALTORS does not officially endorse the service.
- Exposure, placement, leads, buyers, commissions, or sales are not guaranteed.
- Brokerage, platform, property-eligibility, cooperation, and compliance requirements apply.
- Local representation in Spain or another jurisdiction may be preserved through appropriate professional relationships.

The primary CTA should request a private international property activation or listing-distribution review. WhatsApp remains secondary.

### International Image Narrative

Use a concise editorial sequence rather than a gallery:

1. South Florida professional execution or brokerage setting.
2. Authentic Spain property, city, coastline, or professional-market context.
3. A visual bridge or transition that connects the inventory source market to Miami-area buyer-agent discovery.

Image requirements:

- Source approved media from Carlos's Google Drive.
- Record source filename and Drive identifier in `public/images/README.md`.
- Optimize to WebP or an existing supported web format.
- Provide intrinsic dimensions, responsive sizing, meaningful alt text, and lazy loading below the fold.
- Avoid AI-generated people presented as real team members.
- Avoid stock-like atmospheric images that do not show an inspectable place, property, or professional activity.
- If suitable new Spain files are not available, retain existing approved imagery and do not publish placeholders.

## Shared Navigation And CTAs

- Keep the current navigation structure unless an item is broken or creates a clear mobile usability problem.
- Ensure Global Desk naming is consistently `Miami Global Listing Desk` where the full service name is needed.
- Prevent sticky CTA, cookie notice, WhatsApp control, and navigation layers from overlapping important content on mobile.
- Use one visually dominant CTA per section.
- Preserve working contact details for email, USA WhatsApp, and Spain WhatsApp.

## Accessibility And Responsiveness

- All interactive review controls must be keyboard accessible.
- Focus indicators must remain visible against the dark brand palette.
- Motion must respect `prefers-reduced-motion`.
- Review text, CTAs, and language controls must fit at 390px width without clipping or horizontal scrolling.
- Fixed and sticky elements must not cover form controls or primary CTAs.
- Images must maintain intentional crops across mobile and desktop breakpoints.
- Text contrast must meet the existing site's accessible color treatment.

## Technical Boundaries

- Reuse React, TypeScript, Tailwind, Motion, and existing component patterns already present in the repository.
- Do not add a carousel dependency unless the existing stack cannot provide accessible controls and swipe behavior cleanly.
- Keep reviews sourced from `src/data/reviews.ts` and retain schema generation from the same source.
- Keep language copy within the existing Global Desk translation structure unless extracting a focused helper clearly reduces complexity.
- Do not refactor unrelated pages or global architecture.
- Do not modify city pages.

## Verification

Before publication:

- Run full TypeScript checking and the production build.
- Run the project's available lint checks without modifying dependency manifests.
- Review homepage and Global Desk at desktop and 390px mobile viewports.
- Verify keyboard controls, reduced-motion behavior, automatic pause behavior, and swipe behavior where implemented.
- Confirm no horizontal overflow or incoherent overlay collisions.
- Confirm selected images load at natural dimensions with meaningful alt text.
- Review console errors and distinguish existing third-party failures from release regressions.
- Scan public copy for prohibited ownership, endorsement, and guarantee implications.
- Confirm city-page files are absent from the release diff.

## Success Criteria

The release is complete when:

1. Global Desk presents English on first render and provides a clear Spanish option.
2. International sellers can identify the service, intended audience, professional framework, and next step within the first viewport.
3. The homepage review experience shows multiple credible reviews without a total count and without weakening the seller proposition.
4. Review motion feels controlled, remains accessible, and does not destabilize layout.
5. Authentic approved Spain and South Florida media strengthens international reach where suitable Drive assets are available.
6. Desktop and mobile layouts pass visual, interaction, console, type, and build checks.
7. No city pages or unrelated website areas are modified.
