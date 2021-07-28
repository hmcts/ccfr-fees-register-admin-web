const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;
const approverUserName = process.env.APPROVER_USERNAME;
const approverPassword = process.env.APPROVER_PASSWORD;

Feature('CC FeesRegister Admin Acceptance Tests For Approver');

<<<<<<< HEAD
Scenario('FeesRegister Admin Console Approver Header and Tab Validation', I => {
  I.login(approverUserName, approverPassword);
=======
BeforeSuite(I => {
  // I.amOnPage('/');
  // I.wait(CCFRATConstants.twoSecondWaitTime);
  // I.resizeWindow(CCFRATConstants.windowsSizeX, CCFRATConstants.windowsSizeY);
});

Scenario('FeesRegister Admin Console Approver Screen Validation @crossbrowser', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
>>>>>>> 810ca2e908a7d691eeae69ddcaf5507712b164e2
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

Scenario('FeesRegister Verify Pending For Approval', I => {
  I.login('functionaltestapprover@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.amOnPage('/admin/V2/pending-approval');
  I.see('Awaiting approval');
  await I.verifyFeesSentForApprovalAndApprove()
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

});

