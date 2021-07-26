const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests For Approver');

Scenario('FeesRegister Admin Console Approver Header and Tab Validation', I => {
  const sometext = CCFRATConstants.approverUserName+1;
  console.log('arrover Email '+sometext);
  I.login(CCFRATConstants.approverUserName, CCFRATConstants.approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.waitForText("Live fees","20");
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

xScenario('FeesRegister Verify Pending For Approval And Approve The Fees', async I => {
  I.login(CCFRATConstants.approverUserName, CCFRATConstants.approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.verifyFeesSentForApprovalAndApprove()
  I.click('Sign out');

});

xScenario('FeesRegister Verify Pending For Approval And Reject The Fees', async I => {
  I.login(CCFRATConstants.approverUserName, CCFRATConstants.approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.waitForText("Awaiting approval","10");
  await I.rejectFees()
  I.click('Sign out');

});

