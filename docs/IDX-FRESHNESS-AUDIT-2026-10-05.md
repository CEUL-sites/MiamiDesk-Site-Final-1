# HomesProfessional.com IDX freshness audit — October 5, 2026

## Release decision

**DO NOT MERGE — account-specific and deployed integration verification remains.**

This branch repairs confirmed freshness defects and records unresolved required listing attribution. It is not a certification of the entire MLS license. Production was not changed. Before merging, obtain the executed Bridge/SEFMLS dataset agreement, verify display permissions and internet/address suppression in the actual feed, validate the deployed V2 Blob integration and protected diagnostics, and confirm the independent NEO provider's obligations. The public production market-feed endpoint returned HTTP 500 during the audit; its underlying Blob contents and logs were unavailable through the connected read API.

## Authoritative requirement

The [official SEFMLS Rules and Regulations](https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2020/04/mls-rules-and-regulations.pdf), labeled last updated August 21, 2025, establish:

- **30.5.4:** persistent and transient IDX downloads must receive updates and status changes at least every 12 hours.
- **30.6.5:** IDX downloads and displays supplied by those downloads must refresh at least every 12 hours. Dynamic requests are not exempt.
- **30.6.12:** identify the listing firm and email or phone supplied by the listing Participant prominently, at least the median listing-data font size.
- **30.6.3:** honor listing/internet/address display restrictions.
- **30.7.8 and 30.7.10:** applicable consumer-use restrictions and reliable-but-not-guaranteed disclosure.

[NAR IDX policy 7.58](https://www.nar.realtor/handbook-on-multiple-listing-policy/advertising-print-and-electronic-section-1-internet-data-exchange-idx-policy-policy-statement-7-58) corroborates the 12-hour standard. No different freshness interval for active, pending, sold, price, status or media metadata, or mandatory retrieval timestamp disclosure, was found in the inspected rules. Sold/public-record and display eligibility rules still apply. Historical period-labeled statistics are distinguished from current inventory; they must not be represented as current listings.

[Bridge official API documentation](https://bridgedataoutput.com/docs/platform/API/bridge) describes default limits of 5,000 requests/hour and a 334/minute burst, with rate-limit response headers. These are general documentation limits, not verified account entitlements. The signed license, account-specific rate limit, upstream MLS-to-Bridge delay and media rights were not accessible. [RESO Web API](https://www.reso.org/reso-web-api/) defines query/replication standards, not a replacement for the MLS agreement.

## Existing pathways and compliance gap

All property requests use server-side Bridge bearer authentication and the configured OData Property endpoint. Browser responses contain listing data, never the bearer token. In-memory caches are per function instance, not a shared replication store.

| Public MLS feature | Data source → server → cache → frontend | Previous refresh method / maximum age | Finding | Branch change |
|---|---|---|---|---|
| Weston $850K–$1.2M inventory on `/listings` | Bridge Property Active Residential top 12 → refresh-market-feed → site-wide market-feed Blob, weston-sfr-850k-1200k → market-feed → PropertyMarketFeed | Weekly; normal age up to 7 days + 1h HTTP cache; indefinite after failures | Actual live inventory, not a market-analysis snapshot; exceeds 12h | Pull every 6h, successful-refresh timestamp, 11h server cutoff and bounded HTTP TTL |
| Search, listing details | Bridge Property Active/Pending top 24/page → listings-search → 30m instance cache + 30m HTTP cache → ListingsBrowser | On cache miss; healthy endpoint age about 1h; no expired fallback | Endpoint freshness acceptable; previously open tabs retained cards indefinitely | Preserve API/cache design; browser refresh every 30m while visible and clear on wake/failure; no build-time listing snapshot |
| City sample listings, 16 English seller pages | Same listings-search pathway → CityListingsSample, up to 6 cards | Same endpoint age; previously unbounded browser retention | Same as search | Same browser safeguards; existing filters/URLs preserved |
| MLS ticker `/buy`, `/listings` | Bridge top 100 → ticker-listings → 30m instance cache + 5m HTTP TTL and 15m stale-while-revalidate → MLSTicker top 6 | Healthy worst endpoint age about 50m; no expired fallback | Not weekly. Incorrectly treated unchanged listings older than 24h as stale despite a new successful pull | Measure retrieval freshness using fetchedAt, preserve record ModificationTimestamp, browser safeguards |
| Legacy city listing endpoint, no current React consumer | Bridge Property top 50 → bridge-listings → 1h instance cache + 1h HTTP TTL → external/legacy consumers | About 2h under healthy cache chaining; failed expired pull errors | Does not inherit weekly schedule | Keep short cache; remove raw upstream error-body exposure |
| Legacy current city statistics endpoint, no current React consumer | Bridge Active/count → city-stats → city-stats Blob, city:<lowercase city> + 1h HTTP TTL | 24h + 1h normally; indefinite fallback on failure | Public endpoint can return over-age current MLS aggregates | Cache target 6h; fallback only under 11h; bounded headers; unavailable beyond cutoff |
| AI desk listing examples | Bridge Active and sometimes Pending → _shared/bridgeMlsForAi → ai-desk → conversation | Fresh per-turn lookup, 1–2 requests; no server inventory cache | Independent from weekly feed; transcript is historical conversation. Listing attribution in generated prose needs separate verification | No lead-routing or model changes; record as release gate |
| Private lead context / seller nurture | Bridge → _shared/leadMarketContext → private emails | 24h instance cache | Private aggregate context, not public IDX inventory | Unchanged; seller-nurture remains daily |
| Market pages, journal, neighborhood stats | Period-labeled official reports → src/data/cityMarketStats.ts and editorial content → React/prerender | Historical Q2 2026 and dated reports | Not live inventory; no Bridge cache dependency | Unchanged |
| NEO new-construction iframe | Third-party New Estate Only assets → embedded provider UI | Provider-managed, unverified | Independent from Bridge; license/freshness cannot be inferred | Provider verification required |

The production Netlify deploy was `6ac272f0b076ff0009861856`, matching main commit `a715badd1df5f3731b3dff9de669c0828dcfa7f3`; its schedules were weekly market refresh and daily seller nurture. Production reads on October 5 returned: search Weston 200 / 24 rows / total 526; ticker 200 / 6 rows / live true; legacy Weston endpoint 200 / 50 rows / total 526; city-stats 200; market-feed 500. Successful direct endpoints included current retrieval timestamps. Blob age, actual runtime environment-variable values/scopes, account license and logs could not be inspected. Do not infer that a successful direct endpoint proves the Blob feed is healthy.

## Remediated standard

**Bridge → scheduled pull at 00:00, 06:00, 12:00, 18:00 UTC → production Netlify Blob → bounded public read → periodically refreshed browser.**

`netlify.toml` uses `schedule = "0 */6 * * *"`, verified against [current official scheduled-function documentation](https://docs.netlify.com/build/functions/scheduled-functions/). Scheduled functions run only on published production deploys; authenticated Netlify dashboard **Run now** is the manual trigger. A public HTTP POST is not a supported manual scheduled-function trigger.

The existing direct Bridge pathways remain direct. Full MLS replication would add licensing, deletion tracking, pagination, storage and migration risks; short existing query caches already meet the endpoint budget without that expansion.

### Age and failure safeguards

- Store `lastSuccessfulRefresh` at the start of each successful request, retain legacy `lastUpdated` for compatibility. Missing, invalid or future timestamps fail closed.
- Server cutoff is **11 hours**, leaving one hour before the MLS maximum. Public feed responses return zero listings and no-store beyond the cutoff, but do not delete the last successful stored dataset.
- Fresh read HTTP TTL is at most one hour, shortened to the remaining 11h budget, with must-revalidate. Expired/unavailable responses are not cached.
- Bridge requests for the changed Blob writers time out after 15 seconds. A malformed success response is a failure, not a valid empty inventory. A valid `value: []` is a successful empty feed.
- Scheduled failures log sanitized metadata and write a separate `:health` marker. They preserve inventory. A health-marker failure does not erase a successfully stored feed.
- City-stat failure fallback is allowed only while the successful snapshot is younger than 11h. Afterward the endpoint returns unavailable, not indefinitely stale aggregates.
- MLS React consumers refresh every 30m while visible and clear old cards before reload. Returning from a hidden/sleeping tab or page restoration clears and revalidates; failed/over-age responses remove inventory and selected details. The extra browser interval keeps the modeled display budget below 12h even near the server cutoff; suspended devices revalidate when returning to view.
- ReactSnap/headless prerendering skips live inventory requests, preventing listing cards and their dynamic ItemList JSON-LD from becoming permanent build artifacts. Marketing content/routes remain prerendered.
- Attribution gap remains: 30.6.12 requires the **listing Participant's** supplied contact, not this site's general contact. Search sample cards omit the listing office, ticker attribution is small, and queries do not select a verified listing-participant attribution contact field. Obtain the dataset's authorized field mapping, then implement and verify it before release. Do not substitute Carlos's contact or invent a broker contact. AI-generated listing examples require the same review.
- Production uses the strongly consistent site-wide store. Deploy previews/branch deploys use strongly consistent deploy-specific stores via `context.deploy.context`, preventing tests/previews from overwriting production inventory. No production token value was read or changed.

The schedule is not itself an alerting service. Health checks and log review must be operated; no external recurring monitor was provisioned in this branch.

## Operations

### Manual refresh

1. In Netlify, open the **published production** deploy's Functions → refresh-market-feed → **Run now**.
2. Check logs for success with blobKey, count and lastUpdated; investigate generic refresh failures using restricted Netlify logs and Bridge account tools.
3. Read market-feed and verify lastSuccessfulRefresh, ageMs, count and stale=false. Validate the Weston inventory against an authorized Bridge query.
4. For a preview, schedules do not run: use a local test/preview fixture or isolated deploy-store seed. Do not seed production from a preview.

### Protected health

`GET /.netlify/functions/mls-feed-health`, authenticated with `x-refresh-secret` from existing server-side `MARKET_FEED_REFRESH_SECRET`. Never paste the value in tickets, client code, URLs or documentation. Missing/unset/wrong secret denies access. It reports successful timestamp, age, count, threshold and last attempt outcome; includes neither listing payload nor credentials. Over-age/missing data returns 503. No-store always.

Check shortly after each six-hour run. Alert on failed lastAttempt, no successful timestamp, or age approaching **7h**; escalate before **11h**. Public fail-closed behavior protects inventory when monitoring is missed, at the cost of temporarily hiding cards. City-stat health is visible through its public available/stale/timestamp fields and restricted function logs.

### Environment-variable names

- `BRIDGE_API_TOKEN`: server-only bearer credential.
- `BRIDGE_DATASET_ID`, `BRIDGE_DATASET`: dataset aliases; scheduled feed prefers ID then DATASET, default miamire. Existing endpoints have different alias handling; verify account configuration resolves all to the same authorized dataset before release.
- `BRIDGE_BASE_URL`: optional complete OData Property URL override.
- `MARKET_FEED_REFRESH_SECRET`: existing protected diagnostic credential; no longer a public scheduled-function POST trigger.
- Netlify runtime/site Blob credentials are platform-managed; V2 function Context initializes storage. Do not add runtime secrets to Vite configuration.

No environment-variable values are documented. Confirm server/function scope and production context in Netlify before deploying. Seller nurture variables and behavior were not changed.

## Cost model

| Operation | Before | After | Increment, normalized 30-day month |
|---|---:|---:|---:|
| Scheduled Bridge requests, one Weston configuration | ~4.3/month | 120/month | ~116/month; 4/day total |
| Scheduled function invocations | ~4.3/month | 120/month | ~116/month |
| Successful feed/health Blob writes | ~4.3/month | 240/month | ~236/month |
| Public market-feed Blob reads | One/request | One/request | Traffic dependent; unchanged per read |
| Protected diagnostic Blob reads | None | Two/check | Monitoring dependent |
| Legacy city-stat Bridge pulls | ~1/day/city if used | Up to ~4/day/city if continuously used | ~90/month/used city; no current frontend consumer |
| Search/ticker/legacy direct Bridge cache misses | Traffic/cold-start dependent | Same cache TTLs | Browser polling can add cache misses; not globally bounded |

Polling adds at most two endpoint requests per extra visible hour per mounted feature, plus page wake/filter actions. `/listings` mounts three MLS consumers, roughly six requests/extra visible hour; a seller sample or `/buy` ticker adds roughly two. HTTP/instance caching reduces Bridge calls, but actual traffic, cold starts and Bridge account metrics are needed for a bill estimate.

At illustrative 1GB allocation and 5 seconds/run, the extra schedule is ~0.16 GB-hours/month; at 30 seconds/run ~0.97 GB-hours. [Current Netlify credit pricing](https://www.netlify.com/pricing/) is 10 credits/GB-hour, 2 credits/10,000 requests and 20 credits/GB egress. Incremental schedule compute is approximately 1.6–9.7 credits/month. If the account uses that pricing and has allowance, incremental bill is **$0**; otherwise actual plan and overage apply. The connected team reports Pro, but billing/legacy-plan details were unavailable. A 50KB feed adds ~5.8MB/month of upstream Bridge transfer from these extra pulls; visitor bandwidth remains traffic/payload dependent. Listing photos remain provider URLs, not copied to Blobs. No additional site builds are scheduled.

## Verification and remaining release checks

Local verification: TypeScript lint, all 12 repository verification scripts, 35 unit tests, 5 native lead-email regression tests, production Vite build, all 178 ReactSnap routes, and bundling all 14 Netlify Functions. Four changed functions use Netlify V2 runtime API; legacy functions stay unchanged. Frontend secret sentinel scan checks that a server-only token is not bundled. Desktop/mobile fixture checks cover public listing, ticker and city rendering, empty results, stale responses and failure behavior. Run `npm run lint`, `npm test`, `npm run verify`, `node --test scripts/ensure-native-lead-email.test.mjs`, `npm run build`, and `IDX_TEST_BROWSER=/path/to/current/chromium npm run verify:idx-rendering`. The browser test uses only local fixtures and blocks external requests; Chromium 153 was used locally. Run `netlify functions:build` separately to verify function packaging. See PR for final command results.

Before promoting the PR:

1. Obtain the executed dataset agreement and any newer MLS notices; resolve any stricter cadence, attribution, media or display requirements.
2. Validate InternetEntireListingDisplayYN/InternetAddressDisplayYN behavior with authorized feed/account tests; direct endpoints currently rely on feed entitlement filtering, which has not been proven. Confirm brokerage attribution completeness, listing-participant contact mapping and participant eligibility; review AI-generated examples and NEO separately.
3. Verify production-scoped environment names without disclosing values; confirm dataset/base URL consistency, Bridge rate headers and upstream latency.
4. Deploy an isolated preview, exercise the actual V2 Blob API using an isolated fixture store, verify protected health authorization and expiry, function errors, redirects and mobile output. Scheduled production execution cannot be demonstrated locally.
5. Only after these gates pass: merge, verify production schedule registration, run production refresh once through Netlify, inspect health and public results, then monitor the first scheduled runs. Roll back the deploy if required; never reactivate indefinite stale inventory as a fallback.
