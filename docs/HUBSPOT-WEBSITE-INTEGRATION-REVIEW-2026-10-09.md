# HomesProfessional website - HubSpot CRM review

Updated October 10, 2026. **Deploy preview only. Production release is not approved.**

Review: [draft PR 169](https://github.com/CEUL-sites/MiamiDesk-Site-Final-1/pull/169).
[Preview](https://deploy-preview-169--miamidesk.netlify.app/).
Validated code commit: `9c10785669d465ceb3a8e2bfe768da27c93ac5c6`.
Netlify preview deploy `6ac9f654160bd000088692a6` is ready.
Production remains deploy `6ac8f755ad638000081021fa`; production CRM capture is disabled.

## Implemented behavior

Keep existing branded bilingual forms, CTA destinations, optional-email paths, fields, uploads, navigation and analytics. Capture seller, buyer, referral, agency, Spain seller, Global Desk and calculator inquiry text through the existing native Netlify event and direct server backup. WhatsApp/call/email clicks retain their existing behavior; clicks alone do not create contacts. AI Desk handoffs remain in Sheets because their structured identity is insufficient for CRM matching.

Match existing contacts by email, or one exact international phone match. Append an inquiry note without patching the existing profile, owner, lifecycle or communication restrictions. Create supplied-name/email/phone contacts when no match exists; new contacts are assigned to Carlos. Local-format phone numbers are not converted to guessed international identities.

Atomic inquiry claims prevent native/direct duplicate CRM writes. Claims use Blob `set` with conditional headers, avoiding the deployed 10.7.8 SDK's broken conditional `setJSON` behavior. Require an ETag before CRM writes. Static form schemas preserve timestamp, page and language, ensuring both submission paths calculate the same claim. Explicit Spanish language overrides document defaults. Spanish referral uses the exact native form name.

Inquiry notes record submitted text, source/attribution, language, preferences and consent. Uploaded files remain in Netlify; direct backup skips binary files. Notes may include attachment references supplied by the native event, but HubSpot attachment upload is not implemented or promised. A direct-first note may have no attachment references.

Failure and pending records are retained for manual reconciliation. No automatic replay is introduced. Search the recorded inquiry ID before recreating a note, since a timeout can follow a successful remote write. Do not blindly clear a pending claim and replay both submission paths.

No marketing/subscription/workflow APIs are called. Seller nurture enrollment and sending are gated off. HubSpot's free portal does not expose marketing-status properties here, so non-marketing classification has **not** been independently confirmed. The platform automatically assigns its default Lead lifecycle and associates matching email-domain companies for new contacts; the website does not request those changes. Review portal defaults and independent automations before release.

## Secure configuration

The approved service key **HomesProfessional Website Inquiry CRM** was created with contacts.read and contacts.write only. Its value is held in Netlify as a secret, Functions scope, Deploy Previews context only; it is absent from source and client bundles.

| Setting | Current configuration |
| --- | --- |
| HUBSPOT_SYNC_ENABLED | Preview true; production/branch/local false |
| HUBSPOT_ACCESS_TOKEN | Secret; Functions; Deploy Previews only |
| HUBSPOT_OWNER_ID | Carlos owner ID 100759119 |
| SELLER_NURTURE_ENABLED | False |
| LEAD_STORE_NAMESPACE | preview-169 for this deploy preview |

Preview CRM claims and recovery records use separate store names. Netlify Forms remains site-level storage: labeled preview submissions appear there, while production submissions remain intact.

## Verified results

- TypeScript passes. All 38 local tests passed after the atomic claim/schema repair; the 13 focused CRM tests passed after attribution/form-name updates. Local esbuild process creation is blocked, so a synchronous TypeScript loader was used.
- [GitHub Actions run 38037789464](https://github.com/CEUL-sites/MiamiDesk-Site-Final-1/actions/runs/38037789464) completed successfully for the validated code commit. Netlify preview build/deploy succeeded; secret scan reported no matches.
- Previous journal verification passed for 122 posts and ten repository verification scripts passed. The inherited homepage verifier expects the retired Listing Strategist title; approved main uses Listing Agent.
- Repository-required technical/compliance reviews approved the changes.
- Buyer desktop submission: one contact and one inquiry note; correct budget, financing, timeline, preferred contact and attribution; thank-you navigation works.
- Phone-only seller hero: one contact without fabricated email and one note; unchecked messaging consent remains no; existing first-touch attribution preserved.
- Spanish Madrid seller at 390x844: success shown; exactly one additional note on the buyer test contact; language es, page path and campaign attribution correct; existing name and owner preserved.
- Spanish referral: correct Spanish thank-you page and exactly one additional note on that same contact; licensee/company/client summary/preferred contact fields and language es preserved.
- Agency inquiry: thank-you navigation works; one note preserves role, country, agency, WhatsApp and inventory fields.
- Two-step seller intake: property/contact progression and seller thank-you navigation work; one note preserves valuation band, occupancy, timeline, prior-listing text and unchecked messaging consent.
- Netlify confirms all six tested submissions retained. Native form schemas still include Global Desk image/document fields.
- HubSpot history shows exactly five notes on the shared repeat-contact test contact, one per inquiry.

| Test contact | Inquiry notes |
| --- | --- |
| [Buyer and Spanish repeat-contact test](https://app.hubspot.com/contacts/149513532/record/0-1/887792638191?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search) | [Buyer](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526258182359%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [Spanish seller](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526310781165%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [Spanish referral](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526310557945%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [Agency](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526310702293%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search), [Seller intake](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526306276567%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search) |
| [Phone-only seller test](https://app.hubspot.com/contacts/149513532/record/0-1/887925374149?utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search) | [Seller inquiry](https://app.hubspot.com/contacts/149513532/objects/0-46/views/all/list?filters=%5B%7B%22property%22%3A%22hs_object_id%22%2C%22operator%22%3A%22EQ%22%2C%22value%22%3A%22526310451395%22%7D%5D&utm_source=app_12360546_mcp&utm_medium=ai_agent&utm_campaign=search) |

Earlier labeled test duplicates from the initial SDK defect remain for audit. No contact deletion or merge was performed.

## Remaining release blockers

1. **Global Desk upload end-to-end test is incomplete.** Chrome's file chooser flow failed. Enable Allow access to file URLs in the ChatGPT extension Details at chrome://extensions, then repeat a labeled attachment test and verify the retained Netlify file. A filled activation test remains open and unsubmitted. Do not treat static-schema preservation as upload proof.
2. **Existing alert providers fail in preview.** Resend returns 403 because homesprofessional.com is unverified; CallMeBot returned 503/403. Sheets delivery is not independently confirmed. Netlify Submission notifications says no webhooks are configured. Do not claim acknowledgments, email or WhatsApp delivery works. Correct and verify a sender/notification route before release.
3. Live Global Desk attachment flow still needs final end-to-end confirmation. Unit coverage does not replace the upload check.
4. HubSpot onboarding remains incomplete. Capture works, but review portal defaults/communication restrictions and intended operational follow-up before production activation.
5. Carlos must approve the concrete production release after blockers are resolved. Production needs an approved server secret and enablement, fresh main comparison, merge/deploy, then public desktop/mobile and key lead-flow verification.

Buyer confirmation copy now promises personal follow-up by the selected method instead of falsely asserting an email has already been sent. No prices, mandates, public marketing claims or unrelated user edits changed.
