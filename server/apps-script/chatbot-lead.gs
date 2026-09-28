// Reference copy of the Apps Script on the CHATBOT workbook (Sheet1).
// The website contact form uses a different workbook — see inquiry-form.gs.
//
// The header row and its formatting are created by this code (ensureSheet).
//
// After editing: Deploy -> Manage deployments -> pencil -> Version: New
// version. Saving alone leaves the /exec URL running the old code.

const SHEET_NAME = "Sheet1";
const NOTIFICATION_EMAIL = "info@brightpaper.co.in";

// Date first, then time: 31/08/2026 11:45:03
const TIMESTAMP_FORMAT = "dd/MM/yyyy HH:mm:ss";

// Brand colours, matching tailwind.config.js
const BRAND_ORANGE = "#FF6B35";
const BRAND_GREEN = "#2D5016";

// Column order of the sheet, and the key each one reads from the lead object.
// Add a column here and it appears on the next lead — nothing else to change.
const COLUMNS = [
  { header: "Timestamp",            key: "timestamp",           width: 150 },
  { header: "Name",                 key: "name",                width: 150 },
  { header: "Phone",                key: "phone",               width: 130 },
  { header: "Product",              key: "product",             width: 170 },
  { header: "GSM",                  key: "gsm",                 width: 110 },
  { header: "Location",             key: "location",            width: 140 },
  { header: "Best Time to Call",    key: "callTime",            width: 150 },
  { header: "Requirement",          key: "requirement",         width: 300 },
  { header: "Conversation Summary", key: "conversationSummary", width: 400 },
  { header: "Source",               key: "source",              width: 140 }
];


// ==========================================
// MAIN POST API
// ==========================================

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No POST data received");
    }

    // Request data
    const data = JSON.parse(e.postData.contents);

    const lead = {
      timestamp: new Date(),

      name: data.name || "",

      phone: data.phone || data.mobile || "",

      product: data.product || "",

      gsm: data.gsm || data.GSM || "",

      location: data.location || "",

      callTime: data.callTime || "",

      requirement: data.requirement || data.Requirement || "",

      // The website sends "summary". The old code read only
      // "conversationSummary", so this column was blank on every lead.
      conversationSummary: data.summary || data.conversationSummary || "",

      source: data.source || "Website Chatbot"
    };

    const sheet = ensureSheet();

    sheet.appendRow(COLUMNS.map(function (column) {
      return lead[column.key];
    }));

    // Format the row we just wrote, rather than relying on setupSheet() having
    // been run. Sheets gives a row added beyond the current grid the workbook's
    // default format, so without this a sheet that outgrows its rows silently
    // goes back to the US date order.
    sheet.getRange(sheet.getLastRow(), 1).setNumberFormat(TIMESTAMP_FORMAT);

    // The row is already saved; a mail failure must not report it as lost.
    try {
      sendLeadEmail(lead);
    } catch (mailError) {
      console.error("lead saved, email failed: " + mailError);
    }

    return jsonOut({ success: true, message: "Lead submitted successfully" });

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

  // Only style a sheet that is still empty, so a lead never overwrites a header
  // you renamed by hand. Keeping this off the per-lead path also keeps the
  // response fast — run setupSheet() by hand on a sheet that already has rows.
  if (sheet.getLastRow() > 0) {
    return sheet;
  }

  styleSheet(sheet);
  return sheet;
}


function styleSheet(sheet) {

  const headers = COLUMNS.map(function (column) { return column.header; });

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setFontColor("#FFFFFF")
    .setBackground(BRAND_GREEN)
    .setVerticalAlignment("middle");

  COLUMNS.forEach(function (column, index) {
    sheet.setColumnWidth(index + 1, column.width);
  });

  // Column A stays a real date value — only its display changes, so sorting
  // and filtering by date still work.
  sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat(TIMESTAMP_FORMAT);

  // Long free text wraps instead of spilling across the row.
  sheet.getRange(2, columnIndex("requirement"), sheet.getMaxRows() - 1, 1).setWrap(true);
  sheet.getRange(2, columnIndex("conversationSummary"), sheet.getMaxRows() - 1, 1).setWrap(true);

  sheet.setRowHeight(1, 34);
  sheet.setFrozenRows(1);
}


function columnIndex(key) {
  for (let i = 0; i < COLUMNS.length; i++) {
    if (COLUMNS[i].key === key) return i + 1;
  }
  throw new Error("Unknown column key: " + key);
}


// Run this once by hand on a sheet that already has rows — ensureSheet() skips
// the styling there.
function setupSheet() {
  styleSheet(ensureSheet());
}


// ==========================================
// SEND EMAIL
// ==========================================

function sendLeadEmail(lead) {

  const rows = [
    ["Name", lead.name],
    ["Mobile Number", lead.phone],
    ["Best Time to Call", lead.callTime],
    ["Product", lead.product],
    ["GSM", lead.gsm],
    ["Delivery Location", lead.location],
    ["Requirement", lead.requirement]
  ];

  const tableRows = rows.map(function (row) {
    return '<tr>' +
      '<td style="padding:10px 16px;border-bottom:1px solid #E5E5E5;color:#737373;' +
      'font-size:13px;white-space:nowrap;vertical-align:top;">' + escapeHtml(row[0]) + '</td>' +
      '<td style="padding:10px 16px;border-bottom:1px solid #E5E5E5;color:#171717;' +
      'font-size:14px;font-weight:600;">' + escapeHtml(row[1] || "-") + '</td>' +
      '</tr>';
  }).join("");

  const callTimeNote = lead.callTime
    ? '<span style="color:#737373;font-size:13px;margin-left:12px;">Best time: ' +
      escapeHtml(lead.callTime) + '</span>'
    : '';

  const htmlBody =
    '<div style="background:#FAFAFA;padding:24px;font-family:Arial,Helvetica,sans-serif;">' +
      '<div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;' +
      'overflow:hidden;border:1px solid #E5E5E5;">' +

        '<div style="background:' + BRAND_GREEN + ';padding:20px 24px;">' +
          '<div style="color:#FFFFFF;font-size:18px;font-weight:bold;">New Chatbot Lead</div>' +
          '<div style="color:#C8D9BE;font-size:13px;margin-top:4px;">Bright Paper AI Chatbot</div>' +
        '</div>' +

        '<div style="padding:20px 24px 8px;">' +
          '<a href="tel:' + escapeHtml(lead.phone) + '" ' +
          'style="display:inline-block;background:' + BRAND_ORANGE + ';color:#FFFFFF;' +
          'text-decoration:none;font-weight:bold;font-size:14px;padding:10px 20px;' +
          'border-radius:8px;">Call ' + escapeHtml(lead.name || "customer") + '</a>' +
          callTimeNote +
        '</div>' +

        '<table style="width:100%;border-collapse:collapse;margin-top:12px;">' +
          tableRows +
        '</table>' +

        '<div style="padding:18px 24px;">' +
          '<div style="color:#737373;font-size:12px;text-transform:uppercase;' +
          'letter-spacing:0.5px;margin-bottom:6px;">Conversation Summary</div>' +
          '<div style="color:#171717;font-size:14px;line-height:1.6;">' +
            escapeHtml(lead.conversationSummary || "-") +
          '</div>' +
        '</div>' +

        '<div style="background:#F5F5F5;padding:14px 24px;color:#737373;font-size:12px;">' +
          escapeHtml(lead.source) + ' &nbsp;&middot;&nbsp; ' +
          Utilities.formatDate(lead.timestamp, Session.getScriptTimeZone(), TIMESTAMP_FORMAT) +
        '</div>' +

      '</div>' +
    '</div>';

  // Plain-text fallback for mail clients that will not render HTML.
  const plainBody = rows.map(function (row) {
    return row[0] + ": " + (row[1] || "-");
  }).join("\n") +
    "\n\nConversation Summary:\n" + (lead.conversationSummary || "-") +
    "\n\nSource: " + lead.source +
    "\nTime: " + lead.timestamp;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: "New Lead: " + (lead.name || "Unknown") + " - " + (lead.product || "enquiry"),
    body: plainBody,
    htmlBody: htmlBody
  });
}


function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


// ==========================================
// TEST LEAD — runs the real doPost path
// ==========================================

function testLead() {
  doPost({
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        phone: "9876543210",
        product: "Duplex Board",
        gsm: "300 GSM",
        location: "Surat",
        callTime: "After 5 pm",
        requirement: "Needs 300 GSM Duplex Board delivered to Surat.",
        summary: "Customer wants 300 GSM Duplex Board in 25 x 36 size for packaging.",
        source: "AI Chatbot"
      })
    }
  });
}


// ==========================================
// GET TEST
// ==========================================

function doGet() {
  return ContentService
    .createTextOutput("Bright Paper Chatbot Lead API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}


function jsonOut(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
