# Agent profiles and linked client referrals

Active on HomesProfessional.com and HubSpot portal **149513532**, verified November 1, 2026.
All six approved properties were created and read back before PR #184 was merged.
Production deploy `6ae6fa52cb4a6668d6b1121e` published commit
`f0aeeb9de98150d58f09dce54a863f529b275578` at 08:39 UTC.

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

## Saved CRM view

[Website Agents & Referrals](https://app-eu1.hubspot.com/contacts/149513532/objects/0-1/views/162524907/list)
is saved with Website Inquiry Categories **is known** AND Registration purpose **is known**.
It displays 17 columns: name; registration purpose; company; job title; professional
market; referral type; inventory type; listing count; listing URL; email; phone;
website; owner; create date; preferred contact; language; inquiry categories.
The professional properties appear first. The existing Website Inquiries view is retained.
The view was reloaded and verified with the agent and agency test records; the separate
referred buyer is excluded because it has no professional registration purpose.

## Automated and live verification

Regression tests were observed failing before the mapping/client-link fix. The
localized form tests likewise failed before the new registration controls existed.
All 81 automated tests passed (48 site/form, 28 HubSpot/runtime, 5 native notification),
along with type checks, build/prerender, and search coverage in GitHub CI run 41185562755.
Three marked submissions were then sent through the production website and read back
independently from Netlify Forms and HubSpot:

| Path | Submission | Saved note fields | Result |
| --- | --- | --- | --- |
| Agent registration | 6ae6fbc276826dd58e2c8a24 | 41/41 matched | One agent contact, note and assigned task |
| Structured client referral | 6ae6fbe80db500f8c5b74ee7 | 41/41 matched | Same agent reused, distinct client linked, shared note/task |
| Agency listing review | 6ae6fc0352c85a40e1161311 | 32/32 matched | Company, role, market, inventory, count and listing URL populated |

The client's phone, city, property address, budget and timeline were confirmed in
structured CRM properties. Client country, requirement and sharing authorization are
also preserved in the complete shared note. All three contacts and follow-up tasks
are assigned to Carlos (owner 100759119). No duplicate agent was created.

Operational status reported configured=true, synced=true, needsReview=false and no
upstream HTTP status codes. It still reported pending=true with attempted=true.
That flag also covers post-CRM WhatsApp delivery retries: the current worker checkpoints
completed CRM writes before waiting for notification confirmation. The three CRM
submissions, notes, tasks and client association above are independently verified;
this check does not certify that the entire notification queue is empty. This change does not import historical submissions or modify the existing
500-contact GILMAR cohort.


## Verification records

Contacts: [909229184201](https://app.hubspot.com/contacts/149513532/record/0-1/909229184201?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [909036551359](https://app.hubspot.com/contacts/149513532/record/0-1/909036551359?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [909225540818](https://app.hubspot.com/contacts/149513532/record/0-1/909225540818?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Agent notes: [536956195064](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22536956195064%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [536956318921](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22536956318921%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Client notes: [536956195064](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22536956195064%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Agency notes: [536906776772](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22536906776772%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Agent tasks: [536956318968](https://app.hubspot.com/tasks/149513532/view/all/task/536956318968?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [536950438104](https://app.hubspot.com/tasks/149513532/view/all/task/536950438104?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Client tasks: [536956318968](https://app.hubspot.com/tasks/149513532/view/all/task/536956318968?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

Agency tasks: [536924050642](https://app.hubspot.com/tasks/149513532/view/all/task/536924050642?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search).

