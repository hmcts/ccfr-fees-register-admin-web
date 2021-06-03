const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests').retry(CCFRATConstants.retryScenario);

BeforeSuite(I => {
});

Scenario('FeesRegister Admin Console Approver Screen Validation', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.Logout("approver");
})

Scenario('FeesRegister Verify New fee for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.Logout("editor");

});


