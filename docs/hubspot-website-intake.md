# HomesProfessional website → HubSpot intake

Prepared for HubSpot account 149513532 and the existing Netlify miamidesk project.

## Coverage

| Form | Category |
| --- | --- |
| seller-hero, seller-intake, seller-consultation | South Florida Seller; Global Desk context routes to international or agency category |
| buyer-mandate | Buyer |
| referral-intake, referral-intake-es | Referral Partner |
| agency-partner-intake | Agency / Developer |
| spain-seller | International Owner or Agency / Developer from stated role |
| global-desk-listing | International Owner or Agency / Developer from stated submitter type |
| lead-magnet-download, including exit intent | Seller Guide Request, unqualified |
| seller-valuation-step1 | Address-only step; no CRM contact until contact details are submitted |

CTAs that open these forms use the same intake. Phone, email, WhatsApp, navigation,
and booking clicks cannot identify an anonymous visitor and do not create contacts.
The AI desk does not currently collect structured identity; its anonymous transcripts
are not converted into CRM contacts. Third-party IDX inquiries require that provider's
own integration and are outside the website's Netlify forms.

## Record changes

Each completed contactable submission is retained in Netlify Forms and a durable
HubSpot delivery queue. A scheduled processor runs every minute. Enable only after
installing a server credential and verifying the ten-field custom schema. It creates or matches
one contact, adds the category to a multi-category field, appends a submission note,
and creates a review task assigned to Carlos (verified owner ID 100759119).

New identity fields fill blanks only. Existing owners, lifecycle stages, notes,
communication restrictions, opt-out fields and original HubSpot traffic attribution
are not overwritten. Latest website-specific inquiry fields are updated; consent, form, page, timestamp, and full older
submissions remain in notes. Property addresses use dedicated property fields,
not the contact's residential mailing address. API contact creation does not opt
contacts into marketing. The integration never invokes marketing enrollment APIs.

A submitted WhatsApp/SMS preference is a record of that submission only; it does
not cancel an existing unsubscribe or authorize other marketing channels. Names,
phones, and message values are not inferred. Unknown forms and address-only steps
are excluded. Conflicting email/phone identities go to manual review.

## Activation (remaining prerequisite)

The ChatGPT HubSpot connector is not a website runtime credential. Create a dedicated
HubSpot private app for HomesProfessional Website Intake, in account 149513532.
Grant `crm.objects.contacts.read`, `crm.objects.contacts.write`,
`crm.schemas.contacts.read`, `crm.schemas.contacts.write`, and
`crm.objects.owners.read` (owner verification). Use the HubSpot
scope guidance for notes/tasks (these CRM activity endpoints use contact access).
Do not grant marketing, campaign, email-send, or company-write scopes.

The one-time setup script accepts the credential on stdin and checks Carlos's owner
before creating only the missing `hp_` contact properties:

`node scripts/setup-hubspot-inquiries.mjs`

Feed stdin securely from the executing session; do not paste the token into chat,
place it in a command argument, or commit it. The script verifies schema mismatches
rather than modifying existing definitions silently.

Set these in Netlify's miamidesk project, production context, Functions scope:

| Variable | Value |
| --- | --- |
| HUBSPOT_PRIVATE_APP_TOKEN | Dedicated private-app token, stored as a secret |
| HUBSPOT_OWNER_ID | 100759119 |
| HUBSPOT_SYNC_ENABLED | true, only after schema verification |
| SELLER_NURTURE_ENABLED | false; leave disabled pending separate marketing authorization |

Redeploy so the function runtime receives updated settings. GET
`/.netlify/functions/hubspot-status` reports configuration only, not successful delivery.
Submit clearly marked test inquiries with a controlled test address; check contact,
category, complete note, assigned task and repeated-submission behavior in HubSpot.
No live test submissions were created during code preparation.

## Recovery and limits

Delivery is asynchronous, ordinarily on the next scheduled invocation, not a browser
success guarantee. `hubspot-inquiries` stores pending/done records. Failed requests
back off; invalid configuration remains pending. A processor lease prevents concurrent
runs, and checkpoints retain created contact/note/task IDs. An interrupted activity
creation goes to `review` instead of blindly repeating a potentially successful write.
Review records must be reconciled against the contact timeline before resetting them.
Inspect Netlify function logs for summary failures; logs omit raw lead values and tokens.

This is not a historical import. Existing Netlify submissions can be reconciled separately
with explicit selection and duplicate checks. Existing CRM saved views/segments are not
created automatically; filter contacts on Website Inquiry Categories to inspect them.

## Validation

Node tests cover categories, exclusion of address-only stages, complete submission
retention, alias fields, preservation of existing contact context, partial failure
recovery, ambiguous identities, request throttling, uncertain writes, and queue dedup.
CRM delivery and secret configuration still require live activation checks.
