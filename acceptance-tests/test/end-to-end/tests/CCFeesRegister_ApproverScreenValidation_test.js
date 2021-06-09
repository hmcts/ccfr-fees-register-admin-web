const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests').retry(CCFRATConstants.retryScenario);

BeforeSuite(I => {
});

Scenario('FeesRegister Admin Console Approver Screen Validation', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  //I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.Logout("approver");
})

Scenario('FeesRegister Verify New fee for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  // to-do based on updates and future stories
  //I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.Logout("editor");

});

Scenario('FeesRegister Verify Pending For Approval', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.amOnPage('/admin/V2/pending-approval');
  I.see('Awaiting approval');
  // to-do : assume we have fee codes always- based on future stories we will update .
  I.see('Code');
  I.see('Service');
  I.Logout("approver");

});


