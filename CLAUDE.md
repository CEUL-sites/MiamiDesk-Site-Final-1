# HomesProfessional.com — Development Guide

## Publishing a Journal Post

The `/journal` section is a flat-file blog. No CMS, no database. Publishing = drop a `.md` file, commit, push.

### 5 steps

**1. Create the file**

```
src/content/journal/<slug>.md
```

Use kebab-case matching the `slug` frontmatter field. Example: `miami-market-q4-2026.md`.  
Files starting with `_` are excluded from the site — use them as drafts.

**2. Fill in frontmatter**

```md
---
title: "Miami Market Q4 2026 — What Sellers Need to Know"
date: "2026-10-01"
slug: "miami-market-q4-2026"
excerpt: "One or two sentences shown on the index card and in meta description. Under 160 chars."
category: "Market Analysis"
image: ""
---
```

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | Page `<title>` and H1 |
| `date` | ✅ | ISO 8601 `YYYY-MM-DD` — posts sort newest first |
| `slug` | ✅ | Must match filename without `.md` |
| `excerpt` | ✅ | Meta description + card text |
| `category` | — | Badge on card. Common: `Market Analysis`, `Seller Strategy`, `International`, `New Construction`, `Buyer Guide` |
| `image` | — | Optional cover image path e.g. `/images/journal/my-image.jpg`. Used as OG image. |

**3. Write the body**

Standard Markdown. Supported formatting:

| Syntax | Result |
|--------|--------|
| `## Heading` | H2 section heading |
| `### Sub-heading` | H3 |
| `**bold**` | Bold |
| `*italic*` | Italic |
| `` `code` `` | Inline code |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `> text` | Blockquote / pull quote |
| `[label](url)` | Link |
| `![alt](url)` | Image |
| `---` | Horizontal divider |

Copy `src/content/journal/_template.md` as a starting point.

**4. Generate the share card + register the route**

```bash
node scripts/render-journal-og.mjs              # renders cards for posts missing one
node scripts/render-journal-og.mjs --slug=<slug>  # just one post
node scripts/render-journal-og.mjs --force        # re-render all
```

Then set the post's frontmatter to `image: "/images/journal/og/<slug>.jpg"`, add
`/journal/<slug>` to the `reactSnap.include` list in `package.json`, and add the
URL to `public/sitemap.xml`. Posts missing from the include list are NOT
prerendered — crawlers and social scrapers would see an empty JS shell.
`npm run verify:journal` fails if a post's `image` points at a file that isn't
there, so render the card before setting the field.

**5. Commit and push**

```bash
git add -A
git commit -m "Add journal: <post title>"
git push origin main
```

Netlify auto-deploys in ~60 seconds. The post appears at `https://homesprofessional.com/journal/<slug>`.

The consultation CTA block, author byline, and breadcrumb are injected automatically — no need to write them in the post body.

### The daily automated post

`.github/workflows/daily-journal.yml` runs `scripts/daily-journal-publisher.mjs`
once a day, which generates one templated post from a rotating market × angle
matrix. It does steps 1 through 5 on its own — including rendering the share
card and setting `image:` — so automated posts need no manual follow-up. If
Chrome fails on the runner it publishes the post without a card and logs a
warning; `node scripts/render-journal-og.mjs` backfills it.

These posts are intentionally formulaic and several share near-identical body
copy across markets. Hand-written posts are what differentiate the section.

---

## Compliance checklist for every post

- [ ] Do not guarantee sale outcomes, prices, or timelines
- [ ] Do not imply Carlos is licensed outside Florida
- [ ] Market data: cite the source in the text (e.g., "Miami and South Florida REALTORS® MLS")
- [ ] Do not use "effective [date]" language front-facing

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript + Vite 6 |
| Styling | Tailwind CSS v4 — tokens: navy `#0B1E3F`, gold `#B08D57`, ivory `#F9F7F2` |
| Routing | React Router v7 — lazy-loaded pages |
| Hosting | Netlify — auto-deploy from `main` |
| Forms | Netlify Forms → `submission-created.ts` → Google Sheets + WhatsApp + email |
| MLS data | Bridge IDX API via `netlify/functions/ticker-listings.ts` |
| Journal | `import.meta.glob` loads `src/content/journal/[^_]*.md` at build time |

## Key files

| File | Purpose |
|------|---------|
| `src/content/journal/*.md` | Journal posts — add here to publish |
| `src/lib/markdown.ts` | Frontmatter parser + Markdown→HTML converter |
| `src/pages/JournalListPage.tsx` | `/journal` index page |
| `src/pages/JournalPostPage.tsx` | `/journal/:slug` post page |
| `src/components/Navbar.tsx` | Site navigation |
| `src/constants.ts` | Contact info, lead magnet URLs, license numbers |
| `netlify/functions/submission-created.ts` | Form lead handler |
| `netlify/functions/ticker-listings.ts` | Bridge IDX proxy |

## Verified figures — never invent a number

Every network/brokerage statistic used anywhere on the site (member counts,
office counts, agent counts, MLS counts, etc.) must trace back to
`src/data/figures.json`, which is the single source of truth (`src/constants.ts`
mirrors it for legacy imports). Each entry there carries a `source` field —
check `docs/sources/SOURCES.md` for the primary documents backing those
sources before changing or adding a figure.

**United Realty Group office count**: 20 Florida offices. URG's internal
office directory, photographed by Carlos and saved at
`docs/sources/urg-office-directory-2026-07.jpg`, lists more individual
addresses than that, but Carlos confirmed 20 is the correct figure to use —
do not "correct" it to a raw count of every address in that photo (some
entries there are not counted as distinct Florida offices). Full per-office
addresses are in that photo and in `docs/sources/SOURCES.md` §3, for
reference only. URG also has a Greensboro, NC branch — it is explicitly
**not** counted as a Florida office and must never be implied as part of
Carlos's Florida coverage.

## Routes

| Path | Page |
|------|------|
| `/` | HomePage |
| `/sell-south-florida` | SellSouthFloridaPage |
| `/buy` | BuyersPage |
| `/journal` | JournalListPage |
| `/journal/:slug` | JournalPostPage |
| `/spain-desk` | SpainDeskPage (nav label: "Global Desk") |
| `/contact` | ContactPage |
| `/agents` | AgentsPage |
| `/markets` | MarketsPage |
