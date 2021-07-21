const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests');

Scenario('FeesRegister Admin Console Approver Screen Validation @crossbrowser', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Approvals");
  I.see("Reference Data");
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario)

Scenario('FeesRegister Verify Pending For Approval', async I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.verifyFeesSentForApprovalAndApprove()
  I.click('Sign out');

});
