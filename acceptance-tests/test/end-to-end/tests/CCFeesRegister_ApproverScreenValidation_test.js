const CCFRATConstants = require('./CCFRAcceptanceTestConstants');
const idamHelper = require('../helpers/idam_helper');
const fregHelper = require('../helpers/freg_helper');

const randomData = require('../helpers/random_data');

const adminUserName = 'feeregadmin.' + randomData.getRandomEmailAddress();
const adminPassword = randomData.getRandomUserPassword();
const approverUserName = 'feeregapprover.' + randomData.getRandomEmailAddress();
const approverPassword = randomData.getRandomUserPassword();
const editorUserName = 'feeregeditor.' + randomData.getRandomEmailAddress();
const editorPassword = randomData.getRandomUserPassword();

let feeCode;

Feature('CC FeesRegister Admin Acceptance Tests For Approver');

BeforeSuite(async() => {
  await idamHelper.createUserUsingTestingSupportService('Admin', adminUserName, adminPassword, ['freg', 'freg-admin']);
  await idamHelper.createUserUsingTestingSupportService('Approver', approverUserName, approverPassword, ['freg', 'freg-approver']);
  await idamHelper.createUserUsingTestingSupportService('Editor', editorUserName, editorPassword, ['freg', 'freg-editor']);
});

AfterSuite(async () => {
  if(feeCode) {
    await fregHelper.deleteFee(adminUserName, adminPassword, feeCode)
  }
});

Scenario('@functional FeesRegister Admin Console Approver Header and Tab Validation', I => {
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Fees");
  I.click("Fees");
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.waitForText("Live fees","20");
  I.verifyDownloadLink();
  I.clickDownloadLink();
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
}).retry(CCFRATConstants.retryScenario);

// Already covered in Editor and Approver journey tests
Scenario('@functional FeesRegister Verify Pending For Approval And Approve The Fees', async I => {
  let feeObj = await I.addNewFeeAndSubmitForApproval(editorUserName, editorPassword);
  feeCode = feeObj.feeCode;
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.fiveSecondWaitTime);
  I.see('Awaiting approval');
  await I.retry(3).verifyFeesSentForApprovalAndApprove();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Pending For Approval And Reject The Fees', async I => {
  let feeObj = await I.addNewFeeAndSubmitForApproval(editorUserName, editorPassword);
  feeCode = feeObj.feeCode;
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText("Awaiting approval","10");
  await I.rejectFees();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);

Scenario('@functional FeesRegister Verify Pending For Approval header list',  I => {
  I.login(approverUserName, approverPassword);
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.see("Approvals");
  I.click("Approvals");
  I.waitForText("Awaiting approval",CCFRATConstants.tenSecondWaitTime);
  I.verifyFeeDraftHeadersAwaitingApproval();
  I.click('Sign out');
}).retry(CCFRATConstants.retryScenario);
