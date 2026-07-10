# Markets and Buyers Media Upgrade Design

## Objective

Extend the approved Miami Global Listing Desk positioning into the Markets and Buyers experiences while adding authentic United Realty Group, Carlos Uzcategui, South Florida, and Spain-facing media. The work must strengthen the seller distribution argument, preserve the buyer journey, improve mobile media behavior, and remain limited to the relevant pages and shared media helpers.

## Direction

Use a balanced, proof-led treatment. Photography establishes brokerage and market credibility; motion supports the Miami-Spain connection where it adds information or atmosphere. The site will not become a gallery, and no private Google Drive URL will be used as a production asset.

The selected Drive assets are:

- `URG office Weston.jpg`: primary brokerage proof image. The interior clearly displays the United Realty Group identity and supports the existing 3,500+ agent and 20 Florida office narrative.
- `CEUmiamiriver.jpg`: primary South Florida authority image. Carlos is shown in a recognizable Miami waterfront setting.
- `takingpics.jpg`: optional secondary proof image showing Carlos working with a property media team. Use only where the crop and caption support property presentation without implying that the people shown are United Realty Group agents.
- `Miami Madrid transicion.mp4`: cross-market motion candidate. Use only after confirming that the existing local `miami_madrid_transition.mp4` is equivalent or after optimizing the Drive file for local delivery.

The existing United Realty Group team video remains in place unless a verified, authentic local replacement is identified. The Drive file named `modern reach team.mp4` will not be described as an actual United Realty Group team video without evidence establishing that fact.

## Page Architecture

### Markets

The Markets page becomes the strongest seller-facing expression of the distribution thesis outside the Global Desk page.

1. Keep the hero concise and identify Miami Global Listing Desk as the international activation mechanism.
2. Present the institutional distribution argument in this order:
   - 93,000 association members
   - 200+ global portals
   - 19 languages
   - 260+ U.S. MLSs
   - 437+ international agreements
   - 11 MLS data exchanges
   - $69B in combined 2025 transaction volume, attributed to the applicable network rather than Carlos or United Realty Group
3. Explain what changes for a seller: eligible property information can be prepared, positioned, and introduced through professional buyer-agent and referral channels, subject to brokerage, platform, MLS, legal, and compliance requirements.
4. Use the United Realty Group office image beside the brokerage execution narrative.
5. Use Spain-facing motion or imagery in the existing Madrid/Spain media panel, preserving a clear distinction between Carlos's Florida representation and local Spanish agency work.
6. End with a specific seller action: request a private listing-distribution review covering property fit, positioning, and the applicable activation path.

### Buyers

The Buyers page remains a buyer journey rather than becoming a second seller page.

1. Add a concise proof line connecting buyers to the same professional South Florida ecosystem.
2. Remove unsupported brokerage superlatives and replace them with verified United Realty Group scale: 3,500+ agents and 20 Florida offices.
3. Use the Carlos Miami River image to reinforce local market presence without interrupting the property-search flow.
4. Explain that Spain service is referral-based and distinct from Florida buyer representation.
5. Keep the primary calls to action buyer-specific.

### Global Desk

The existing conversion-focused hero remains media-free. Add at most one proof panel after the plain-language operating-structure section if the final layout benefits from it. The panel may use the United Realty Group office image or Carlos's Miami River image, but it must not duplicate the same image immediately used on Markets or Buyers.

## Copy and Compliance

All public-facing additions include or remain near the established compliance line:

`Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.`

Copy must not imply that Carlos owns or operates an MLS, that MIAMI REALTORS® officially endorses the service, or that placement, leads, buyers, commissions, offers, or sales are guaranteed.

Use `Miami Global Listing Desk` as the service name. Preferred vocabulary includes `professional South Florida real estate ecosystem`, `buyer-agent activation`, `selected international inventory`, and `subject to brokerage, platform, and compliance requirements`.

Only these network figures may be introduced or refreshed in this pass: 93,000 members, 200+ global portals, 19 languages, 260+ U.S. MLSs, 437+ international agreements, 11 MLS data exchanges, $69B 2025 volume, 3,500+ United Realty Group agents, and 20 United Realty Group Florida offices.

Any remaining `21 offices` reference on an edited surface must be corrected to `20`. Unsupported claims such as `Florida's #1 transactional brokerage` must be removed from the affected pages.

## Media Delivery

Approved Drive files will be copied into the repository and served locally. Production code will not hotlink Google Drive.

- Convert selected photographs to WebP where practical, with responsive source sizing and an approximately 1600-1920 pixel maximum width.
- Keep meaningful images below roughly 300 KB where visual quality permits.
- Deliver video as MP4/H.264 with fast-start metadata, muted inline playback, a 6-12 second loop where appropriate, and a target below 2-3 MB.
- Provide a same-composition poster for every video.
- Use the existing `LazyVideo` behavior for data-saver, reduced-motion, and viewport-aware loading.
- Define stable aspect ratios and deliberate object positions so mobile crops retain the relevant subject and branding.
- Use descriptive alt text for meaningful photography and empty alt text only for decorative media.

## Responsive Behavior

The brokerage and Carlos proof images use stable 16:9 or editorial landscape frames on desktop and mobile. The Spain media panel may use a taller 4:5 treatment at desktop sizes but must collapse to a bounded mobile frame without pushing the associated explanation below an excessive media block.

No media element may cause layout shift, overlap navigation, hide a call to action, or introduce horizontal scrolling. Reduced-motion and data-saver visitors must receive a useful poster rather than an empty color panel.

## Metadata and Structured Data

Update page metadata only where visible positioning changes make the existing description inaccurate. Keep the Global Desk service schema aligned with the approved service name and compliance language. Do not add organization relationships or endorsement claims that are not already verified.

## Verification

Before publishing:

- Run TypeScript type checking, lint if configured, and the production build.
- Scan changed files for unsupported claims, `21 offices`, guarantee language, broken Drive links, and unapproved figures.
- Review Markets, Buyers, and Global Desk at desktop and mobile widths.
- Confirm media posters, lazy loading, reduced-motion behavior, link destinations, and absence of console errors.
- Check the production diff so unrelated pages and global components remain unchanged.
- Publish only after the local verification passes, then verify the deployed pages and assets on `homesprofessional.com`.

## Success Criteria

The Markets page clearly explains why Carlos's distribution structure matters to a seller. The Buyers page communicates institutional reach without losing its buyer focus. Authentic media makes United Realty Group, Carlos, Florida, and the Spain connection visible without weakening speed, compliance, or conversion clarity.
