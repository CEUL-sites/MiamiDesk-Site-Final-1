# HomesProfessional website → HubSpot CRM

Prepared October 9, 2026. Local changes only; not pushed or deployed.
Source snapshot matches GitHub main `42f7e06ed3a55d6d1bedb32924ce5682103a8b01` exactly (tree `8a830e1494dc532d84d71f2dd43cc09e8d7e21dc`).

## Proposed behavior

- Keep current branded forms, CTA destinations, optional-email paths, languages, field requirements, uploads, thank-you navigation and analytics.
- Seller, buyer, referral, Spain seller, agency, Global Desk and calculator forms deliver CRM inquiry records through the two existing server submission paths.
- Preserve Netlify Forms, Sheets, email, WhatsApp alerts and transactional inquiry acknowledgments.
- Match an existing contact by email; exact international phone match only if unique. Append an escaped inquiry note without changing the existing profile, owner, lifecycle, marketing status or communication restrictions.
- For a phone-only inquiry with a local-format number, create a separate contact with the supplied phone number; do not guess its country or fabricate an email. Review and merge identity manually when verified. Same-submission duplicates are prevented; national-phone contacts are intentionally not automatically merged across separate inquiries.
- New contacts may be assigned to Carlos using verified owner ID `100759119`. Do not confuse owner IDs with user/account IDs.
- Record submitted text fields, preferences, consent, attribution and available language/page context. Keep uploaded files in Netlify; primary event notes may include the attachment references Netlify supplies. The direct backup does not upload attachments to HubSpot.
- CRM failures are retained in Netlify `hubspot-inquiries` and `lead-dead-letter` for manual reconciliation. CRM work runs alongside the existing notification paths.
- Gate both enrollment and sending of the pre-existing website seller nurture sequence, default off. This does not send or activate HubSpot marketing.
- Update privacy disclosure to describe CRM records and correct the existing AI handoff retention wording.

AI Desk handoffs remain in Sheets, because they have no structured contact identity. WhatsApp/call/email clicks continue their current behavior; clicks alone do not create HubSpot records. The current seller CTA already offers a private strategy review and explains the response, so its wording is retained.

## Credential draft ready for approval

HubSpot account: `149513532`, contact@carlosre.com.
New account uses service keys; legacy private apps are unavailable. No service key existed at inspection.

Draft name: **HomesProfessional Website Inquiry CRM**

| Permission | Purpose |
| --- | --- |
| `crm.objects.contacts.read` | Resolve existing contacts without overwriting them |
| `crm.objects.contacts.write` | Create contact records and associated inquiry notes |

The key has not been created. Keep its value out of chat, source code, browser bundles, logs and screenshots. After approval, transfer it directly to Netlify server environment configuration.

| Netlify variable | Intended value |
| --- | --- |
| `HUBSPOT_ACCESS_TOKEN` | Approved service key; secret; Functions scope only |
| `HUBSPOT_OWNER_ID` | `100759119` |
| `HUBSPOT_SYNC_ENABLED` | `true` only in an approved test context, then production after approval |
| `SELLER_NURTURE_ENABLED` | `false` |

HubSpot defaults integration-created contacts to non-marketing. Verify the service-key/integration default and any existing portal workflows before enabling capture. The integration does not call subscription, marketing-status, campaign or workflow APIs; it cannot prevent independent pre-existing portal workflows from acting on new contacts.

## Validation and release

- TypeScript lint passes.
- Existing six test files plus eight CRM tests: all 33 assertions pass, including calculator primary/backup parity, using a local synchronous TypeScript loader after standard tsx/esbuild execution was blocked (`spawn EPERM`).
- Journal content verification passes for 122 public posts.
- Standard production build/prerender cannot run here because esbuild process creation is blocked. A GitHub/Netlify preview build must pass before production.
- The existing homepage-conversion verifier expects the retired “Listing Strategist” title while current approved main uses “Listing Agent.” This inherited verifier mismatch is separate from these CRM changes.
- The other ten repository verification scripts pass, covering review spotlight, Global Desk language, visitor tracking, lead scoring, market context, lead tracking, claims, interactive modules, mobile hero and office positioning.
- Public copy received the repository-required compliance review.

After Carlos approves the credential and preview push: create the service key, configure secret/context variables, push only the reviewed diff against fresh main, run CI and inspect a deploy preview on mobile and desktop. Submit labeled seller, buyer, Spanish, phone-only and Global Desk test inquiries; check contact/note association, attribution/consent, attachment retention, backups and no marketing enrollment.

Production requires Carlos's explicit approval after the tested preview is reviewable. Verify the public URL and key lead paths afterward. A local snapshot, commit or passing unit test is not a production release.

## Failure reconciliation

Inspect pending/failed `hubspot-inquiries` and `lead-dead-letter` entries. Search HubSpot for the recorded inquiry ID before recreating a note: a timeout can follow a successful remote write. If no note exists, replay the retained inquiry once with its contact association, then mark the inquiry synced. Do not clear a pending marker and blindly replay both paths. No automatic retry job or marketing automation is introduced.

References: [HubSpot service keys](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/authentication/account-service-keys), [marketing defaults](https://knowledge.hubspot.com/records/default-marketing-statuses-for-created-contacts).
