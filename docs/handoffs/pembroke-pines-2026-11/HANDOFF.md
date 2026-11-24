# START HERE — Pembroke Pines market report (branch `handoff/pembroke-pines-2026-11`)

All assets are already in this branch at their final paths. Nothing to download or unzip:

| File | Path in repo |
|---|---|
| EN video (43 s, music) | `public/videos/pembroke-pines-market-report-2026-11-en.mp4` |
| ES video (43 s, music) | `public/videos/pembroke-pines-market-report-2026-11-es.mp4` |
| Posters | `public/images/reports/pembroke-pines-2026-11-poster-en.jpg`, `-poster-es.jpg` |
| 3D chart (Blender) | `public/images/reports/pembroke-pines-2026-11-bars3d.webp` |
| Share card | `public/images/reports/pembroke-pines-2026-11-og.jpg` |
| Data (every figure + source) | `src/data/pembrokePinesReport.ts` |
| Approved design + EN/ES copy | `docs/handoffs/pembroke-pines-2026-11/pembroke-pines-report-reference.html` (open in a browser) |
| This spec | `docs/handoffs/pembroke-pines-2026-11/HANDOFF.md` |

Repo facts already confirmed:
- The page exists: `src/pages/SellPembrokePinesPage.tsx`, route `/sell-pembroke-pines` (`/sell-in-pembroke-pines` redirects there). Add the report section directly under its hero; do not create a new route.
- The precedent to mirror: `src/components/WestonMarketReport.tsx` + `src/data/westonReport.ts`, used in `src/pages/SellWestonPage.tsx`. Weston assets follow the same naming in `public/videos/` and `public/images/reports/`.
- Use the site's Tailwind tokens (navy `#0B1E3F`, gold `#B08D57`, ivory `#F9F7F2`) and existing components. The reference HTML shows content, order and interactions, not the final styling.
- Follow `CLAUDE.md`: compliance rules, verified figures, `npm run lint` + `npm run verify`, compliance-reviewer, deploy-gate preview only.

Work on a new branch `feat/pembroke-pines-market-report` created from this branch.

---

# Handoff — Pembroke Pines 4-bed market report on the "Sell in Pembroke Pines" landing page

**For:** the homesprofessional.com website project agent (Claude Code, repo with `CLAUDE.md` / `.claude/agents/`)
**From:** Creative Video Director project · prepared Nov 24, 2026
**Owner / approver:** Carlos Uzcategui
**Precedent:** this is the same job already shipped for Weston (`feat/weston-market-report`): `src/components/WestonMarketReport.tsx`, `src/data/westonReport.ts`, the section on `src/pages/SellWestonPage.tsx`, videos in `public/videos/`, images in `public/images/reports/`. Mirror it.

---

## 1. Goal

Add the November 2026 Pembroke Pines 4-bedroom market report as a section on the Pembroke Pines seller landing page, directly under the hero, exactly as the Weston report sits on `/sell-weston`. The section exists to start a seller conversation: every CTA routes to the existing `SellerIntakeForm` (`#contact`).

## 2. Files in this bundle → where they go

| Bundle path | Repo destination | Notes |
|---|---|---|
| `public/videos/pembroke-pines-market-report-2026-11-en.mp4` | same | 43.0 s, 1080×1920, H.264 + AAC 128k (**has music**), faststart, 3.1 MB |
| `public/videos/pembroke-pines-market-report-2026-11-es.mp4` | same | Spanish cut, same music, 3.2 MB |
| `public/images/reports/pembroke-pines-2026-11-poster-en.jpg` / `-es.jpg` | same | 720×1280 posters (opening frame, +60.1%) |
| `public/images/reports/pembroke-pines-2026-11-bars3d.webp` | same | Blender 3D closed-sales chart, 1400×860 |
| `public/images/reports/pembroke-pines-2026-11-og.jpg` | same | 1200×630 OG/Twitter card |
| `src/data/pembrokePinesReport.ts` | same | **Single source of truth for every figure.** Do not retype numbers into components. |
| `reference/pembroke-pines-report-reference.html` | `docs/handoffs/pembroke-pines-2026-11/` (already there) | Approved visual/content reference (standalone page). Use it for section order, copy and EN/ES strings. |

## 3. Page and route

1. Check whether a Pembroke Pines seller page exists (search routes, `src/pages/`, the sitemap; expected slug `/sell-pembroke-pines`).
   - **Exists:** add the report section under its hero.
   - **Does not exist:** create it from `SellWestonPage.tsx` as the template (route, per-route metadata, schema, hero, `SellerIntakeForm`), swap Weston content for Pembroke Pines, add the route to the router and sitemap. Keep the hero copy short and factual; send Carlos the hero copy for approval in the preview.
2. Component: reuse the Weston report component. If `WestonMarketReport.tsx` is hard-wired to Weston data, the smallest acceptable change is either a `PembrokePinesMarketReport.tsx` that mirrors it, or a light prop/data parameterization if that is trivial. Do not build a general report framework beyond that.

## 4. Section content (in order)

Copy and strings are in the reference HTML (`const L={en:…,es:…}`); figures come from `pembrokePinesReport.ts`.

1. **Video**: EN with an Español toggle. Click-to-play **with sound** (`controls`, `preload="none"`, `playsInline`, poster per language). Do **not** autoplay; if any autoplay preview is used, it must be `muted`. 43-second runtime → "The 43-second briefing" if the Weston pattern labels it.
2. **Headline + KPIs**: ▲ +60.1% (median sale price, $460,000 in 2020 → $736,500 in 2026 YTD); tiles: $736,500 median · $326.09 median $/sq ft · 324 closed sales · 27 median days on market · 98% median sale-to-list (all 2026 YTD).
3. **Interactive chart**: tabs for median price, price/sq ft, closed sales, days on market, indexed 2020 = 100 (160.1 vs 160.2). Year selector + readout. Plus a crawlable HTML year table (as on Weston).
4. **3D chart**: `pembroke-pines-2026-11-bars3d.webp` + stats: 522 closed in 2021 (peak) · 348 in 2025, −33.3% · median DOM 9 → 35 (2021 → 2025). Caption notes it was rendered in Blender; `*2026` = year to date.
5. **List price became a ceiling** (new vs Weston): stacked above/at/below-list bars per year (`years[].salesAboveList/AtList/BelowList`). Stats: 50% sold above list in 2021 (263 of 522) · 11% in 2025 (38 of 347) · 66% of 2026 sales closed below their final list price (214 of 324).
6. **By subdivision** (new vs Weston): table from `subdivisions[]` (15 rows): name, sales 2020–26, median 2020 (n), median latest (year, n), change. Keep the explanatory note about n ≥ 5 and "a guide, not a valuation".
7. **Closing read**: "In 2026, Pembroke Pines buyers paid a median $736,500, and two of three sales closed below list. Pricing and distribution decide which side of list a home lands on." (ES in reference.)
8. **Network**: 93,000 Miami and South Florida REALTORS® members · 200+ global portals · 19 languages · 260+ U.S. MLSs (via RPR). Use the heading wording already approved on the Weston page.
9. **CTA**: route to the existing `SellerIntakeForm` (`#contact`), as on Weston. Do not add a new form or a new lead path.
10. **Source line on every data block**: `pembrokePinesReport.source.en/.es`.

**Pending, do not build yet:** "Pembroke Pines right now" (active listings vs. closed, months of inventory by price band). `active` is `null` in the data file. Carlos will supply the Active exports; a follow-up handoff will add the data. Do not leave an empty placeholder on the page.

## 5. SEO

- Per-route title/description (EN/ES if the page is bilingual), canonical, OG/Twitter image → `pembroke-pines-2026-11-og.jpg`.
- JSON-LD: `VideoObject` (name, description, `thumbnailUrl` poster, `contentUrl`, `uploadDate` 2026-11-24, `duration` `PT43S`, `inLanguage`) for both language files, and `Dataset` (temporalCoverage `2020-01-01/2026-11-23`, spatialCoverage Pembroke Pines, FL, publisher `#agent`). Same structure as Weston (Weston used `publisher`, not `creator`, after review).
- Sitemap: add/update the page with `lastmod` 2026-11-24.

## 6. Compliance — run `compliance-reviewer` on page copy AND on the burned-in video text

Hard rules (from `CLAUDE.md`): verified figures only; no $69B in any form; no forecasts, price guarantees or time promises; banned words (dream, passionate, best agent, world-class, amazing, incredible, stunning, rare gem); no exclamation marks; "Sales Associate", never broker; compliance footer `Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.`; no street addresses or MLS numbers anywhere.

**Two items to decide, not fix silently:**
1. **Burned-in network heading.** The videos show "Listed through United Realty Group. / Distribution determines price." On Weston the reviewer changed that page heading to "Distribution shapes price." Use the approved Weston wording in **page copy**. The video text cannot be edited by the website agent. If the reviewer rejects it for the video, stop and report to Carlos (it is his standing brand line, and the video can be re-rendered in the video project). Do not crop, cover or re-encode around it.
2. **Music licensing.** Carlos added the music track. Before production, confirm with Carlos that the track is licensed for website use (editor-library music is often licensed for in-app/social use only). If not confirmed, ship with the audio stripped (`ffmpeg -i in.mp4 -c:v copy -an out.mp4`) and keep click-to-play.

Full burned-in video text (EN; ES is a direct translation), for the reviewer:
- Open: "4-BEDROOM HOMES · MIAMI MLS / Pembroke Pines / 4-bed single-family · closed sales / +60.1% / median sold price, 2020 → 2026 YTD / $460,000 → $736,500"
- Price line: "Median sold price" with year values $460,000 … $736,500, ticker "2020 $460,000 · 2021 $544,500 ▲ …"
- Index: "Price and price per sq ft · Index, 2020 = 100 · 160.1 / 160.2 · Both measures rose about 60% since 2020."
- 3D bars: "Fewer homes are trading · Closed sales per year · ▼ −33.3% · 2021 → 2025 · 522 → 348 · 9 → 35 · Median days on market, 2021 → 2025 · *2026 year to date"
- List price: "List price became a ceiling · Sale price vs. final list price · 50% → 11% sold above list · 2021 → 2025 · 66% of 2026 sales closed below their final list price · 214 of 324"
- Read: "Buyers paid a median $736,500 in 2026. Two of three sales closed below list. Pricing and distribution decide which side of list a home lands on."
- Network: "Listed through United Realty Group. Distribution determines price. Listing on the Miami MLS places your home inside the daily working ecosystem of: 93,000 association members · 200+ global portals · 19 languages · 260+ U.S. MLSs via RPR · Miami and South Florida REALTORS® · United Realty Group"
- End card: headshot, "Carlos Uzcategui · Florida Licensed Realtor® · Sales Associate · CLHMS · United Realty Group · DM "SELL" for a 20-minute pricing and distribution review · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity"
- Every data scene carries: "Source: Southeast Florida MLS · closed sales · Jan 2020–Nov 2026"

## 7. Quality bar

- Mobile first: 390 px wide with no horizontal scroll; tables scroll inside their card; video width ≤ 420 px on desktop, centered or beside the KPIs.
- Video does not load until played (`preload="none"`); images lazy-loaded below the fold; webp/jpg sizes as supplied.
- EN/ES strings both complete; Spanish uses "precio mediano" (median), never "precio medio".
- `npm run lint` and `npm run verify` pass.

## 8. Deploy

Branch `feat/pembroke-pines-market-report` → `deploy-gate` only → **preview** → send Carlos the Netlify preview URL, plus a short note covering the two decisions in §6. No production merge without his approval.

## 9. Done means

- [ ] Section live on the preview, under the hero, all items in §4 except the pending active-listings block
- [ ] Every figure reads from `pembrokePinesReport.ts`, and spot-checks match this handoff
- [ ] Video plays with sound on click in EN and ES; posters show
- [ ] VideoObject + Dataset JSON-LD validate; OG card set; sitemap updated
- [ ] compliance-reviewer APPROVED (page + video text), or the open item reported to Carlos
- [ ] Music license confirmed, or audio stripped
- [ ] Preview URL sent to Carlos
