const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const CCFRAcceptanceTestConstants = require("../tests/CCFRAcceptanceTestConstants");
const RANDOM_NUMBER = 9999;

// const approverUserName = process.env.APPROVER_USERNAME;
// const approverPassword = process.env.APPROVER_PASSWORD;
// const editorUserName = process.env.EDITOR_USERNAME;
// const editorPassword = process.env.EDITOR_PASSWORD;

const approverUserName = 'functionaltestapprover@hmcts.net';
const approverPassword = 'LevelAt12';
const editorUserName = 'functionaltesteditor@hmcts.net';
const editorPassword = 'LevelAt12';

Feature('CC FeesRegister Admin Acceptance Tests For Editor');
Scenario('FeesRegister Admin Console Editor Header and Tab Validation', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.waitForText("Live fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click("Approved but not live fees");
  I.waitForText("Approved but not live fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.see("Code");
  I.click("Discontinued fees");
  I.waitForText("Discontinued fees","10");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.see("Code");
  I.see("Your Drafts");
  I.click("Your Drafts");
  I.waitForText("Drafts", "10");
  I.see("Rejected by approver");
  I.click("Rejected by approver");
  I.waitForText("Code", "10");
  I.see("Awaiting approval");
  I.click("Awaiting approval");
  I.waitForText("Code", "10");
  I.see("Reference Data");
  I.click("Reference Data");
  I.waitForText("Applicants","10");
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Screen For Live Fees Details', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Live fees');
  I.verifyFeesHeaders();
  //verify any existing fee details under live Tab
  I.verifyFeeDetails('live', 'FEE0002','1.2','','divorce','issue','Filing an application for a divorce, nullity or civil partnership dissolution',
    '2016 No 402','The Civil Proceedings, Family Proceedings and Upper Tribunal Fees (Amendment) Order 2016','family','family court','fixed','Flat','550.00','',
    '21 March 2016', '', '5', '', '4481102159', 'RECEIPT OF FEES - Family issue divorce', 'enhanced', 'all', '', 'default', 'approved', '124756', '39907');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario.skip('FeesRegister Admin Console Editor Approved but not live Fees Details Check @crossbrowser', async I => {
  let feeObj = await I.addNewFeeAndSubmitForApproval(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.retry(3).verifyFeesSentForApprovalAndApprove()
  I.click('Sign out');
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Approved but not live fees');
  I.verifyFeesHeaders();
  I.see(feeObj.feeCode);
  I.click(feeObj.feeCode)
  let parsedDate = I.parseDate(feeObj.fromDate);
  I.verifyFeeDetails('notLive',feeObj.feeCode,feeObj.feeKeyword,feeObj.feeKeyword,'divorce','hearing','E2E Testing',feeObj.feeKeyword,'', 'family', 'family court', 'fixed', 'Flat',
    '120.00', '', parsedDate, '', '', '1', '', '232425', feeObj.memoLineNumber, 'enhanced', 'all', feeObj.feeKeyword, 'online', 'approved', 'fef0daba-7815-4be0-b5f0-5a8cd2085cfe',
    '92466b62-e3a0-4c17-b2b9-934ef13218db');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Admin Console Editor Discontinued Fees Details Check @crossbrowser', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Discontinued fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('discontinued', 'FEE0002','1.2','','divorce','issue','Filing an application for a divorce, nullity or civil partnership dissolution – fees order 1.2.',
    '2016 No. 402 (L. 5)','','family','family court','fixed','Flat','550.00','', '21 March 2016','21 March 2016', '4', '', '4481102159', 'GOV - App for divorce/nullity of marriage or CP',
    'enhanced', 'all', '', 'default', 'approved', '', '');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario.skip('FeesRegister Add New Fee and Submit for Approval', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const fromDate = new Date();
  const formattedFromDate = fromDate.toLocaleDateString('en-GB');
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword, formattedFromDate);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.submitForApproval();
  await I.getFeeCode();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario.skip('FeesRegister Add New Fee and Edit the fee', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const fromDate = new Date();
  const formattedFromDate = fromDate.toLocaleDateString('en-GB');
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword, formattedFromDate);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.editDraft();
  await I.getFeeCode();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario.skip('FeesRegister Add New Fee and Delete Draft', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const fromDate = new Date();
  const formattedFromDate = fromDate.toLocaleDateString('en-GB');
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword, formattedFromDate);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.deleteFees();
  await I.getFeeCode();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

// Version To field is appearing in latest version even though that's not filled out as part of creating fee
Scenario.skip('FeesRegister Verify Version details for existing fee',  I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('FEE0002');
  I.waitForText('Fee versions', CCFRATConstants.tenSecondWaitTime);
  I.click('Fee versions');
  I.verifyCurrentFeeVersion('5', 'Previously: 4', 'Filing an application for a divorce, nullity or civil partnership dissolution', 'Previously: Filing an application for a divorce, nullity or civil partnership dissolution – fees order 1.2.',
    '2016 No 402', 'Previously: 2016 No. 402 (L. 5)', '24 August 2021', 'Previously: 21 March 2016', 'RECEIPT OF FEES - Family issue divorce', 'Previously: GOV - App for divorce/nullity of marriage or CP',
    '124756', 'Previously:', '39907', 'Previously:', 'FEE0002', 'divorce', 'issue', 'family', 'family court', 'fixed', 'Flat', 'all', '', 'default', '550', '1.2', '', '', 'The Civil Proceedings, Family Proceedings and Upper Tribunal Fees (Amendment) Order 2016',
    '21 March 2016', '4481102159', 'approved', 'enhanced');
  I.verifyPreviousFeeVersion('4', 'FEE0002', 'divorce', 'issue', 'family', 'family court', 'fixed', 'Flat', 'all', '', 'default');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister upload fee',  I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Upload fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Upload fees');
  I.see('CSV upload');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

// Draft tests
Scenario('FeesRegister Admin Console Editor Screen For Fee Draft Details', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.waitForText('Drafts', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Editor Screen For Fee Draft Rejected by approver', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.click("Rejected by approver");
  I.waitForText('Rejected by approver', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Editor Screen For Fee Draft Awaiting approval', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click("Your Drafts");
  I.click("Awaiting approval");
  I.waitForText('Awaiting approval', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeaders();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

