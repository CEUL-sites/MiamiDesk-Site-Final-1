# Miami Global Listing Desk Conversion Design

## Objective

Publish a tightly scoped conversion improvement to the existing Miami Global Listing Desk while preserving the navy/gold visual system, verified figures, brokerage identity, and public compliance language.

## Approved approach

Use the existing single-page experience as the visual baseline and improve five connected parts of the same conversion funnel:

1. Lead with verified distribution infrastructure and buyer-agent activation, without implying MLS ownership, official endorsement, guaranteed placement, buyers, leads, commissions, or sales.
2. Let visitors identify as a property owner, licensed agency/agent, or developer before entering the intake form.
3. Reduce the first-contact form to information needed for a private review; request images and supporting documents only after qualification.
4. Add verified operating proof based only on Carlos's license, experience, CLHMS credential, United Realty Group scale, and the approved association-network figures.
5. Make Spanish and English Global Desk experiences indexable and measurable, with route-aware controls and conversion events.

## Experience design

- `/global-desk` remains the Spanish and x-default URL.
- `/global-desk/en` is the English URL.
- The language control uses real links so each version has a stable canonical URL.
- The hero uses the preferred name “Miami Global Listing Desk” and compliant distribution/buyer-agent-activation wording.
- Three audience cards set the initial submitter type, emit `global_desk_audience_select`, and move the visitor to the request form.
- A proof block presents only verified credentials and network scale; it does not present invented case studies or outcome claims.
- The request form keeps role, engagement path, contact details, jurisdiction, property location, price/value, property count, optional property URL, and a short description. It removes required uploads and detailed technical property fields from the first step.
- The mobile sticky CTA receives the active language, hides while the hero CTA or form is visible, and stays hidden while the cookie dialog is unresolved.
- The cookie dialog is Spanish on `/global-desk` and English on `/global-desk/en`.

## Components and data flow

- `GlobalDeskPage` owns the route language and selected audience.
- `GlobalDeskListingForm` accepts `initialSubmitterType` and initializes its role selection from that value.
- `MobileStickyCTA` accepts an optional language and primary target while preserving default behavior on all other routes.
- Existing `pushEvent`, `trackFunnelEvent`, `trackContact`, and `trackLead` functions remain the analytics boundary.
- Netlify continues to receive the existing form name; `index.html` adds the new `propertyUrl` field to its static declaration.

## Error handling

- The current abort timeout, response status validation, WhatsApp/email fallback copy, direct notification, acknowledgment email, and lead tracking remain.
- No image validation is performed at first contact because uploads move to the post-qualification step.
- Required authorization and private-terms consent remain mandatory.

## Accessibility and responsive behavior

- Preserve semantic headings, fieldsets, labels, and the existing skip link.
- Audience choices are real links with descriptive text.
- Language links expose the active page with `aria-current="page"`.
- Sticky controls never obscure the guarded hero CTA or the form.
- Desktop and 390px mobile views must render without horizontal overflow or header overlap.

## Verification

The release is accepted only when source assertions, the live Spanish and English routes, audience selection, form preselection, mobile sticky behavior, language navigation, page metadata, console state, and desktop/mobile screenshots are verified after deployment.
