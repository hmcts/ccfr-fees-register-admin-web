const { Logger } = require('@hmcts/nodejs-logging');
const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const faker = require('faker');
const RANDOM_NUMBER = 9999;

Feature('CC FeesRegister Admin Acceptance Tests For Live Fees');

xScenario('FeesRegister Admin Console Editor Header Validation', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.see("Your Drafts");
  I.see("Reference Data");
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

xScenario('FeesRegister Admin Console Editor Screen For Live Fees Details', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  // to-do based on updates and future stories
  I.verifyFeesHeaders();
  //verify any existing fee details under live Tab
  I.verifyFeeDetails('FEE0580','civil','Flat','100.00');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

xScenario('FeesRegister Admin Console Editor Approved but not live Fees Details Check @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Approved but not live fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Approved but not live fees');
  I.verifyFeesHeaders();
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0621','tribunal','Volume','100.00');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

xScenario('FeesRegister Admin Console Editor Discontinued Fees Details Check @crossbrowser', I => {
  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Discontinued fees', CCFRATConstants.tenSecondWaitTime);
  I.click('Discontinued fees');
  I.verifyFeesHeaders();
  // to-do based on updates and future stories
  //Check one of the existing fee, once full implementation done we can add our own code
  I.verifyFeeDetails('FEE0588','family','Flat','112.00');
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

xScenario('FeesRegister Add New Fee and Submit for Approval', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword);
  I.waitForText('Draft fee saved', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.submitForApproval(feeKeyword, submitBtnVisibilityChk);
  let feeCodeConfirmationText = await I.grabTextFrom({css: '.govuk-panel__title'});
  I.getFeeCode(feeCodeConfirmationText);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('FeesRegister Add New Fee and Delete Draft', async I => {
  const feeKeyword = "SN" + new Date().valueOf().toString();
  const submitBtnVisibilityChk = true;

  I.login('functionaltesteditor@hmcts.net', 'LevelAt12');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText('Live fees', CCFRATConstants.tenSecondWaitTime);
  await I.addNewFee(feeKeyword);
  I.waitForText(' Draft fee saved ', CCFRATConstants.tenSecondWaitTime);
  I.click('View draft fee');
  I.waitForText('Amount', CCFRATConstants.tenSecondWaitTime);
  I.waitForText('View', CCFRATConstants.fiveSecondWaitTime);
  I.click('//a[contains(text(),"View")][1]');
  I.deleteFees();
  let feeCodeConfirmationText = await I.grabTextFrom({css: '.govuk-panel__title'});
  I.getFeeCode(feeCodeConfirmationText);
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);
