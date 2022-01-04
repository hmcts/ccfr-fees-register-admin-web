const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

const approverUserName = process.env.APPROVER_USERNAME;
const approverPassword = process.env.APPROVER_PASSWORD;
const editorUserName = process.env.EDITOR_USERNAME;
const editorPassword = process.env.EDITOR_PASSWORD;

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
  I.verifyFeeDetails('live', 'FEE0002','1.2','Family Proceedings Fees Order 2008','divorce','issue','Filing an application for a divorce, nullity or civil partnership dissolution',
  '2021 No 985','The Court Fees (Miscellaneous Amendments) Order 2021','family','family court','fixed','Flat','593.00','',
  '30 September 2021', '', '6', 'Inflationary Increase', '4481102159', 'RECEIPT OF FEES - Family issue divorce', 'enhanced', 'all', 'DivorceCivPart', 'default', 'approved', 'cef56daa-572c-464b-bd32-4a487c771d47', '39907');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario.skip('FeesRegister Admin Console Editor Approved but not live Fees Details Check @crossbrowser', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click('Approved but not live fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0621','798','','adoption','miscellaneous','tribunal','Volume','100.00');
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
  I.verifyFeeDetails('discontinued','FEE0227','5.3','Family Proceedings Fees Order 2008','other','general application','Application (on notice) (unless otherwise listed)',
  '2014 No 877','The Family Proceedings Fees (Amendment) Order 2014','family','family court','fixed','Flat','155.00','', '21 April 2014','29 September 2021', '1', '', '4481102165', 'RECEIPT OF FEES - Family GA other',
  'cost recovery', 'all', 'GAOnNotice', 'default', 'approved', '124756', '39907');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Add New Fee and Submit for Approval', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword);
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
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.editDraft();
  await I.getFeeCode();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Add New Fee and Delete Draft', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.deleteFees();
  await I.getFeeCode();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);
