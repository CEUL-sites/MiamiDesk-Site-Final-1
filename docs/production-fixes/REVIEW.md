# HomesProfessional production fixes — review

Date: October 14, 2026 (Europe/Madrid)
Base: 99d85657926075d4aa3091d5d6fdb934e193e5a9
Branch: fix/production-conversion-search-20261014

## Scope and implementation

1. **Campaign evidence:** Selected Mandate Execution uses Strategy → Execution → Verified Outcome for 815 NW 126th Ct, Miami and 5542 NW 190th Ln, Miami Gardens. Public MLS histories support $670,000 closed April 3, 2026 (A11917748) and $610,000 closed September 21, 2026 (A12045304). The Miami Gardens campaign asking price was $624,900; its published August 23 open-house promotion is linked separately. No attendance, lead counts, marketing causation or performance guarantee is invented. The homepage replaces its illustrative property image with the existing Carlos/Miami River photograph. The broken brokerage YouTube player uses the existing local URG headquarters image.
2. **Rendered routes:** Preserve React/Vite/react-snap. Generate route coverage from the actual router and published journal index before building: 175 rendered routes, 171 indexable sitemap URLs. Preserve existing canonical URLs and hreflang blocks, exclude thank-you pages from the sitemap, add permanent `/sell-in-*` aliases to existing city routes. Generated `_redirects` retains existing redirects, rewrites known routes to static HTML before the requested SPA fallback, and keeps unknown journal and asset paths at 404. The requested general SPA fallback may still return HTTP 200 for other unknown paths; the client NotFound route sets noindex. The postbuild gate fails on missing HTML, duplicate title, missing description, wrong canonical, sitemap omissions or missing compliance notices.
3. **Lead capture:** One visible homepage seller form, two steps: property address/market → name/phone/timeline, with optional email and existing messaging consent. Other seller-strategy and valuation CTAs point to `#list-here`; buyer and Global Desk navigation remain available. Keep Netlify discovery forms, registered field names, attribution, notification functions and CRM routing. Hide the honeypot with HTML hidden, aria-hidden, inline display:none and tabindex=-1; remove its instruction text. Geographic contact routing uses the US number for Florida properties even when the page is Spanish. Spain contact appears on Global Desk and Spain-facing routes/articles only.
4. **Distribution:** Shared six-card grid on home and EN/ES Global Desk, using figures.json: 93,000 members (May 2026), 200+ portals/19 languages, 260+ US MLSs through RPR/11 data exchanges, 437+ international agreements, 3,500+ URG agents/19 Florida office locations, $69 billion combined association volume in 2025. Attribution explicitly separates association volume from Carlos and URG production. Office count includes Pembroke Pines marked opening soon. Eligibility and no-guarantee statements remain visible.
5. **Market evidence:** Q3 2026 has not been substituted: the official Q2 reports schedule the next quarterly release for October 16, 2026. Correct Q2 values from all six county city PDFs, synchronize the full market-data table (123 segments), display actual periods, link card sources and add one-line seller strategy advice. County August 2026 records remain unchanged. Q3 figures require the actual released reports.

## Official market sources reviewed

Base URL: https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2026/07/
- City_Miami-Dade-County_Single-Family-Homes_2026-Q2_Local-Residential-Market-Metrics.pdf
- City_Miami-Dade-County_Townhouses-and-Condos_2026-Q2_Local-Residential-Market-Metrics.pdf
- City_Broward-County_Single-Family-Homes_2026-Q2_Local-Residential-Market-Metrics.pdf
- City_Broward-County_Townhouses-and-Condos_2026-Q2_Local-Residential-Market-Metrics.pdf
- City_Palm-Beach-County_Single-Family-Homes_2026-Q2_Local-Residential-Market-Metrics.pdf
- City_Palm-Beach-County_Townhouses-and-Condos_2026-Q2_Local-Residential-Market-Metrics.pdf

## Release boundaries

The changes are prepared locally; this review artifact does not itself grant push, merge or production deployment approval. Carlos's project release gate requires explicit approval of the concrete tested changes before pushing/deploying. Global Desk pricing is unchanged. After approval: recheck the main branch for concurrent changes, push the reviewed branch, run GitHub checks, promote production, verify public route metadata and forms, and submit the deployed sitemap through authorized Search Console access. Search Console submission has not occurred; no Search Console connector is available in this session. Neither sitemap publication nor prerendering guarantees Google indexing.

## Validation

Final validation results are recorded in VALIDATION.md after the clean build and browser checks finish. External integrations are intercepted during local browser QA; live Netlify submission/email/HubSpot delivery must be verified after release. No test inquiry has been sent to production.
