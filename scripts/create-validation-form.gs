/**
 * Creates the "Maintenance Request Workflow — Research Interview" Google Form
 * and its linked response spreadsheet, per marketing/google-form-setup.md.
 *
 * Usage: paste into a new Apps Script project (script.google.com), run
 * createValidationForm(), approve the Forms/Sheets scopes, then read the
 * URLs in the execution log.
 *
 * Safe to run once: after a successful run the created IDs are stored in
 * Script Properties, and later runs only log the existing URLs.
 * To deliberately start over, run resetValidationFormGuard() first.
 *
 * This script does not send email, publish links, or contact anyone.
 * Review the form before sharing its link.
 */

var FORM_TITLE = 'Maintenance Request Workflow — Research Interview';
var SHEET_NAME = 'Maintenance Workflow Validation';

var FORM_DESCRIPTION =
  "I'm researching how property managers handle maintenance requests from " +
  "intake to resolution. This is research only — nothing is being sold. If " +
  "there's a fit, I'll email you a link to book a 15-minute call. Please don't " +
  'include any tenant, resident, or vendor details. Takes about 2 minutes.';

var CONFIRMATION_MESSAGE =
  "Thanks! If there's a fit, you'll get an email with a link to book a time. " +
  'If not, I may not follow up — thank you for taking the time.';

var CONSENT_TEXT =
  'I agree to be contacted by email about a 15-minute research interview. ' +
  'I understand this is not a sales call, participation is voluntary, I can ' +
  'withdraw at any time, and I can ask for my details to be deleted.';

var PROP_FORM_ID = 'VALIDATION_FORM_ID';
var PROP_SHEET_ID = 'VALIDATION_SHEET_ID';

function createValidationForm() {
  var props = PropertiesService.getScriptProperties();
  var existingFormId = props.getProperty(PROP_FORM_ID);
  if (existingFormId) {
    var existingForm = FormApp.openById(existingFormId);
    var existingSheet = SpreadsheetApp.openById(props.getProperty(PROP_SHEET_ID));
    logUrls_('Form already created by this script — nothing new was created.',
      existingForm, existingSheet);
    return;
  }

  var form = FormApp.create(FORM_TITLE);
  form.setDescription(FORM_DESCRIPTION);

  // Q1
  form.addMultipleChoiceItem()
    .setTitle('What is your role in handling maintenance requests?')
    .setChoiceValues([
      'I manage or coordinate maintenance requests myself',
      'I oversee someone who coordinates them',
      "I'm occasionally involved",
      "I'm not involved in maintenance requests"
    ])
    .setRequired(true);

  // Q2
  form.addCheckboxItem()
    .setTitle('What type of property do you manage?')
    .setChoiceValues([
      'Residential rental — single-family',
      'Residential rental — multifamily',
      'HOA / condo association',
      'Commercial'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Q3
  form.addMultipleChoiceItem()
    .setTitle('Which best describes your organization?')
    .setChoiceValues([
      'Self-managing owner / landlord',
      'Independent or small property management company',
      'Larger property management company'
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Q4
  form.addMultipleChoiceItem()
    .setTitle('Roughly how many units do you manage?')
    .setChoiceValues(['1–10', '11–50', '51–200', '201–500', 'More than 500'])
    .setRequired(true);

  // Q5
  form.addMultipleChoiceItem()
    .setTitle('When did you last handle or oversee a maintenance request?')
    .setChoiceValues([
      'In the last 30 days',
      '1–6 months ago',
      'More than 6 months ago'
    ])
    .setRequired(true);

  // Q6 (optional)
  form.addCheckboxItem()
    .setTitle('What do you currently use to track maintenance requests?')
    .setHelpText('If you use property-management software, you can name it under Other.')
    .setChoiceValues([
      'Property-management software',
      'Spreadsheet',
      'Email / text messages',
      'Paper or notebook'
    ])
    .showOtherOption(true)
    .setRequired(false);

  // Q7
  form.addTextItem()
    .setTitle('First name')
    .setRequired(true);

  // Q8
  form.addTextItem()
    .setTitle('Email address for scheduling')
    .setValidation(FormApp.createTextValidation()
      .setHelpText('Please enter a valid email address.')
      .requireTextIsEmail()
      .build())
    .setRequired(true);

  // Q9
  form.addListItem()
    .setTitle('Time zone')
    .setChoiceValues([
      'Pacific (PT)',
      'Mountain (MT)',
      'Central (CT)',
      'Eastern (ET)',
      'Alaska (AKT)',
      'Hawaii (HT)',
      'Atlantic (AT)',
      'UK / Ireland (GMT/BST)',
      'Central Europe (CET)',
      'Australia — Eastern (AET)',
      'Other'
    ])
    .setRequired(true);

  // Q10
  form.addCheckboxItem()
    .setTitle('Consent')
    .setChoiceValues([CONSENT_TEXT])
    .setRequired(true);

  // Settings supported by FormApp
  form.setConfirmationMessage(CONFIRMATION_MESSAGE);
  form.setCollectEmail(false);            // Q8 already asks for email
  form.setLimitOneResponsePerUser(false); // true would force Google sign-in
  form.setAllowResponseEdits(false);
  form.setProgressBar(false);             // single page
  form.setShowLinkToRespondAgain(false);
  form.setPublishingSummary(false);       // respondents can't see others' answers
  form.setIsQuiz(false);

  // Response spreadsheet
  var sheet = SpreadsheetApp.create(SHEET_NAME);
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  props.setProperty(PROP_FORM_ID, form.getId());
  props.setProperty(PROP_SHEET_ID, sheet.getId());

  logUrls_('Created form and response spreadsheet.', form, sheet);
}

/** Clears the run-once guard. Does not delete the existing form or sheet. */
function resetValidationFormGuard() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty(PROP_FORM_ID);
  props.deleteProperty(PROP_SHEET_ID);
  Logger.log('Guard cleared. The next run of createValidationForm() will create a NEW form and sheet.');
}

function logUrls_(heading, form, sheet) {
  Logger.log('==============================================');
  Logger.log(heading);
  Logger.log('Form URL (for respondents): ' + form.getPublishedUrl());
  Logger.log('Form edit URL:              ' + form.getEditUrl());
  Logger.log('Response spreadsheet URL:   ' + sheet.getUrl());
  Logger.log('Manual steps: share the sheet with the research team only; ' +
    'submit one test response, confirm it lands in the sheet, then delete it.');
  Logger.log('==============================================');
}
