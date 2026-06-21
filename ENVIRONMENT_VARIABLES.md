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

CALLMEBOT_APIKEY
  What it does: Sends an instant WhatsApp alert to Carlos on every lead.
  Used by: netlify/functions/submission-created.ts and lead-notify.ts
           (via netlify/functions/_shared/whatsapp.ts)
  How to get (one-time activation, tied to the RECIPIENT number):
    1. From Carlos's WhatsApp, add the CallMeBot number +34 644 51 95 23 to contacts
    2. Send this exact message to it: "I allow callmebot to send me messages"
    3. The bot replies with an API key — that value is CALLMEBOT_APIKEY
    4. Reference: https://www.callmebot.com/blog/free-api-whatsapp-messages/
  IMPORTANT: The key is bound to the phone number that activated it. If the
             notify number changes, re-activate AND update CALLMEBOT_PHONE.
  Diagnosing: CallMeBot returns HTTP 200 even on errors; the functions log the
              real reason (Netlify → Functions → logs) as "CallMeBot: <reason>"
              when a send is rejected (bad key, number not registered, etc.).

CALLMEBOT_PHONE
  What it does: The WhatsApp number that receives lead alerts. Optional —
                defaults to +19548656622 (Carlos). Must include the country
                code with a leading "+".
  Used by: netlify/functions/_shared/whatsapp.ts
  Note: Must be the same number that activated CALLMEBOT_APIKEY above.

VITE_GOOGLE_MAPS_KEY
  What it does: Powers the address autocomplete + map-pin preview on the seller
                forms (Property Address field). WITHOUT this key the field still
                works as a plain text box, but no address suggestions drop down
                and no map preview appears.
  Used by: src/lib/googlePlaces.ts → HeroSellerForm + SellerIntakeForm (client-side)
  IMPORTANT: Must be prefixed VITE_ so Vite exposes it to the browser at build time.
             After setting it, trigger a new deploy — it is baked in at build time,
             not read at runtime.
  How to get: console.cloud.google.com → APIs & Services
    1. Enable BOTH "Maps JavaScript API" and "Places API"
    2. Ensure billing is enabled on the project (Google requires it even for
       free-tier usage; without billing the API silently returns no results)
    3. Credentials → Create API key
    4. Restrict the key: Application restriction → HTTP referrers →
       add https://homesprofessional.com/* and https://*.netlify.app/*
       (and http://localhost:*/ for local dev)
    5. API restriction → limit to Maps JavaScript API + Places API

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
