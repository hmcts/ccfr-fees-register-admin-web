const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;
const editorUserName = process.env.EDITOR_USERNAME;
const editorPassword = process.env.EDITOR_PASSWORD;

Feature('CC FeesRegister Admin Acceptance Tests For Editor');
Scenario('FeesRegister Admin Console Editor Header and Tab Validation', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.waitForText("Live fees","10");
  I.click("Approved but not live fees");
  I.waitForText("Approved but not live fees","10");
  I.see("Code");
  I.click("Discontinued fees");
  I.waitForText("Discontinued fees","10");
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
  I.verifyFeesHeaders();
  //verify any existing fee details under live Tab
  I.verifyFeeDetails('FEE0580','civil','Flat','100.00');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Admin Console Editor Approved but not live Fees Details Check @crossbrowser', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.click('Approved but not live fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0621','tribunal','Volume','100.00');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Admin Console Editor Discontinued Fees Details Check @crossbrowser', I => {
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyDownloadLink();
  I.click('Discontinued fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0588','family','Flat','112.00');
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

Scenario('FeesRegister Add New Fee and Edit the fee', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  I.login(editorUserName, editorPassword);
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.verifyDownloadLink();
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
  //I.verifyDownloadLink();
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
