const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests For Live Fees')

Scenario('FeesRegister Admin Console Editor Header Validation', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Your Drafts");
  I.see("Reference Data");
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Screen For Live Fees Details', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.verifyFeesHeaders();
  //verify any existing fee details under live Tab
  I.verifyFeeDetails('FEE0582','civil','Flat','100.00');
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Approved but not live Fees Details Check @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Approved but not live fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0621','tribunal','Volume','100.00');
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Discontinued Fees Details Check @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Discontinued fees');
  I.verifyFeesHeaders();
  // to-do based on updates and future stories
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0588','family','Flat','112.00');
  I.click('Sign out');
});

Scenario('FeesRegister Add New Fee and Submit for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.addNewFee(feeKeyword);
  I.waitForText('Fee Created', CCFRATConstants.twoSecondWaitTime);
  I.wait('5');
  I.see('Fee has been created successfully.');
  I.click('Return to welcome page');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.deleteFees(feeKeyword);
  I.click('Sign out');
});
