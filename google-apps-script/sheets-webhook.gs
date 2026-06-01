/**
 * HomesProfessional.com — Google Sheets Lead Webhook
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet (the one connected to AppSheet).
 * 2. Click Extensions → Apps Script.
 * 3. Delete any existing code in the editor.
 * 4. Paste this entire file.
 * 5. Click Save (disk icon).
 * 6. Click Deploy → New deployment.
 * 7. Type: Web app
 * 8. Execute as: Me
 * 9. Who has access: Anyone
 * 10. Click Deploy → copy the /exec URL.
 * 11. In Netlify → Site configuration → Environment variables,
 *     add: GOOGLE_SHEETS_WEBHOOK_URL = <paste the URL here>
 * 12. Redeploy the Netlify site (or it picks up on the next deploy).
 *
 * COLUMNS WRITTEN (auto-created on first submission):
 * Timestamp | Source Form | Name | Email | Phone |
 * Property Address | City | Timeline | Message
 */

var SHEET_NAME = "Leads"; // Change to match your sheet tab name (or leave as "Leads" and rename the tab)

function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp  || new Date().toISOString(),
      data.sourcePage || "",
      data.name       || "",
      data.email      || "",
      data.phone      || "",
      data.propertyAddress || "",
      data.city       || "",
      data.timeline   || "",
      data.message    || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("Webhook error:", err);
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Write header row if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Source Form",
      "Name",
      "Email",
      "Phone",
      "Property Address",
      "City",
      "Timeline",
      "Message",
    ]);
    // Bold + freeze the header
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

// Quick test — run this manually from Apps Script to verify it works
function testWebhook() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp:       new Date().toISOString(),
        sourcePage:      "seller-intake",
        name:            "Test Lead",
        email:           "test@example.com",
        phone:           "+1 954-555-0000",
        propertyAddress: "123 Test St",
        city:            "Coral Gables",
        timeline:        "3-6 months",
        message:         "Test submission from Apps Script",
      })
    }
  };
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}
