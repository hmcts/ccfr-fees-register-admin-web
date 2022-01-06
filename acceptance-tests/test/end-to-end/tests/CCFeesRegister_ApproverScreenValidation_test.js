const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

const approverUserName = process.env.APPROVER_USERNAME;
const approverPassword = process.env.APPROVER_PASSWORD;

const editorUserName = process.env.EDITOR_USERNAME;
const editorPassword = process.env.EDITOR_PASSWORD;

Feature('CC FeesRegister Admin Acceptance Tests For Approver');

Scenario('FeesRegister Admin Console Approver Header and Tab Validation', I => {
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText("Live fees","20");
  I.verifyDownloadLink();
  I.clickDownloadLink();
  I.click("Approved but not live fees");
  I.waitForText("Approved but not live fees","10");
  I.see("Code");
  I.click("Discontinued fees");
  I.waitForText("Discontinued fees","10");
  I.see("Code");
  I.see("Approvals");
  I.click("Approvals");
  I.waitForText("Awaiting approval", "10");
  I.see("Reference Data");
  I.click("Reference Data");
  I.waitForText("Applicants","10");
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario)

Scenario.skip('FeesRegister Verify Pending For Approval And Approve The Fees', async I => {
  await I.addNewFeeAndSubmitForApproval(editorUserName, editorPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.retry(3).verifyFeesSentForApprovalAndApprove()
  I.click('Sign out');
});

Scenario.skip('FeesRegister Verify Pending For Approval And Reject The Fees', async I => {

  await I.addNewFeeAndSubmitForApproval(editorUserName, editorPassword);
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText("Awaiting approval","10");
  await I.rejectFees()
  I.click('Sign out');
});

Scenario('FeesRegister Verify Pending For Approval header list',  I => {
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Approvals");
  I.click("Approvals");
  I.waitForText("Awaiting approval",CCFRATConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeadersAwaitingApproval();
  I.click('Sign out');
});
