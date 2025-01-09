const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const idamHelper = require('../helpers/idam_helper');
const fregHelper = require('../helpers/freg_helper');
const CONF = require('config');

const randomData = require('../helpers/random_data');

const adminUserName = 'feeregadmin.' + randomData.getRandomEmailAddress();
const adminPassword = randomData.getRandomUserPassword();
const approverUserName = 'feeregapprover.' + randomData.getRandomEmailAddress();
const approverPassword = randomData.getRandomUserPassword();
const editorUserName = 'feeregeditor.' + randomData.getRandomEmailAddress();
const editorPassword = randomData.getRandomUserPassword();

let feeCode;

Feature('CC FeesRegister Admin Acceptance Tests For Editor');

BeforeSuite(async() => {
  await idamHelper.createUserUsingTestingSupportService('Admin', adminUserName, adminPassword, ['freg', 'freg-admin']);
  await idamHelper.createUserUsingTestingSupportService('Approver', approverUserName, approverPassword, ['freg', 'freg-approver']);
  await idamHelper.createUserUsingTestingSupportService('Editor', editorUserName, editorPassword, ['freg', 'freg-editor']);
});

After(async () => {
  if(feeCode) {
    await fregHelper.deleteFee(adminUserName, adminPassword, feeCode)
  }
});

Scenario('@functional FeesRegister Admin Console Editor Header and Tab Validation', ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Live fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click("Approved but not live fees");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Approved but not live fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.see("Code");
  I.click("Discontinued fees");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Discontinued fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.see("Code");
  I.see("Reference Data");
  I.click("Reference Data");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Applicants","10");
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Admin Console Editor Screen For Live Fees Details', ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Live fees');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.verifyFeesHeaders();
  //verify any existing fee details under live Tab
  if (CONF.e2e.frontendUrl.includes("aat")) {
    I.verifyFeeDetails('live', 'FEE0002','1.2','Family Proceedings Fees Order 2008','divorce','issue','Filing an application for a divorce, nullity or civil partnership dissolution',
      '2021 No 985','The Court Fees (Miscellaneous Amendments) Order 2021','family','family court','fixed','Flat','593.00','',
      '30 September 2021', '', '6', 'Inflationary Increase', '4481102159', 'RECEIPT OF FEES - Family issue divorce', 'inflationary', 'all', 'DivorceCivPart', 'default', 'approved', 'cef56daa-572c-464b-bd32-4a487c771d47', 'pkiauq puuujbhe');
  } else if (CONF.e2e.frontendUrl.includes("demo")) {
    I.verifyFeeDetails('live', 'FEE0002','1.2','Family Proceedings Fees Order 2008','divorce','issue','Filing an application for a divorce, nullity or civil partnership dissolution',
      '2021 No 985','The Court Fees (Miscellaneous Amendments) Order 2021','family','family court','fixed','Flat','593.00','',
      '30 September 2021', '', '6', 'Inflationary Increase', '4481102159', 'RECEIPT OF FEES - Family issue divorce', 'inflationary', 'all', 'DivorceCivPart', 'default', 'approved', 'cef56daa-572c-464b-bd32-4a487c771d47', 'TOTO TOTO');
  }
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Admin Console Editor Approved but not live Fees Details Check', async ({ I }) => {
  let feeObj = await I.addNewFeeAndSubmitForApprovalUsingApi(editorUserName, editorPassword);
  feeCode = feeObj.feeCode;
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.retry(3).verifyFeesSentForApprovalAndApprove();
  I.click('Sign out');
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Approved but not live fees');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.verifyFeesHeaders();
  I.see(feeObj.feeCode);
  let parsedDate = I.parseDate(feeObj.fromDate);
  I.verifyFeeDetails('notLive',feeObj.feeCode,feeObj.feeKeyword,feeObj.feeKeyword,'divorce','hearing','E2E Testing',
    feeObj.feeKeyword,'', 'family', 'family court', 'fixed', 'Flat', '120.00', '', parsedDate, '', '', '1', '', '232425',
    feeObj.memoLineNumber, 'enhanced', 'all', feeObj.feeKeyword, 'online', 'approved', 'Editor User', 'Approver User');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional @crossbrowser FeesRegister Admin Console Editor Discontinued Fees Details Check', ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.RejectFeeRegAdminWebCookies
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Discontinued fees');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  if (CONF.e2e.frontendUrl.includes("aat")) {
    I.verifyFeeDetails('discontinued', 'FEE0227', '5.3', 'Family Proceedings Fees Order 2008', 'other', 'general application', 'Application (on notice) (unless otherwise listed)',
      '2014 No 877', 'The Family Proceedings Fees (Amendment) Order 2014', 'family', 'family court', 'fixed', 'Flat', '155.00', '', '21 April 2014', '29 September 2021', '1', '', '4481102165', 'RECEIPT OF FEES - Family GA other',
      'cost recovery', 'all', 'GAOnNotice', 'default', 'approved', '124756', 'pkiauq puuujbhe');
  } else if (CONF.e2e.frontendUrl.includes("demo")) {
    I.verifyFeeDetails('discontinued', 'FEE0227', '5.3', 'Family Proceedings Fees Order 2008', 'other', 'general application', 'Application (on notice) (unless otherwise listed)',
      '2014 No 877', 'The Family Proceedings Fees (Amendment) Order 2014', 'family', 'family court', 'fixed', 'Flat', '155.00', '', '21 April 2014', '29 September 2021', '1', '', '4481102165', 'RECEIPT OF FEES - Family GA other',
      'cost recovery', 'all', 'GAOnNotice', 'default', 'approved', 'ltlfnujoi hgptjqehf', 'TOTO TOTO');
  }
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);


//This is going to fixed in the ticket  https://tools.hmcts.net/jira/browse/PAY-6446
// Scenario('@functional FeesRegister Add New Fee and Submit for Approval', async ({ I }) => {
//
//   const feeKeyword = "SN" + new Date().valueOf().toString();
//   let fromDate = new Date();
//   console.log("fromDate: " + fromDate);
//   let formattedFromDate = fromDate.toLocaleDateString('en-GB');
//   console.log("formattedFromDate: " + formattedFromDate);
//
//   I.login(editorUserName, editorPassword);
//   I.wait(CCFRATConstants.fiveSecondWaitTime);
//   I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
//   await I.addNewFee(feeKeyword, formattedFromDate);
//   I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
//   I.click('View draft fee');
//   I.wait(CCFRATConstants.fiveSecondWaitTime);
//   I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
//   I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
//   I.click('.govuk-tabs__panel > div > div > table > tbody > tr:nth-child(1) > td:nth-child(7) > a');
//
//   I.submitForApproval();
//   await I.getFeeCode();
//   I.click('Sign out');
// }).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Edit Fee and submit for Approval', async ({ I }) => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  let fromDate = new Date();
  fromDate.setDate(fromDate.getDate() + 2);

  feeCode = await I.createNewFeeApi(editorUserName, editorPassword, fromDate, feeKeyword);
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Drafts', CCFRATConstants.tenSecondWaitTime);
  I.click(`//td/a[contains(@href, ${feeCode})]`);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.editDraft();
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click(`//td/a[contains(@href, ${feeCode})]`);
  I.submitForApproval();
  I.waitForText(`${feeCode} has been submitted for approval`);
  I.click('View draft fees');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Awaiting approval', CCFRATConstants.tenSecondWaitTime);
  I.click(`//td/a[contains(@href, ${feeCode})]`);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.dontSeeElement('Edit fee')
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Delete the Fee', async ({ I }) => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  let fromDate = new Date();
  fromDate.setDate(fromDate.getDate() + 2);

  feeCode = await I.createNewFeeApi(editorUserName, editorPassword, fromDate, feeKeyword);
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Drafts', CCFRATConstants.tenSecondWaitTime);
  I.click('.govuk-tabs__panel > div > div > table > tbody > tr:nth-child(1) > td:nth-child(7) > a');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.deleteFees();
  I.waitForText(`${feeCode} has been deleted`, CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

// Version To field is appearing in latest version even though that's not filled out as part of creating fee
Scenario('@functional FeesRegister Verify Version details for existing fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0002');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee versions', CCFRATConstants.tenSecondWaitTime);
  I.click('Fee versions');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  if (CONF.e2e.frontendUrl.includes("aat")) {
    I.verifyCurrentFeeVersion('5', 'Previously: 4', 'Filing an application for a divorce, nullity or civil partnership dissolution', 'Previously: Filing an application for a divorce, nullity or civil partnership dissolution – fees order 1.2.',
      '2016 No 402', 'Previously: 2016 No. 402 (L. 5)', '29 September 2021', 'Previously: 20 March 2016', 'RECEIPT OF FEES - Family issue divorce', 'Previously: GOV - App for divorce/nullity of marriage or CP',
      '124756', 'Previously:', 'pkiauq puuujbhe', 'Previously:', 'FEE0002', 'divorce', 'issue', 'family', 'family court', 'fixed', 'Flat', 'all', '', 'default', '550', '1.2', '', '', 'The Civil Proceedings, Family Proceedings and Upper Tribunal Fees (Amendment) Order 2016',
      '21 March 2016', '4481102159', 'approved', 'enhanced');
  } else if (CONF.e2e.frontendUrl.includes("demo")) {
    I.verifyCurrentFeeVersion('5', 'Previously: 4', 'Filing an application for a divorce, nullity or civil partnership dissolution', 'Previously: Filing an application for a divorce, nullity or civil partnership dissolution – fees order 1.2.',
      '2016 No 402', 'Previously: 2016 No. 402 (L. 5)', '29 September 2021', 'Previously: 20 March 2016', 'RECEIPT OF FEES - Family issue divorce', 'Previously: GOV - App for divorce/nullity of marriage or CP',
      'ltlfnujoi hgptjqehf', 'Previously:', 'TOTO TOTO', 'Previously:', 'FEE0002', 'divorce', 'issue', 'family', 'family court', 'fixed', 'Flat', 'all', '', 'default', '550', '1.2', '', '', 'The Civil Proceedings, Family Proceedings and Upper Tribunal Fees (Amendment) Order 2016',
      '21 March 2016', '4481102159', 'approved', 'enhanced');
  }
  I.verifyPreviousFeeVersion('4', 'FEE0002', 'divorce', 'issue', 'family', 'family court', 'fixed', 'Flat', 'all', '', 'default');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Edit button for the fixed Fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0002');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.click('Edit fee');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Create Fee Version', CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Edit button for the banded Fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0491');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.click('Edit fee');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Create Fee Version', CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Edit button for the rateable Fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0421');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.click('Edit fee');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Create Fee Version', CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Edit button for the relational Fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0424');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.click('Edit fee');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Create Fee Version', CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister upload fee',  ({ I }) => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Upload fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Upload fees');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('CSV upload');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

// Draft tests
Scenario('@functional FeesRegister Admin Console Editor Screen For Fee Draft Details', async ({ I }) => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  let fromDate = new Date();
  fromDate.setDate(fromDate.getDate() + 2);

  feeCode = await I.createNewFeeApi(editorUserName, editorPassword, fromDate, feeKeyword);

  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Drafts', CCFRATConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Editor Screen For Fee Draft Rejected by approver', async ({ I }) => {
  let feeObj = await I.addNewFeeAndSubmitForApprovalUsingApi(editorUserName, editorPassword);
  feeCode = feeObj.feeCode;

  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Awaiting approval","10");
  await I.rejectFees();
  I.click('Sign out');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see("Your Drafts");
  I.click("Your Drafts");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.click("Rejected by approver");
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Rejected by approver', CCFRATConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Editor Screen For Fee Draft Awaiting approval', async ({ I }) => {
  let feeObj = await I.addNewFeeAndSubmitForApprovalUsingApi(editorUserName, editorPassword);
  feeCode = feeObj.feeCode;
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.click("Your Drafts");
  I.click("Awaiting approval");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText('Awaiting approval', CCFRATConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Reference Data Page',  ({ I }) => {
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Reference Data");
  I.click("Reference Data");
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Reference data",CCFRATConstants.tenSecondWaitTime);
  I.verifyReferenceData();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

