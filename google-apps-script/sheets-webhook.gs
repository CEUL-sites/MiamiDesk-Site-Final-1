/**
 * HomesProfessional.com — Google Sheets Lead Webhook
 *
 * A backup log of every website inquiry. HubSpot is the system of record;
 * this sheet keeps a plain row per lead in case the CRM sync is ever down.
 *
 * SETUP (current deployment: sheet "HomesProfessional Website Leads", 2026-11-13):
 * 1. Open the Google Sheet → Extensions → Apps Script.
 * 2. Replace the editor contents with this file and Save.
 * 3. Deploy → New deployment → type "Web app".
 *    Execute as: Me · Who has access: Anyone → Deploy, authorize, copy the /exec URL.
 * 4. Netlify → Project configuration → Environment variables:
 *    GOOGLE_SHEETS_WEBHOOK_URL = <the /exec URL>, then redeploy.
 *
 * If you edit this script later, use Deploy → Manage deployments → edit the
 * existing deployment → "New version". That keeps the same /exec URL. A brand-new
 * deployment gets a new URL and Netlify must be updated (the 2026-11 outage was a
 * deleted deployment returning 404).
 */

var SHEET_NAME = "Leads";
var HEADERS = [
  "Timestamp", "Tier", "Score", "Form", "Name", "Email", "Phone",
  "Property / Area", "City / Country", "Timeline", "Message",
  "Lead Source", "Landing Page", "All Fields",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getOrCreateSheet();
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.tier || "",
      data.score === undefined ? "" : data.score,
      data.formType || data.sourcePage || "",
      data.name || "",
      data.email || "",
      // Leading apostrophe keeps "+1 954…" from being parsed as a formula/number.
      data.phone ? "'" + data.phone : "",
      data.propertyAddress || "",
      data.city || "",
      data.timeline || "",
      data.message || "",
      data.leadSource || "",
      data.landingPage || "",
      data.details || "",
    ]);
    return json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return json({ error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Run manually from the Apps Script editor to verify the sheet is writable.
function testWebhook() {
  var result = doPost({ postData: { contents: JSON.stringify({
    tier: "P3", score: 0, formType: "manual-test", name: "Apps Script Test",
    email: "test@example.invalid", message: "Manual test from the Apps Script editor",
  }) } });
  Logger.log(result.getContent());
}
