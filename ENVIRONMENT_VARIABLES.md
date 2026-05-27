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

BRIDGE_API_TOKEN
  What it does: Fetches live MLS listings from the Bridge Data Output API
  Used by: netlify/functions/bridge-listings.ts (server-side only)
  How to get: bridgedataoutput.com → Login → API Access → Server Token
  IMPORTANT: Must be the SERVER token, not the browser/public token.
  No spaces, no quotes, no line breaks. 32 hex characters.

BRIDGE_DATASET_ID
  What it does: Identifies your MLS dataset in the Bridge API URL
  Used by: netlify/functions/bridge-listings.ts
  Default: miamire (Miami Realtors Exchange)
  How to get: bridgedataoutput.com → Login → check the dataset slug shown
             in your API endpoint URLs. Common values: "miamire", "mar"
  Note: If this is wrong the API returns 403. Set it explicitly in Netlify
        env vars if "miamire" does not match your Bridge account dataset.
