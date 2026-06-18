# Journal Drafts — Publishing Workflow

Files here are NOT published. The Vite glob only loads files from `src/content/journal/[^_]*.md` (direct children, no subdirectories, no underscore prefix). Anything in `_drafts/` stays private until you promote it manually.

## To draft a new post

1. Copy `_template.md` from `src/content/journal/` into this folder
2. Rename: `my-post-slug.md`
3. Write the frontmatter and body
4. Have Carlos review before promoting

## To promote a draft to live

1. Move the file up one level: `mv _drafts/my-post.md ../my-post.md`
2. Generate the OG image: `node scripts/render-journal-og.mjs`
3. Set `image: "/images/journal/og/my-post.jpg"` in frontmatter
4. Add `/journal/my-post-slug` to `reactSnap.include` in `package.json`
5. Add the URL block to `public/sitemap.xml`
6. Commit and push → Netlify auto-deploys in ~60 seconds

## Frontmatter required for all posts

```yaml
---
title: ""
date: "2026-MM-DD"
slug: ""           # must match filename without .md
excerpt: ""        # under 160 chars — used as meta description
category: "Seller Strategy"   # or: Market Analysis / International
image: ""          # set after OG render
created_by: "claude"          # or: manual
market: "South Florida"       # or: city name
funnel_stage: "consideration" # or: awareness / bottom_funnel
content_goal: "seller_lead"   # or: market_report / international_listing
---
```

## Compliance checklist (must pass before promoting)

- [ ] No guarantee of sale outcome, price, or timeline
- [ ] Carlos is not implied to be licensed outside Florida
- [ ] All market data cites the source in the post body
- [ ] No "effective [date]" language front-facing
- [ ] Equal Housing Opportunity language not removed from site footer/forms
- [ ] No protected-class targeting language
