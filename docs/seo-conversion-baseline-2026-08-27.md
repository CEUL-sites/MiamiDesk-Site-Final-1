# Existing-content SEO and conversion baseline — 2026-08-27

## Evidence and limits

- Production pages were inspected on `https://homesprofessional.com` before implementation.
- Google Analytics property `Homesprofessional.com` was available for July 30–August 26, 2026. The property reported 329 views, 113 active users, 1m25s average engagement per active user, 10 `form_start` events from 7 users, and no visible custom journal CTA or completed-lead event in the standard Events report.
- The homepage recorded 146 views, 91 active users, and 26s average engagement per active user in that interval.
- The current Global Desk title recorded 13 views, 5 active users, 2.60 views per user, and 2m27s average engagement per active user.
- Searches for the four exact article title concepts returned zero views in the same Analytics interval. This is a zero in the available report, not proof that the URLs have never received traffic.
- Google Search Console rejected access to the `sc-domain:homesprofessional.com` property for the authenticated account. Organic clicks, impressions, queries, CTR, ranking, landing-page overlap, and query-level cannibalization therefore remain unavailable.
- No real production form was submitted during validation.

## Page baseline and assigned job

| Page | Audience and primary search question | Baseline title / H1 | Baseline conversion state | Assigned primary outcome |
| --- | --- | --- | --- | --- |
| `/` | South Florida owner asking who can position and distribute the property | `South Florida Listing Strategist \| Carlos Uzcategui` / `Sell With the Reach of the World's Largest Local Realtor® Association.` | Address-first valuation form plus review, WhatsApp, distribution, Global Desk, market, and other paths | Request a private property review; WhatsApp remains secondary |
| `/journal/seller-positioning-south-florida-2026-august` | South Florida owner asking how to position before pricing | `Selling in South Florida: Positioning Before Price` / `Selling a South Florida Property in 2026: Positioning Before Price` | Generic strategy-review CTA repeated above, within, and below the article | Request a Private Property Position Analysis |
| `/journal/seller-closing-costs-south-florida-2026` | Owner asking what a South Florida sale costs and what they may keep | `What Does It Cost to Sell a Home in South Florida` / full net-proceeds H1 | Generic strategy-review CTA; net-sheet download and generic review link competed with it | Request a Seller Net Proceeds Review |
| `/journal/hoa-impact-home-sale-south-florida-2026` | HOA/condo owner asking how association risk affects price and saleability | `HOA Financials and Your Home's Sale Price` / full South Florida seller H1 | Generic strategy-review CTA with no HOA-specific offer | Request a Pre-Listing HOA Risk Review |
| `/journal/south-florida-may-2026-market-report-home-sellers` | Miami-Dade or Broward owner asking what the latest broad South Florida report means for one property | `South Florida May 2026 Market Report` / full inventory-tightening H1 | Home-value review, generic strategy review, net-sheet, contact, and repeated generic article CTAs | Request a Current-Market Property Position Review |
| `/global-desk` | Agent, agency, developer, or authorized professional with a qualified international mandate | `Miami Global Desk — International Listings for South Florida` / `Position International Property for South Florida’s 93,000-Member Real Estate Network.` | `Present a Qualified Listing`, email partnership CTA, two WhatsApp lines, and full intake | Request International Property Activation; private WhatsApp introduction is secondary |

## Technical baseline

- All six URLs returned indexable production pages without a `noindex` directive.
- Canonicals pointed to the non-trailing-slash production URLs.
- Every inspected page rendered exactly one H1 after client hydration.
- Journal pages rendered `Article` and `BreadcrumbList`; three of the four also rendered `FAQPage` where visible FAQs exist. Sitewide `WebSite`, `Organization`, `RealEstateAgent`, `LocalBusiness`, and `Service` nodes were present.
- Global Desk rendered `BreadcrumbList` and visible-content-backed `FAQPage`, plus the sitewide entities.
- Homepage and Global Desk had English/Spanish alternates. Journal articles currently route Spanish language selection to `/es`; no article-level Spanish equivalent exists, so article-level reciprocal `hreflang` was not added.
- All scoped journal URLs are present in `public/sitemap.xml` and the prerender include list. `robots.txt` allows public pages and declares the sitemap.
- Internal entry paths include the seller hub research library, journal index, related-article cards, navigation, author block, and market/city seller pages. Outbound paths include the seller hub, home-value path, Global Desk, relevant city pages, author page, and related Journal research.

## Cannibalization review

The repository contains one South Florida positioning article and ten similarly structured city or property-type `Positioning Before Price` articles. Their slugs and H1s encode different locations, and each city article routes to its matching seller page where one exists. The South Florida article is the regional parent and now focuses on the cross-county decision framework and network distribution.

No redirect, deletion, or canonical consolidation is justified without Search Console query/landing-page evidence. The current action is to preserve all pages, keep location-specific conversion routes, strengthen the regional parent’s distinct purpose, and obtain Search Console access before deciding whether any pair competes for the same query set.

## Implementation measurement contract

- Contextual Journal buttons continue into the existing `seller-intake` form.
- Each CTA sends `journal_origin`, `journal_offer`, `journal_cta`, and conventional UTM values.
- The existing `sourcePage` field records the sanitized article, offer, and CTA location through step-one capture and the completed intake.
- `journal_cta_click` now records `offer_topic` and `offer_name` in addition to the existing slug, category, market, funnel stage, and CTA location.
- Global Desk primary and secondary buttons emit `global_desk_cta_click` with activation/introduction type, location, and language.
- Netlify form names, field names, honeypots, acknowledgements, notifications, and submission endpoints remain unchanged.
