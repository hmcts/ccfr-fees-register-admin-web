const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests');

BeforeSuite(I => {
  I.amOnPage('/');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.resizeWindow(CCFRATConstants.windowsSizeX, CCFRATConstants.windowsSizeY);
});

Scenario('FeesRegister Admin Console Approver Screen Validation', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.see('View all fees');
  I.see('View all discontinued fees');
  I.see('My open actions');
  I.see('Applicants');
  I.see('Jurisdictions 1');
  I.see('Jurisdictions 2');
  I.see('Services');
  I.see('Channels');
  I.see('Events');
  I.see('Directions');
  I.Logout("approver");
})

Scenario('FeesRegister Verify New fee for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.see('Add a new fee');
  I.addNewFee(feeKeyword);
  // I.waitForText('Fee Created', CCFRATConstants.tenSecondWaitTime);
  I.see('Fee has been created successfully.');
  I.click('Return to welcome page');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.submitForApproval(feeKeyword, submitBtnVisibilityChk);

  I.Logout("editor");

  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.verifyFeesSentForApproval(feeKeyword);

  I.Logout("approver");

});


