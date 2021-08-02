'use strict';
const CCPBConstants = require('../tests/CCFRAcceptanceTestConstants');
// in this file you can append custom step methods to 'I' object
// const faker = require('faker');
const faker = require('faker');
const RANDOM_NUMBER = 99999;
const {verifyFeesHeaders, verifyFeeDetails, verifyDownloadLink, clickDownloadLink} = require('./fees_details');
const CCDNumber = faker.random.number(RANDOM_NUMBER);
module.exports = () => actor({
  // done
  login(email, password) {
    this.amOnPage('/');
    this.wait(CCPBConstants.twoSecondWaitTime);
    this.resizeWindow(CCPBConstants.windowsSizeX, CCPBConstants.windowsSizeY);
    this.wait(CCPBConstants.twoSecondWaitTime);
    this.retry(CCPBConstants.retryCountForStep).waitForElement('#username', CCPBConstants.thirtySecondWaitTime);
    this.fillField('Email address', email);
    this.fillField('Password', password);
    this.waitForElement({ css: '[type="submit"]' }, CCPBConstants.thirtySecondWaitTime);
    this.click({ css: '[type="submit"]' });
  },
  Logout(role) {
    const signoutLabel = "Sign out (test " + role + ")";
    this.moveCursorTo('#proposition-links > ul > a');
    this.see(signoutLabel);
    this.click(signoutLabel);
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },

  getFormattedDate(){
    const date = new Date();
    const stringFillSize = 2;
    const day = date.getDate().toString().padStart(stringFillSize, '0');
    const month = (date.getMonth() + 1).toString().padStart(stringFillSize, '0');
    const year = date.getFullYear().toString();
    return`${day}/${month}/${year}`;
  },
  async getFeeCode(){
    let feeCodeConfirmationText = await this.grabTextFrom({css: '.govuk-panel__title'});
    const FeeCode = feeCodeConfirmationText.split(" ")[0];
    console.log(FeeCode);
    return FeeCode;
  },

  async addNewFee(feeKeyword) {
    const memoLineNumber = faker.random.number(RANDOM_NUMBER);
    const naturalAccountCode = faker.random.number(RANDOM_NUMBER);
    // Use this for local testing
    // const formattedFromDate  = this.getFormattedDate();
    const fromDate = new Date();
    const formattedFromDate = fromDate.toLocaleDateString('en-GB');

    this.click('Create a new fee');
    this.fillField('textarea[id="reasonForUpdate"]', 'New Fee Creation');
    this.fillField({ css: '#description'}, "E2E Testing");
    this.fillField({ css: '#statutoryInstrument'}, feeKeyword);
    this.fillField({ css: '#siRefId'}, feeKeyword);
    this.fillField({ css: '#feeOrderName'}, feeKeyword);

    //service
    this.checkOption('input[id="divorce"]');
    //jurisdiction1;
    this.checkOption('input[id="family"]');
    //jurisdiction2
    this.checkOption('input[id="family court"]');
    //FeeType
    this.checkOption('input[id="typefixed"]');
    this.fillField({ css: '#amount'}, 120.00);
    this.wait(CCPBConstants.twoSecondWaitTime);
    //event
    this.checkOption('input[id="hearing"]');
    //channel
    this.checkOption('input[id="online"]');
    this.fillField({ css: '#keyword'}, feeKeyword);
    //Applicant;
    this.checkOption('input[id="all"]');
    //direction
    this.checkOption('input[id="enhanced"]');
    this.fillField({ css: '#memoLine'}, memoLineNumber);
    this.pressKey('Backspace');

    this.fillField({ css: '#fromDate'}, formattedFromDate);
    this.fillField({ css: '#naturalAccountCode'}, '232425');
    this.wait(CCPBConstants.tenSecondWaitTime);
    this.click('input[id="submit"]');
    this.wait(CCPBConstants.tenSecondWaitTime);
  },
  editDraft(){
    this.waitForText(  'Direction', '10');
    this.click(  'Edit fee');
    this.waitForText(  'Statutory Instrument', '10');
    this.fillField('textarea[id="reasonForUpdate"]', 'Edited this fee');
    this.checkOption('input[id="percentage"]');
    this.wait(CCPBConstants.twoSecondWaitTime);
    this.fillField('//input[@type="text" and @id="percentage"]', '10');
    this.wait(CCPBConstants.fiveSecondWaitTime);
    this.click('input[id="submit"]');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
  submitForApproval() {
    this.see(  'Request approval')
    this.click(  'Request approval');
    this.waitForText('Don’t submit this fee for approval',CCPBConstants.tenSecondWaitTime);
    this.see('Are you sure you want to submit this fee for approval?' );
    this.click(  'Request approval');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
  deleteFees(feeKeyword) {
    this.see('Delete');
    this.click('Delete');
    this.waitForText('Are you sure you want to delete this draft fee?', '10');
    this.see('Don’t delete draft');
    this.click('Delete draft');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
  async verifyFeesSentForApprovalAndApprove() {
    this.see('Code');
    this.see('Service');
    // we are trying to use fee code already existed and created as par of editor journey
    this.click(`//*[contains(text(),"E2E Testing")]/..//a["View"][1]`);
    this.waitForText('Direction','10');
    this.click("Approve fee");
    let feeCode= await this.getFeeCode();
    // verify approved fee under Live Tab
    this.click('Fees');
    this.waitForText('Live fees', '10');
    this.wait(CCPBConstants.fiveSecondWaitTime);
    this.see(feeCode);
  },
  async rejectFees() {
    // we are trying to use fee code already existed and created as par of editor journey
    //this.click("//*[contains(text(),\"E2E Testing\")]/..//a[\"View\"][1]");
    this.click("//td[.='E2E Testing']/following-sibling::View[1]");
    this.waitForText('Direction','10');
    this.click("Reject fee");
    this.waitForText("Why are you rejecting this draft fee?","10");
    this.fillField('textarea[id="reasonForReject"]', 'E2E Test Rejected this fee');
    this.click("Submit");
    let feeCode= await this.getFeeCode();
    // verify rejected fee doesn't appear  under Awaiting Approval Tab
    this.click('Approvals');
    this.waitForText('Awaiting approval', '10');
    this.wait(CCPBConstants.fiveSecondWaitTime);
    this.dontSee(feeCode);
  },
    verifyFeesHeaders,
    verifyFeeDetails,
    verifyDownloadLink,
    clickDownloadLink
});
