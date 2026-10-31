# Agent profiles and linked client referrals

Implementation prepared for HomesProfessional.com and HubSpot portal **149513532**.
Production activation is pending creation and read-back of the six approved properties.
Do not merge or deploy this change before those properties exist: professional writes
include them. The current production intake remains on its previously verified version.

## Approved new Contact properties

| Internal name | Label | Values |
| --- | --- | --- |
| hp_agent_registration_purpose | Registration purpose | agent_registration, client_referral, listing_review, professional_inquiry |
| hp_professional_market | Professional country / market | Submitted business country or market |
| hp_referral_type | Referral type | Submitted referral/cooperation type |
| hp_inventory_type | Inventory type | Submitted property inventory type |
| hp_inventory_count | Number of listings | Submitted count or range |
| hp_listing_url | Listing URL | Submitted public HTTP(S) property URL |

The purpose is a single-select enumeration. The other properties use text storage;
listing URLs are validated as HTTP(S) without embedded credentials. Create only
missing properties; preserve any existing compatible definitions and values.

Professional name/email/phone use standard Contact identity fields. Brokerage/company
maps to `company`, submitted role to `jobtitle`, and agency website to `website`.
These standard fields fill blanks only. Existing owner, identity, lifecycle, prior
company, website, role, communication restrictions, and GILMAR research remain intact.
Business markets go into the dedicated professional-market field. Only the referral
form's explicitly requested country may fill a blank standard country field.

## Website paths

Both `/agents` and `/es/agentes` use the same localized form with four purposes:
agent registration, client referral, listing review, and other professional inquiry.
Agent registration does not require a client. Switching away from client referral
omits hidden client identity from the submitted payload.

Client referral requests a distinct client name, email or international phone,
country, requirement, budget/value, timing, city/location, property address if
applicable, and contextual summary. A required checkbox records the agent's
confirmation that the client authorized sharing these details for this referral.
This is not marketing consent or a signed referral agreement.

Both existing Netlify form names are preserved (`referral-intake`,
`referral-intake-es`). Conditional fields are declared in `index.html`, and their
retention is covered by the form contract fixture. Existing professional submissions
with only a client summary remain supported; no client identity is inferred from prose.

## CRM delivery

For a structured, authorized client referral:

1. Match/create the referring agent using the existing email/phone safeguards.
2. Independently match/create the client, preserving their existing owner and identity.
3. Create the default Contact-to-Contact association; it is idempotent.
4. Associate one complete submission note and one Carlos-assigned follow-up task with
   both contacts. Their text names the referring agent and the referred client.

The queue checkpoints the two contact IDs, association, note, and task. A task failure
resumes without recreating the saved contacts, association, or note. Ambiguous
identities, missing authorization, invalid client details, and agent/client identity
collisions are held for review. A legacy summary alone never creates a client contact.
New registrations are inquiries pending professional review, not confirmed partnerships.
Marketing enrollment and seller nurture remain off.

## Activation checks

Create/read back the six approved properties. Configure a **Website Agents & Referrals**
view filtered by Website Inquiry Categories containing Referral Partner or
Agency / Developer. Include name, email, phone, company, job title, website,
registration purpose, professional market, referral type, inventory type/count,
and listing URL as visible columns. Keep the existing Website Inquiries view.

After merge and production deployment, submit marked agent-only, structured-client,
and agency-listing tests through the website. Read back the standard/professional
properties, the distinct client contact, the Contact-to-Contact association, and the
shared note/task. Verify delivery status reports no pending jobs or review holds.
Use controlled test aliases and reserved fictional phone numbers; no prospect outreach.

## Verification before activation

Regression tests were observed failing before the mapping/client-link fix. The
localized form tests likewise failed before the new registration controls existed.
The full automated test suite, hosted-runtime tests, and native notification checks
must pass. GitHub CI supplies the complete prerender/build and search-coverage check.
Live agent/client delivery remains unverified until the schema and production deploy
are active. This change does not import historical submissions or modify the existing
500-contact GILMAR cohort.
