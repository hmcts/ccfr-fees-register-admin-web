const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests').retry(CCFRATConstants.retryScenario);

BeforeSuite(I => {
  // I.amOnPage('/');
  // I.wait(CCFRATConstants.twoSecondWaitTime);
  // I.resizeWindow(CCFRATConstants.windowsSizeX, CCFRATConstants.windowsSizeY);
});

Scenario('FeesRegister Admin Console Approver Screen Validation @crossbrowser', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Approvals");
  I.see("Reference Data");
  I.click('Sign out');
})

Scenario('FeesRegister Verify Pending For Approval', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.amOnPage('/admin/V2/pending-approval');
  I.see('Awaiting approval');
  // to-do : assume we have fee codes always- based on future stories we will update .
  I.see('Code');
  I.see('Service');
  I.click('Sign out');

});

Scenario('FeesRegister Approver Verify Live Fees @crossbrowser', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Approvals");
  I.see("Reference Data");
  I.click('Fees');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.verifyDownloadLink();
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.verifyFeesHeaders();
  I.click('Fees');
  I.clickDownloadLink();
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.click('Sign out');
})
