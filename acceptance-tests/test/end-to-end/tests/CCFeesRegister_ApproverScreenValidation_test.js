const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests').retry(CCFRATConstants.retryScenario);

<<<<<<< HEAD
BeforeSuite(I => {
  // I.amOnPage('/');
  // I.wait(CCFRATConstants.twoSecondWaitTime);
  // I.resizeWindow(CCFRATConstants.windowsSizeX, CCFRATConstants.windowsSizeY);
});

Scenario('FeesRegister Admin Console Approver Screen Validation @crossbrowser', I => {
=======
Scenario('FeesRegister Admin Console Approver Header Validation', I => {
>>>>>>> PAY-4567
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Approvals");
  I.see("Reference Data");
  I.click('Sign out');
})


