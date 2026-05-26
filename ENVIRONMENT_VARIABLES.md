# Environment Variables — HomesProfessional.com
Set all values in Netlify → Site Settings → Environment Variables.
Never commit real values to the repository.

GOOGLE_SHEETS_WEBHOOK_URL
  What it does: Posts every lead submission to Google Sheets
  Used by: netlify/functions/submission-created.ts
  How to get: Google Apps Script → Deploy → Manage deployments → copy /exec URL

RESEND_API_KEY
  What it does: Sends email to contact@carlosre.com on every lead
  Used by: netlify/functions/submission-created.ts
  How to get: resend.com → API Keys → Create API Key → verify homesprofessional.com domain

GEMINI_API_KEY
  What it does: Powers the AI Intelligence Desk
  Used by: netlify/functions/ai-desk.ts server-side only
  How to get: aistudio.google.com → Get API key

BRIDGE_SERVER_TOKEN
  What it does: Fetches live MLS listings
  Used by: netlify/functions/bridge-listings.ts server-side only
  How to get: bridgedataoutput.com → API Access → Server Token

BRIDGE_DATASET_ID
  What it does: Identifies the Miami MLS dataset
  Used by: netlify/functions/bridge-listings.ts
  Value: confirm in Bridge dashboard, usually "mar" or "miami"
