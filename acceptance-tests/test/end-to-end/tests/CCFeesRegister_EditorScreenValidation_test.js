const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests For Live Fees').retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Admin Console Editor Header Validation', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Your Drafts");
  I.see("Reference Data");
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Screen For Live Fees', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.verifyLiveFees();
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Screen Validation @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Approved but not live fees');
  I.waitForText('Code', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Description', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Jurisdiction2', CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.click('Sign out');
});

Scenario('FeesRegister Admin Console Editor Screen Validation @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Discontinued fees');
  I.waitForText('Code', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Description', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Jurisdiction2', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Valid to', CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  //Check one of the existing fee, once full implementation done we can add our own code
  I.waitForText('FEE0565', CCFRATConstants.tenSecondWaitTime);
  I.see('Version1');
  I.see('Version2');
  I.click('FEE0565');
  I.waitForText('Fee details', CCFRATConstants.tenSecondWaitTime);
  I.see('Code');
  I.see('FEE0565');
  I.see('test editor');
  I.click('Sign out');
});

Scenario('FeesRegister Add New Fee and Submit for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.click('Sign out');
});
