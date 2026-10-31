# HomesProfessional website → HubSpot intake

Active in HubSpot account 149513532 and the existing Netlify miamidesk project.

## Verified production status — October 31, 2026

The runtime credential, ten custom contact properties, and one-minute delivery schedule
are configured. Production deploy `6ae5a025316f424aa22e728f` published commit
`fb412506e4ae23853fb719961be45224adf947f9` at 08:02 UTC.

Live seller and buyer submissions were accepted by the website and independently read
back from HubSpot. All 27 captured seller fields and all 29 captured buyer fields matched
their complete inquiry notes. Each contact has one associated note and one follow-up
task assigned to Carlos. Delivery diagnostics reported a clear queue and no review holds.
The test names explicitly identify them as Website Seller/Buyer Verification.

| Test | Contact ID | Note ID | Task ID |
| --- | --- | --- | --- |
| Seller | 908603395301 | 536694657245 | 536701615300 |
| Buyer | 908602618070 | 536691101903 | 536626143427 |

The saved **Website Inquiries** contact view (162477524) filters on Website Inquiry
Categories. Core inquiry fields appear as contact properties; the complete submission,
including additional business fields and attribution, appears in the associated note.

The form receiver, worker, and diagnostic endpoint use modern Request/Response
functions. Do not add `connectLambda`: its legacy context omits the uncached endpoint
needed for strongly consistent queue reads. Keep strong consistency and checkpoints.
Marketing enrollment and seller nurture remain disabled.

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
HubSpot delivery queue. A scheduled processor runs every minute. Production activation follows installation of a server credential and verification of
the ten-field custom schema. It creates or matches
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

## Runtime configuration and credential replacement

The ChatGPT HubSpot connector is separate from the website runtime credential.
The dedicated **HomesProfessional Website Inquiry CRM** HubSpot service key is
stored in Netlify production, Functions scope, as a secret. Its contact read/write
permissions support contact matching and associated note/task creation. The ten
custom properties were verified separately; runtime schema-write permission is not needed.

| Variable | Production value |
| --- | --- |
| HUBSPOT_PRIVATE_APP_TOKEN | Dedicated HubSpot service key, stored as a secret |
| HUBSPOT_OWNER_ID | 100759119 |
| HUBSPOT_SYNC_ENABLED | true |
| SELLER_NURTURE_ENABLED | false, pending separate marketing authorization |

Never paste a credential into chat, put it in command arguments, or commit it.
For a replacement environment, verify the schema before enabling delivery.
The one-time setup script (`node scripts/setup-hubspot-inquiries.mjs`) requires
separate schema permissions and accepts its credential securely on stdin.

Redeploy after changing runtime settings. GET
`/.netlify/functions/hubspot-status` reports configuration, not delivery proof.
GET `/.netlify/functions/hubspot-status?check=delivery` additionally checks queue
storage and exposes only operational flags/status codes. It is rate limited and
does not expose contacts, submission IDs, or credentials. Validate activation with
a marked live submission and an independent HubSpot contact/note/task read-back.

## Owner WhatsApp notifications

New completed, contactable inquiries generate one WhatsApp notification to Carlos's
USA number **+1 954-865-6622**, using the existing `CALLMEBOT_APIKEY`
configured in Netlify Functions and the server-side CallMeBot adapter. No HubSpot
workflow, credits, marketing enrollment, or Make.com automation is required.

**Delivery gate:** `hubspot-inquiry-sync` only sends after successful HubSpot
contact create/match/update, complete inquiry note, and assigned follow-up task.
The message contains category, name, email, phone, location, form, referral-client
name if submitted, source, and an authenticated HubSpot contact URL. Email and
Google Sheets are independent backups and may be sent before CRM synchronization.

One submission ID produces one queue job and one WhatsApp send checkpoint. If
CallMeBot rejects a message, is unconfigured, or times out, the CRM job remains
queued for exponential-backoff notification retries **without recreating** the
contact, note or task. Delivery acceptance is not the same as confirmation that
the phone displayed the notification. Rare duplicate alerts remain possible if
the remote provider accepts a message immediately before a worker crash and
the local checkpoint has not yet been saved. CallMeBot is a third-party
unofficial WhatsApp bridge; use the CRM record for full details.

Excluded: incomplete address-only `seller-valuation-step1`, unknown forms,
and non-contactable submissions. Every new submission is evaluated independently,
including a repeat inquiry by an existing HubSpot contact.

## Recovery and limits

Delivery is asynchronous, ordinarily on the next scheduled invocation, not a browser
success guarantee. `hubspot-inquiries` stores pending/done records. Failed requests
back off; invalid configuration remains pending. A processor lease prevents concurrent
runs, and checkpoints retain created contact/note/task IDs. An interrupted activity
creation goes to `review` instead of blindly repeating a potentially successful write.
Review records must be reconciled against the contact timeline before resetting them.
Inspect Netlify function logs for summary failures; logs omit raw lead values and tokens.

This is not a historical import. Existing Netlify submissions can be reconciled separately
with explicit selection and duplicate checks. The saved Website Inquiries view is already available; filter contacts on Website
Inquiry Categories when creating another view.

## Validation

Node tests cover categories, exclusion of address-only stages, complete submission
retention, alias fields, preservation of existing contact context, partial failure
recovery, ambiguous identities, request throttling, uncertain writes, and queue dedup.
Hosted-runtime regression tests cover form enqueueing, worker leases, and diagnostic
strong reads. Field-retention fixtures cover all ten registered contact forms. GitHub
CI passed 70 tests, type checking, the production build, and search coverage checks.
Live seller/buyer delivery was verified as recorded above.
