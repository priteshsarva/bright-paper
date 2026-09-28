// Bright Paper — contact form inquiries.
//
// Lives on its OWN workbook, separate from the chatbot lead workbook.
// Create it from that new sheet via Extensions -> Apps Script, so
// getActiveSpreadsheet() points at the right book.
//
// The sheet, its header row and its formatting are all created by this code
// (ensureSheet), so a blank workbook is enough to start.
//
// After editing: Deploy -> Manage deployments -> pencil -> Version: New
// version. Saving alone leaves the /exec URL running the old code.

const SHEET_NAME = "Inquiry Data";

// Date first, then time: 31/08/2026 11:45:03
const TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss";
const NOTIFICATION_EMAIL = "info@brightpaper.co.in";

// Column order of the sheet, and the key each one reads from the JSON the
// website posts. Add a column here and it appears on the next submission —
// nothing else needs changing.
const COLUMNS = [
  { header: "Timestamp",          key: null,               width: 150 },
  { header: "Full Name",          key: "name",             width: 150 },
  { header: "Company Name",       key: "company",          width: 180 },
  { header: "Email",              key: "email",            width: 220 },
  { header: "Phone",              key: "phone",            width: 130 },
  { header: "Inquiry Type",       key: "inquiry_type",     width: 140 },
  { header: "Product Interest",   key: "product_interest", width: 180 },
  { header: "Estimated Quantity", key: "quantity",         width: 150 },
  { header: "Message",            key: "message",          width: 400 }
];


// ==========================================
// MAIN POST API
// ==========================================

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST data received");
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = ensureSheet();

    // null key = Timestamp, which this script fills in itself.
    const row = COLUMNS.map(function (column) {
      if (column.key === null) return new Date();
      return data[column.key] || "";
    });

    sheet.appendRow(row);

    // Format the row we just wrote, rather than relying on setupSheet() having
    // been run. Sheets gives a row added beyond the current grid the workbook's
    // default format, so without this a sheet that outgrows its rows silently
    // goes back to the US date order.
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat(TIMESTAMP_FORMAT);

    // The row is already saved; a mail failure must not report it as lost.
    try {
      sendInquiryEmail(data);
    } catch (mailError) {
      console.error("inquiry saved, email failed: " + mailError);
    }

    return jsonOut({ success: true, message: "Inquiry submitted successfully" });

  } catch (error) {
    console.error(error);
    return jsonOut({ success: false, error: error.message });
  }
}


// ==========================================
// SHEET + COLUMNS, CREATED BY CODE
// ==========================================

function ensureSheet() {

  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
  }

  // Only write the headers when row 1 is still empty, so a submission never
  // overwrites a header you renamed by hand. Everything below this line is
  // one-time setup — keeping it off the per-submission path is what stops a
  // full-column write from being charged to every visitor's wait.
  if (sheet.getLastRow() > 0) {
    return sheet;
  }

  applyTimestampFormat(sheet);

  const headers = COLUMNS.map(function (column) { return column.header; });

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground("#5A8F2E")
    .setFontColor("#FFFFFF");

  COLUMNS.forEach(function (column, index) {
    sheet.setColumnWidth(index + 1, column.width);
  });

  sheet.setFrozenRows(1);

  return sheet;
}


// The format is set on the whole column once, so rows appended later inherit
// it — no need to re-apply on every submission.
function applyTimestampFormat(sheet) {
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat(TIMESTAMP_FORMAT);
}


// ==========================================
// SEND EMAIL
// ==========================================

function sendInquiryEmail(data) {

  const subject = "📩 New Bright Paper Website Inquiry";

  const body = `
New inquiry received from the Bright Paper website contact form.

━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━━━

Name: ${data.name || "-"}
Company: ${data.company || "-"}
Email: ${data.email || "-"}
Phone: ${data.phone || "-"}

━━━━━━━━━━━━━━━━━━━━━━
REQUIREMENT
━━━━━━━━━━━━━━━━━━━━━━

Inquiry Type: ${data.inquiry_type || "-"}
Product Interest: ${data.product_interest || "-"}
Estimated Quantity: ${data.quantity || "-"}

━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━

${data.message || "-"}

━━━━━━━━━━━━━━━━━━━━━━

Source: Website Contact Form
Time: ${new Date()}

Bright Paper Website
`;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body
  });
}


// ==========================================
// SETUP — optional; doPost calls ensureSheet anyway
// ==========================================

// Run this once by hand on a sheet that already has rows — ensureSheet()
// skips the one-time setup there.
function setupSheet() {
  applyTimestampFormat(ensureSheet());
}


// ==========================================
// TEST — run from the editor, no deployment needed
// ==========================================

function testInquiry() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        company: "Test Pvt Ltd",
        email: "test@example.com",
        phone: "9876543210",
        inquiry_type: "Bulk Order",
        product_interest: "Duplex Board",
        quantity: "5 Tons",
        message: "Test inquiry from the Apps Script editor."
      })
    }
  });
}


// ==========================================
// GET TEST
// ==========================================

function doGet() {
  return ContentService
    .createTextOutput("Bright Paper Inquiry API is running ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}


function jsonOut(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
