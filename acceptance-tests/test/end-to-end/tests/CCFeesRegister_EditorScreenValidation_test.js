const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests').retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Admin Console Editor Screen For Live Fees', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Code', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Jurisdiction2', CCFRATConstants.tenSecondWaitTime);
  I.Logout("editor");
});

Scenario('FeesRegister Admin Console Editor Screen For Approved but not live fees', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Approved but not live fees');
  I.waitForText('Code', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Description', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Jurisdiction2', CCFRATConstants.tenSecondWaitTime);
  I.Logout("editor");
});

Scenario('FeesRegister Add New Fee and Submit for Approval', I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  I.Logout("editor");
});
