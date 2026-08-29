/**
 * ARAK enquiry form -> Google Sheet.
 *
 * This is the endpoint src/lib/enquiry.ts posts to. It appends one row per
 * enquiry and emails a notification. It costs nothing and has no submission
 * cap; the only quota that applies is MailApp's 100 notification emails a day,
 * which is far above the volume this form will see.
 *
 * ---------------------------------------------------------------------------
 * DEPLOYING IT  (about five minutes, all in the browser)
 * ---------------------------------------------------------------------------
 *
 * 1. Open the enquiries Sheet:
 *    https://docs.google.com/spreadsheets/d/1oFuqe_K2iu8CPAOkFLDueRJBNg8dQTHcIDXSmRNf6wA/edit
 *
 * 2. Extensions -> Apps Script. Delete whatever is in Code.gs and paste this
 *    whole file in its place. Save.
 *
 * 3. Run the `setupSheet` function once (pick it from the dropdown, press Run).
 *    Google will ask you to authorise it — that is expected, it is your own
 *    script asking for access to your own Sheet. This writes the header row.
 *
 * 4. Deploy -> New deployment -> gear icon -> Web app.
 *       Description:   ARAK enquiry endpoint
 *       Execute as:    Me
 *       Who has access: Anyone            <- required; "Anyone with Google
 *                                            account" will reject the form
 *    Press Deploy, authorise again if asked, and copy the Web app URL. It ends
 *    in /exec.
 *
 * 5. Put that URL into Netlify:
 *       Site configuration -> Environment variables -> Add a variable
 *       Key:   NEXT_PUBLIC_ENQUIRY_ENDPOINT
 *       Value: the /exec URL from step 4
 *    Then redeploy the site so the build picks it up.
 *
 * 6. Send a test enquiry from the live contact page and check the Sheet.
 *
 * ---------------------------------------------------------------------------
 * UPDATING A SHEET THAT IS ALREADY LIVE
 * ---------------------------------------------------------------------------
 *
 * Paste the new script over the old one, then run `addHeardAboutColumns` once
 * (not `setupSheet` — that one clears the tab and would delete every enquiry
 * received so far). Then Deploy -> Manage deployments -> pencil -> Version:
 * New version, as below.
 *
 * NOTE ON RE-DEPLOYING: if you ever edit this script, use
 * Deploy -> Manage deployments -> pencil -> Version: New version. Creating a
 * *new deployment* instead gives you a different URL and the form will keep
 * posting to the old one.
 * ---------------------------------------------------------------------------
 */

/** The tab the rows are written to. Created by setupSheet if missing. */
var SHEET_NAME = 'Enquiries';

/** Who gets told when an enquiry lands. */
var NOTIFY = 'info@arak-sa.com';

var HEADERS = [
  'Received',
  'Name',
  'Company',
  'Email',
  'Phone',
  'Project type',
  'Brief',
  'Heard about us',
  'Heard about us (detail)',
  'Language',
  'Source page',
];

/** Run once, by hand, to create the tab and its header row. */
function setupSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);

  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight('bold')
    .setBackground('#f6f5f3');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 150); // Received
  sheet.setColumnWidth(7, 480); // Brief
  sheet.setColumnWidth(9, 220); // Heard about us (detail)
  return 'Ready.';
}

/**
 * Adds the two "Heard about us" columns to a Sheet that already holds
 * enquiries. Run this once, by hand, when updating an existing deployment.
 *
 * Do NOT run setupSheet for this. setupSheet calls sheet.clear() and would
 * take every enquiry ever received with it; it is only for a Sheet that has
 * never been used.
 *
 * The columns are inserted after Brief rather than appended at the end, so
 * Language and Source page stay where they have always been relative to the
 * rest. insertColumnsAfter shifts existing rows with them, so no row loses
 * alignment with its own data.
 *
 * Safe to run twice: it checks the header first and does nothing if the
 * columns are already there.
 */
function addHeardAboutColumns() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) return say('No "' + SHEET_NAME + '" tab yet. Run setupSheet instead.');

  if (sheet.getRange(1, 8).getValue() === 'Heard about us') {
    return say('Already added. Nothing to do.');
  }

  sheet.insertColumnsAfter(7, 2); // after Brief
  sheet.getRange(1, 8, 1, 2)
    .setValues([['Heard about us', 'Heard about us (detail)']])
    .setFontWeight('bold')
    .setBackground('#f6f5f3');
  sheet.setColumnWidth(9, 220);
  return say('Added. Existing rows keep their data and leave the two new cells blank.');
}

/**
 * Prints to the Execution log as well as returning.
 *
 * The editor shows a function's logged output but never its return value, so a
 * function that only returns a message runs to a blank log and leaves you
 * guessing whether it did anything.
 */
function say(message) {
  console.log(message);
  return message;
}

/**
 * Receives the form POST.
 *
 * The site sends `text/plain` on purpose — it is one of the few content types a
 * browser will send cross-origin without a preflight OPTIONS request, which
 * Apps Script cannot answer. The body is still JSON, and arrives here as a
 * string in e.postData.contents.
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) return reply(false, 'Empty request');

    var data = JSON.parse(e.postData.contents);

    // The form's own spam guards have already run in the browser; this is the
    // same check server-side, because anything public gets posted to directly.
    if (data['company-website']) return reply(true, 'Discarded');

    var required = ['name', 'email', 'brief'];
    for (var i = 0; i < required.length; i++) {
      if (!String(data[required[i]] || '').trim()) {
        return reply(false, 'Missing ' + required[i]);
      }
    }

    var book = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = book.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = book.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // Riyadh time, so the timestamps read the way the office does.
    var received = Utilities.formatDate(new Date(), 'Asia/Riyadh', 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      received,
      clean(data.name),
      clean(data.company),
      clean(data.email),
      clean(data.phone),
      clean(data.projectType),
      clean(data.brief),
      clean(data.heardFrom),
      clean(data.heardFromDetail),
      clean(data.lang),
      clean(data.source),
    ]);

    notify(data, received);
    return reply(true, 'Saved');
  } catch (err) {
    // Logged to the Apps Script execution log rather than swallowed, so a
    // failure can be found later. Executions tab in the Apps Script editor.
    console.error(err);
    return reply(false, String(err));
  }
}

/** A GET on the endpoint — someone opening the URL — gets a plain answer. */
function doGet() {
  return ContentService
    .createTextOutput('ARAK enquiry endpoint. POST only.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/** Trims, and caps length so one bad actor cannot write a novel into a cell. */
function clean(value) {
  return String(value == null ? '' : value).trim().slice(0, 5000);
}

/**
 * How the channel reads in the notification email. "Other" on its own is a
 * real answer and stays as it is; anything typed alongside it is appended
 * rather than replacing it, so the bucket is never lost.
 */
function heardLine(data) {
  var channel = String(data.heardFrom || '').trim();
  var detail = String(data.heardFromDetail || '').trim();
  if (!channel) return '—';
  return detail ? channel + ': ' + detail : channel;
}

function reply(ok, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: ok, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Emails the office. Reply-To is set to the enquirer, so hitting reply in Gmail
 * writes back to them rather than to the script.
 */
function notify(data, received) {
  try {
    var lines = [
      'Name:         ' + (data.name || ''),
      'Company:      ' + (data.company || '—'),
      'Email:        ' + (data.email || ''),
      'Phone:        ' + (data.phone || '—'),
      'Project type: ' + (data.projectType || '—'),
      'Heard via:    ' + heardLine(data),
      'Language:     ' + (data.lang || ''),
      'Page:         ' + (data.source || ''),
      'Received:     ' + received + ' (Riyadh)',
      '',
      'Brief',
      '-----',
      data.brief || '',
    ].join('\n');

    MailApp.sendEmail({
      to: NOTIFY,
      subject: 'Lighting enquiry — ' + (data.name || 'website') +
        (data.company ? ' (' + data.company + ')' : ''),
      body: lines,
      replyTo: data.email || NOTIFY,
      name: 'ARAK website',
    });
  } catch (err) {
    // A failed notification must never lose the row that was already written.
    console.error('Notification failed: ' + err);
  }
}
