# CarlosRE Social Automation

Autonomous real-estate social-media pipeline for **Carlos Uzcategui**, Florida Licensed Realtor® SL705771, United Realty Group.

```
RSS news → Claude copy → Gemini Nano Banana image → Canva design → Google Drive → Buffer (LinkedIn + Facebook + Instagram)
```

Claude Code is the brain: it runs the pipeline, makes decisions, and reports back.

---

## Requirements

- **Node 20+** (uses native `fetch` and `--env-file`). Check with `node --version`.
- API keys (see **Keys & Auth** below).

## Install

```bash
cd social-automation
npm install
cp .env.example .env      # then fill in your keys
```

## Run

```bash
node --env-file=.env src/run.js                       # full run, all platforms
node --env-file=.env src/run.js --dry-run             # preview copy only (no publishing)
node --env-file=.env src/run.js --platform=instagram  # one platform only
node --env-file=.env src/run.js --topic="luxury waterfront inventory"  # manual topic
```

---

## Keys & Auth

### Required for a dry run (preview copy only)

| Key | Where to get it |
|-----|-----------------|
| `ANTHROPIC_API_KEY` | https://console.anthropic.com/keys |
| `GEMINI_API_KEY` | https://aistudio.google.com/app/apikey |

> A **dry run** only needs `ANTHROPIC_API_KEY` (it generates and previews captions). `GEMINI_API_KEY` is validated for full runs.

### Required for a full live run

#### Google Drive (OAuth2)

1. Go to https://console.cloud.google.com/apis/credentials.
2. **Enable the Google Drive API** for your project (APIs & Services → Library → "Google Drive API" → Enable).
3. Create an **OAuth client ID** → application type **Desktop app**.
4. **Download** the client JSON and save it as `credentials/google_oauth_client.json` (this folder is gitignored).
5. The first live run prints an authorization URL. Open it, approve access, paste the code back into the terminal. The token is cached in `credentials/google_token.json` and reused.
6. After the first run, the Drive folder ID is written to `.env` (`DRIVE_ROOT_FOLDER_ID`) so the same `CarlosRE Social Automation` folder is reused.

#### Canva

| Key | Where |
|-----|-------|
| `CANVA_API_TOKEN` | https://www.canva.com/developers |
| `CANVA_BRAND_TEMPLATE_ID` (optional) | a Brand Template ID to compose against |

If Canva is not configured or fails for any reason (including partner-approval errors), the post is saved to `output/pending_posts/` and the run continues.

#### Buffer

| Key | Where |
|-----|-------|
| `BUFFER_ACCESS_TOKEN` | https://buffer.com/developers |

List your Buffer profile (channel) IDs to map Instagram / LinkedIn / Facebook:

```bash
curl "https://api.bufferapp.com/1/profiles.json?access_token=YOUR_BUFFER_ACCESS_TOKEN"
```

In the JSON response, each profile has an `id` and a `service` field (`instagram`, `linkedin`, `facebook`). Copy each `id` into `.env`:

```
BUFFER_PROFILE_ID_INSTAGRAM=...
BUFFER_PROFILE_ID_LINKEDIN=...
BUFFER_PROFILE_ID_FACEBOOK=...
```

> **Before a live run:** in the Buffer dashboard you must connect **Instagram** (a Business/Creator account linked to a Facebook Page), **LinkedIn**, and **Facebook**. The API cannot connect channels for you.

### Optional

| Key | Where |
|-----|-------|
| `BRIDGE_API_KEY` | https://www.bridgeinteractive.com/developers — skip if you don't have it |

---

## What gets produced

- `output/images/` — generated images
- `output/runs/` — a timestamped JSON log + copy snapshot for every run
- `output/pending_posts/` — posts that need manual assembly (Canva/Buffer fallback)
- **Google Drive** → `CarlosRE Social Automation` / `YYYY-MM-DD` / image + design + copy JSON

---

## Scheduling windows (Eastern Time)

| Platform | Slots | Days |
|----------|-------|------|
| Instagram | 7am / 12pm / 6pm | every day |
| LinkedIn | 8am / 5pm | weekdays only |
| Facebook | 9am / 3pm | every day |

Outside a window, the post is queued for the next available slot.

---

## Project layout

```
social-automation/
├── CLAUDE.md                 # operating guide + brand identity
├── package.json
├── .env.example              # copy to .env
├── .gitignore                # excludes node_modules/ .env output/ credentials/
├── README.md
├── config/
│   ├── config.js             # all config from process.env
│   └── fallback_images/      # drop fallback .jpg/.png here
├── credentials/              # Google OAuth files (gitignored)
├── src/
│   ├── run.js                # orchestrator (the brain's entry point)
│   ├── fetcher.js            # step 1 — RSS + scoring
│   ├── copywriter.js         # step 2 — Claude captions
│   ├── image_gen.js          # step 3 — Nano Banana
│   ├── canva_composer.js     # step 4 — Canva
│   ├── drive_saver.js        # step 5 — Google Drive
│   ├── buffer_publisher.js   # step 6 — Buffer
│   └── utils.js              # logging, dates, compliance, fetch-with-retry
├── prompts/
│   └── claude_code_session_prompt.md
└── output/                   # images / runs / pending_posts (gitignored)
```

---

## Security

- `.env` and `credentials/` are gitignored — secrets never reach GitHub.
- All secrets are read from `process.env` via `config/config.js`. None are hardcoded.
