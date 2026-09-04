# Sellers opening — September 4, 2026

User-approved copy: “Sell With the Reach of the World’s Largest Local REALTOR® Association.”

Subtitle: “Put your home where trusted buyer agents search for their clients. I combine professional MLS exposure with targeted agent outreach and 25 years of South Florida experience to position your property for local and international buyers.”

Scope: improve the Sellers opening while retaining the existing page the user likes. All downstream distribution, video, seller process, media, testimonials, advisor, calculator, pathfinder, FAQ, neighborhood links, journal links and intake components remain. No homepage changes. Production publication requires separate approval.

## Visual specification

Reference: concept.png, generated with the built-in image tool at 1536 × 1024. The concept defines the opening and authority strip only; the rest of the page retains its existing design.

- Solid navy editorial hero split, approximately 47% text and 53% image.
- Existing Playfair Display headline, Raleway body, real URG branding and navigation.
- Navy #06111f (existing site token), white #fff, accent #c6ab73.
- 52px desktop side padding, 24px mobile padding; clear heading/body/action/reassurance hierarchy.
- Gold rectangular action, ArrowRight outline icon, underlined WhatsApp link.
- Full-color property image, no tint or overlay; stable image dimensions and high fetch priority.
- Open white three-column authority strip, stacked on mobile. Exact compliance line beneath.
- Existing pricing/buyer/net-proceeds benefits and downloadable net sheet move into a slim white continuation beneath the authority strip.

## Intentional adaptations

Keep the real existing navigation/logo, rather than the generated approximation. Keep site fonts and exact navy for visual continuity. Do not add the generated globe logo. The user explicitly asked to preserve existing material: the original hero's concrete review benefits and net-sheet link remain in the continuation. Existing distribution figures remain in the Reach Advantage section instead of duplicating a numerical bar inside the new hero. Existing video components farther down remain unchanged; only the opening's decorative background video is replaced with the generated architectural image. Mobile uses a readable stacked composition with the primary action before the image. The new hero's click events use existing consent-aware analytics. Desktop sticky CTA stays on #contact.

## Generated image brief

Built-in image generation creates a photorealistic contemporary South Florida waterfront residence with glass, white stone, warm wood, palm trees, pool and intracoastal setting in natural late-afternoon light. Recreate the photographic area of concept.png as an independent asset, with no text, logo, people, address or listing claim. The asset is illustrative architecture, identified in its alt text, not a claimed listing or completed transaction.

## Validation

Completed in Browser/IAB at 1536 × 1024 (concept native dimensions), 1280 × 900 and 390 × 844. Screenshots: desktop.png and mobile.png. The original concept and desktop/mobile captures were inspected with view_image. No external lead was submitted.

| Comparison | Result / intentional adaptation |
| --- | --- |
| Approved heading and subtitle | Exact text preserved; gold portion starts on its own line. |
| Composition | Navy text panel / full-color photo / caption / open white authority strip match concept hierarchy. |
| Typography | Existing Playfair Display and Raleway retained intentionally; five-line desktop heading, readable mobile stack. |
| Palette | Site navy retained with white authority strip and muted gold; no photo tint. |
| Image | User explicitly requested the agent holding a folder and showing a couple the home after viewing the original concept. Generated scene updated accordingly; all three visible on desktop and mobile. |
| Navigation | Real URG logo and existing navigation retained; Sellers-only container correction resolves clipped rightmost CTA at desktop widths. |
| Actions | Primary review action reaches #contact; existing form begins below fixed navigation; sticky action hides at form. WhatsApp keeps existing destination. Net-sheet link retained. |
| Responsive | No document overflow at checked widths; 56px mobile primary button. Existing sticky CTA guard now protects image and authority content. |

Above-the-fold copy comparison: approved title and subtitle match exactly. Added authority/action/reassurance text is specified in the concept; existing benefit/download content was retained below the authority strip at the user's request. No unsolicited hero kicker or invented numerical claims.

TypeScript check and Vite production compilation passed. Full react-snap prerender and hosted deploy checks are separate from the local compilation. Existing dependency lock inconsistencies prevented npm ci; local dependencies refreshed with npm install --package-lock=false without changing package manifests or lockfiles. Existing video playback fallback in the downstream SellerSection is unchanged and outside this opening update.

Fidelity review: opening faithfully follows the generated concept with the documented real-brand/site-font and user-requested showing-image adaptations. Material fixes completed: heading gold-line separation, desktop navigation fit, mobile sticky-image/authority protection. No unresolved new-layout mismatch identified.
