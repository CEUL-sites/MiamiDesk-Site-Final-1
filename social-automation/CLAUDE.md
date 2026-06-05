# CarlosRE Social Automation — Operating Guide

This project is an autonomous real estate social-media pipeline. **Claude Code is the brain**: it orchestrates, runs the pipeline, makes decisions, and reports back.

```
Claude Code → Gemini Nano Banana (image) → Canva (design) → Google Drive (save) → Buffer (publish: LinkedIn + Facebook + Instagram)
```

---

## Roles

| Component | Role |
|-----------|------|
| **Claude Code** | The brain — orchestration, decisions, running code, reporting |
| **Claude API** (`claude-opus-4-5`) | Story selection + caption copywriting |
| **Gemini "Nano Banana"** (`gemini-2.5-flash-image`) | Image generation/editing via Google AI Studio key |
| **Canva API** | Branded design assembly |
| **Google Drive** | Storage — every asset + final post saved for reuse |
| **Buffer API** | Final publishing to LinkedIn, Facebook, Instagram |

> **Nano Banana can also EDIT real listing photos** — enhance lighting, virtual staging, sky replacement — not only generate images from scratch. This is reserved for future versions of the pipeline; today the image step generates a photorealistic luxury image from the copywriter's art-direction brief. The model name is isolated in a single constant (`NANO_BANANA_MODEL` at the top of `src/image_gen.js`) so it is trivial to swap if Google renames it.

---

## Pipeline (one run, in sequence)

| Step | File | What it does |
|------|------|--------------|
| 1 Fetch | `src/fetcher.js` | Pull RSS (+ optional Bridge MLS), score for South Florida seller relevance, return top 8 |
| 2 Select + Write | `src/copywriter.js` | Claude (`claude-opus-4-5`) picks the best story, writes IG/LinkedIn/Facebook captions, returns JSON |
| 3 Image | `src/image_gen.js` | Nano Banana generates a photorealistic luxury image (no text/people, cinematic light). Falls back to `config/fallback_images/` |
| 4 Design | `src/canva_composer.js` | Canva composes the branded post. On any failure → `output/pending_posts/` and continue |
| 5 Save | `src/drive_saver.js` | Upload image + design + copy JSON to Drive (`CarlosRE Social Automation` / dated subfolder) |
| 6 Publish | `src/buffer_publisher.js` | Buffer schedules per platform windows |

---

## Commands

```bash
node --env-file=.env src/run.js                       # full run, all platforms
node --env-file=.env src/run.js --dry-run             # preview copy only, no publishing
node --env-file=.env src/run.js --platform=instagram  # one platform only
node --env-file=.env src/run.js --topic="Q3 luxury condo inventory"  # manual topic override
```

---

## Brand identity (authoritative — embedded in `copywriter.js` system prompt)

**Principal:** Carlos Uzcategui · Florida Licensed Realtor® SL705771 · 25 years South Florida luxury real estate.
**Company:** United Realty Group · 3,500+ agents · 20 Florida offices.
**Mission:** Win listing mandates from high-net-worth owners in South Florida and through the Spain and LATAM referral pipeline.

### The distribution argument — lead with this in all seller-facing copy
When a seller lists with Carlos, their property enters the world's largest local Realtor association's infrastructure: **93,000 member agents, 200+ global websites publishing simultaneously in 19 languages, 260+ U.S. MLSs via RPR, 437+ signed international association agreements, 11 MLS data exchanges, and $69 billion in combined 2025 transaction volume.** This is structural access that directly affects the seller's final price.

### Verified figures — use exactly, never substitute or invent
93,000 Miami REALTORS® members (effective May 11, 2026) · 200+ global portals · 19 languages · 260+ U.S. MLSs via RPR · 437+ international agreements · 11 MLS data exchanges · $69B 2025 volume · 3,500+ URG agents · 20 URG Florida offices.

### Tone
Institutional. Peer-to-peer. Persuasive through precision. **No exclamation marks in body copy.** Never use: *dream, passionate, best agent, excited.* Every CTA names a specific outcome (e.g. "Schedule a 20-minute listing strategy call" — not "learn more").

### Brand palette
Navy `#0A1628` · Gold `#C9A84C` · White `#F8F6F1`.

### Compliance footer (every public-facing post)
`Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.`

### Contacts
USA WhatsApp +1 954-865-6622 · Spain WhatsApp +34 646 85 30 78 · contact@carlosre.com · homesprofessional.com · carlosre.com · Office: 15951 SW 41 St. #700, Weston, FL 33331.

---

## Compliance rules (enforced in code — `src/utils.js` `checkCompliance`)

- No guaranteed sale outcomes, prices, or timelines.
- Do not imply Carlos is licensed outside Florida.
- Cite the source when quoting market data.
- No "effective [date]" language in front-facing caption bodies.
- No exclamation marks; no banned words.
- Every caption must end with the compliance footer and contain license `SL705771`.

A draft that fails any check triggers **one automatic regeneration** with the violations fed back to Claude before the run proceeds.

---

## Scheduling windows (Eastern Time)

| Platform | Slots | Days |
|----------|-------|------|
| Instagram | 7am / 12pm / 6pm | every day |
| LinkedIn | 8am / 5pm | weekdays only |
| Facebook | 9am / 3pm | every day |

Outside a platform's windows, the post is queued for the next available slot.

---

## Error handling (never crash the whole run)

| Failure | Behavior |
|---------|----------|
| Nano Banana fails | Use `config/fallback_images/`, continue |
| Canva fails (incl. partner-approval) | Save copy + image to `output/pending_posts/`, continue |
| Google Drive fails | Keep local copies in `output/`, report it, continue |
| Buffer fails | Save full post JSON to `output/pending_posts/`, report the path |
| No relevant news | Log to `output/runs/` and exit gracefully |
| Missing required key | State which key + its URL, stop cleanly |

Every run writes a timestamped JSON log to `output/runs/`.

---

## Tech notes

- **Runtime:** Node 20+ (uses native `fetch`, `--env-file`). No axios, no node-fetch.
- **Secrets:** all read from `process.env` via `config/config.js`. Never hardcoded.
- **`.gitignore`** excludes `node_modules/`, `.env`, `output/`, and `credentials/` so nothing leaks.
- **Drive:** official `googleapis` package with OAuth2; root folder ID cached to `.env` after first run.
