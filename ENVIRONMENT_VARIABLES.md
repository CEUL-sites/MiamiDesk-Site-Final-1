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

WHATSAPP_CLOUD_TOKEN
  What it does: Sends the owner WhatsApp alert through Meta's official WhatsApp
                Cloud API after an inquiry is saved in HubSpot. Replaces
                CallMeBot, which returned 403 to Netlify's servers.
                OPTIONAL: without it the alert is skipped silently; the
                HubSpot task reminder and the Resend email still alert Carlos.
  Used by: netlify/functions/hubspot-inquiry-sync.ts
           (via netlify/functions/_shared/whatsapp.ts)
  How to get (one-time, in Meta — business.facebook.com / developers.facebook.com):
    1. Create a Meta app with the WhatsApp product and a WhatsApp Business Account.
    2. Add a sending phone number (a number NOT already used in the WhatsApp app).
    3. Create a utility template named "website_lead_alert" (language: English) with
       this body and wait for approval:
         New website inquiry: {{1}}. Name: {{2}}. Contact: {{3}}. Location: {{4}}. HubSpot: {{5}}
    4. Business settings → System users → generate a permanent token with
       whatsapp_business_messaging. That value is WHATSAPP_CLOUD_TOKEN.
  IMPORTANT: server-side only. Never prefix with VITE_.

WHATSAPP_PHONE_NUMBER_ID
  What it does: The sending number's ID (WhatsApp → API Setup in the Meta app).
                Required together with WHATSAPP_CLOUD_TOKEN.

WHATSAPP_ALERT_TEMPLATE / WHATSAPP_ALERT_TEMPLATE_LANG / WHATSAPP_ALERT_TO / WHATSAPP_API_VERSION
  What they do: Optional overrides. Defaults: "website_lead_alert", "en",
                +19548656622 (Carlos), and the Graph API version pinned in
                _shared/whatsapp.ts.

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
