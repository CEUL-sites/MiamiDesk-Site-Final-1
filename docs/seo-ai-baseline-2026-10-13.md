# HomesProfessional.com: SEO, AI search and seller conversion

Checked October 13, 2026. Local fixes and verification completed; Carlos approved push and publication after reviewing the package. CI and production verification must confirm the release before it is reported live.

## Decision

Release the focused trust and crawlability fixes first. The site can already be read by search systems. The next commercial opportunity is to make existing seller and valuation content more useful and more frequently cited, then measure received and qualified inquiries. Google requires standard SEO and indexable content for its AI features, not special AI files or special schema: [Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Authoritative state and access

- Repository: [CEUL-sites/MiamiDesk-Site-Final-1](https://github.com/CEUL-sites/MiamiDesk-Site-Final-1). Clean isolated clone in this workspace; base main revision `086d5f1b9f8878ef50a02e47d7ce19fe727867bc`.
- Netlify project `miamidesk`, site ID `b85e7947-5d72-4bc2-ab4c-82caad1477fb`. Published deployment `6acd4b021f47b3395f6633c0`, ready, same revision, published October 12 at 17:04 America/New_York.
- GitHub connector and public response checks confirm current source and deployment. The October 9 proposal was reviewed for continuity; its title, FAQ and AI-digest corrections are already in production, so it is not reapplied.
- Search Console is accessible with `contact@carlosre.com`; `liquidationbrokers@gmail.com` lacks property access. No ownership or access settings were changed.
- Google Analytics navigation reached a property URL, but the report did not load reliably. No current GA4 or qualified-lead totals are claimed. Search Console clicks and AI impressions are not received inquiries or mandates.
- Canva search located the approved October 12 HomesProfessional visual reference, design `DAHXy-tcf3Q`. This remains a reference for a future sharing-card correction.

## Observed search baseline

Source: authenticated [Search Console performance](https://search.google.com/u/1/search-console/performance/search-analytics?resource_id=sc-domain%3Ahomesprofessional.com), Web, July 12–October 11, 2026, three-month selection. Report displayed last update about 9.5 hours before inspection.

| Metric | Observed value | Meaning |
| --- | --- | --- |
| Google search clicks | 36 | Visits from search results; not qualified inquiries |
| Google search impressions | 2.54K displayed | Rounded presentation, not an exact exported count |
| Average CTR | 1.4% | Aggregate across displayed search exposure |
| Average position | 43.2 | Aggregate report metric; not the rank of every page or query |
| Google generative AI impressions | 54 | Separate beta report, same date range; no AI click or lead count shown |

The [AI report](https://search.google.com/u/1/search-console/performance/search-analytics/ai?resource_id=sc-domain%3Ahomesprofessional.com) lists 25 page URL variants. Its first rows include Global Desk 13 impressions, Agents 7, homepage 5, Spain MLS 4, Spanish homepage 3 and home-value 2. Do not add these to ordinary search totals without checking report definitions. This is Google evidence only; it does not measure ChatGPT, Perplexity or Claude recommendations.

Visible query examples: “bilingual real estate agents” 192 impressions; “miami property advisor for latin american buyers” 87; “south florida property advisor for international buyers” 70; “south florida luxury home valuation” 27. Each displayed zero clicks. These are observed queries, not search-volume estimates. The first table slice is dominated by bilingual/buyer intent; it is not a complete seller-demand analysis.

Page indexing, last updated October 8: 205 indexed and 185 excluded. Exclusions comprise 117 redirects, 30 alternate URLs with proper canonicals, 2 noindex URLs, 28 discovered-not-indexed and 8 crawled-not-indexed. Redirects and properly canonicalized duplicates are often expected. The last two groups need page-level investigation, not wholesale deletion.

Crawled-not-indexed examples include HOA seller guidance, seller closing costs, Doral selling guidance, Miami Beach condo guidance and `/buy/`. Some crawl dates predate recent fixes. Both slash variants of a guide can appear in the report. Indexing exclusions are not proof of a live server error.

Search Console showed no mobile or desktop Core Web Vitals field data. No lab performance score or speed gain is claimed.

## Live technical and journey baseline

Saved public response evidence is in the parent workspace's `audit-evidence/live-baseline.json` and response files. Eighteen requests covered twelve key page routes, both seller slash variants, robots, sitemap, AI digests and two unknown paths.

- Homepage, seller hub, Weston, valuation, contact, About, Markets, Global Desk and Spanish entry routes returned 200. Each selected normal HTML page had one H1, one canonical and readable prerendered content.
- English/Spanish home, seller and Global Desk pairs have alternate-language links. Do not invent Spanish equivalents for pages without translations.
- Live robots and sitemap returned 200. Robots explicitly allows OAI-SearchBot. [OpenAI distinguishes search crawling from training crawling](https://developers.openai.com/api/docs/bots); this patch changes no crawler permissions.
- FAQ answers on the selected seller and valuation pages already share a data source with JSON-LD. The final verification additionally checks that answers exist in body HTML.
- Corrupted characters and professional titles were present in seller, Weston, valuation, AI digests and sitewide schema. This is a current response finding, not just an old source issue.
- `/journal/seo-audit-missing-post` returned an empty 200 shell; a non-journal missing URL returned a proper 404. A URL that returns 200 is not necessarily a valid article.
- The Weston housing-assistance guide is published and included for prerendering but missing from the sitemap.
- Seller and valuation inquiries retain progressive forms, existing field contracts, consent, attribution and notification handlers. A functioning CTA and browser validation do not prove receipt by email, Netlify or HubSpot.

## Five strongest opportunities

| Rank | Opportunity and evidence | Business value | Status / effort |
| --- | --- | --- | --- |
| 1 | Correct damaged text, mismatching intake review wording and inconsistent entity references. Confirmed in current code and live response HTML. | Protect seller trust and give search systems a coherent professional identity. | Prepared locally; low effort. |
| 2 | Correct unknown-journal 200 responses and sitemap coverage; investigate the 36 discovered/crawled exclusions. | Improve access to useful seller guidance without creating false article URLs. | Routing/sitemap fix and build safeguard prepared; indexing review remains. |
| 3 | Improve existing seller-intent answers and evidence, starting with valuation and HOA/closing-cost guides. Seller valuation query has impressions but no displayed clicks; Global Desk leads AI exposure. | Connect owner questions to a property-specific strategy review. | Next editorial priority; moderate effort. Preserve ranking URLs. |
| 4 | Reconcile public distribution claims and sharing-card language. The current OG card says “93,000-Agent MLS Network”; membership is a different definition. URG office figures conflict with the brief. | Keep visible branding, machine-readable facts and seller arguments consistent. | Follow the claims register; obtain approval for corrected copy and graphics. |
| 5 | Establish inquiry-to-mandate measurement and complete current GA4 review. Current search reports do not establish lead receipt or quality. | Prioritize content by qualified seller conversations and signed mandates. | Measurement/access work remains; no invented conversion baseline. |

The current Markets title emphasizes Global Desk while its H1 emphasizes South Florida market strategy. A later focused metadata correction should align title, summary and page purpose. Repeated journal topic/city coverage should be reviewed using query evidence before consolidating pages. Do not create more similar location pages merely to expand keywords.

## Prepared changes

1. Repair replacement/control characters, Spanish `español` and registered professional titles in the affected public copy, structured data and existing AI digests.
2. Remove a nonfunctional Markets SearchAction. Use URG's official website in Organization schema and remove the brokerage directory from Carlos's sameAs profile list.
3. Distinguish the author Person (`#person`) from the existing RealEstateAgent business (`#agent`); retain article authorship, license and brokerage. Weston uses the existing agent identity. Remove an AggregateRating on the Person node; business review markup remains.
4. Remove the intake quote whose wording differs from its attributed stored review. No form field or submission code is altered.
5. Add the published housing-assistance article to the sitemap using its actual September 28 content date.
6. Render NotFoundPage for unknown client-side journal slugs and remove the journal-wide 200 rewrite. Existing articles are served from their prerendered files.
7. Add `verify:search` after CI build. It fails if any public journal post lacks sitemap, prerender configuration or output coverage. It also checks key-page encoding, metadata, JSON-LD identity, body FAQ parity and unknown-journal routing.

## Verification and limits

- TypeScript and all 26 existing tests passed after the final content changes.
- Existing `npm run verify` passed its journal, homepage, review, Global Desk, tracking, lead, claims, interaction, mobile and URG checks.
- Vite production compilation passed. Standard local postbuild cannot launch its obsolete bundled Chromium because that executable is absent. Local prerender uses the same react-snap package with installed Chrome, an explicit local executable override and a reduced concurrency; production configuration is unchanged.
- Final rendered HTML verification and final screenshot review are recorded in the completion note below.
- Desktop valuation at 1280px and mobile key pages at 390px showed one H1 and no horizontal overflow. Seller CTA reaches `#contact`; valuation CTA reaches `#valuation-form`. Empty valuation request focuses the required address and displays “Please fill out this field.” No lead was submitted.
- Spanish seller route retains `lang=es`. A missing client-side journal slug displays NotFoundPage and noindex rather than navigating to the journal index. Vite preview does not apply Netlify HTTP routing; production/hosted-preview 404 status needs verification after release.
- Local preview has no production function runtime, downloaded production videos or domain-authorized vendor integrations. External resource failures during prerender are not evidence of production outages.
- Google Search Console access was read-only. No indexing requests, sitemap submission, account changes, CRM write or recurring task was created.

### Completion evidence

Final local prerender completed all 175 configured routes with exit code 0. Motion cleanup ran successfully. `verify:search` passed for 10 key pages and all 122 journal routes, including FAQ answers in body HTML. Final valuation HTML contains the corrected copy and no mismatching intake quotation. TypeScript, the 26-test suite, the existing verification suite and diff whitespace checks passed.

Desktop and mobile screenshots are saved in `../../audit-evidence/screenshots/`. The desktop image shows the corrected valuation hero; the mobile image shows its 390px layout. Additional mobile checks covered homepage, Weston, About, Spanish seller and a missing journal slug. All had one H1 and no horizontal overflow; the missing journal slug had noindex and NotFoundPage. The homepage priority tabs respond to ArrowRight and select “My next move.” Browser validation was checked without sending a lead. Full keyboard journeys, accepted submissions, downstream receipts and a hosted Netlify routing check remain release-verification items.

## Practical 30-day roadmap

- Days 1–7: release the approved fix package, verify live page metadata, journal 404s and preserved article URLs, and run an identified receipt test through the existing form destinations. Record a fresh indexing baseline; inspect priority excluded seller guides individually.
- Days 8–14: strengthen valuation and two seller guides with distinct answers, dated primary evidence and a precise property-strategy CTA. Align Markets metadata with its page purpose. Review Spanish seller terminology separately.
- Days 15–21: reconcile office/distribution claims and replace inaccurate sharing-card language using the approved Canva direction. Prepare one documented seller case with permission and evidence; do not infer financial outcomes from a review.
- Days 22–30: compare matched-period query/page impressions, ordinary clicks and Google AI exposure with this baseline. Reconcile actual received inquiries, qualified seller opportunities and consultations from authoritative records. Retain a longer observation window for mandates; no improvement is guaranteed.

Optional monitoring software such as [SearchFit.ai](https://searchfit.ai) can help organize recurring checks, but the verified Google account baseline is already available. No subscription is needed for this prepared patch.

## Release path and rollback

Carlos's [AGENTS.md, section 13](../../AGENTS.md) requires explicit approval before push, merge or deployment. The reviewed workflow builds pull requests and can deploy production on a main-branch push; direct Netlify deployments are also consequential releases.

Preferred path: approved branch push → PR → CI build and search verification → approved merge → deployment to `miamidesk` → verify published revision and public seller journeys. Include a hosted-preview check if one is provisioned. This audit does not authorize release by itself.

Recovery: if a published change breaks lead or routing behavior, revert the reviewed Git change and deploy the corrective revision through the normal release path. A failed deployment leaves the previous published site in place. Verify seller and valuation receipt again. Do not change production credentials or commercial terms.

Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.
