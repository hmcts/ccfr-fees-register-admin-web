'use strict';
const CCPBConstants = require('../tests/CCFRAcceptanceTestConstants');
const fregHelper = require('../helpers/freg_helper');

// in this file you can append custom step methods to 'I' object
// const faker = require('faker');
const faker = require('faker');
const RANDOM_NUMBER = 99999;
const {verifyFeeDetails} = require('./fee_details');
const {verifyFeesHeaders, verifyDownloadLink, clickDownloadLink} = require('./fee_dashboard_list');
const {verifyCurrentFeeVersion, verifyPreviousFeeVersion} = require('./fee_versions');
const {verifyFeeDraftHeaders, verifyFeeDraftHeadersAwaitingApproval} = require('./fee_draft_dashboard_list');
const {verifyReferenceData} = require('./reference_data');
const CCDNumber = faker.random.number(RANDOM_NUMBER);
module.exports = () => actor({
  // done/
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

  AcceptFeeRegAdminWebCookies() {
    this.waitForText('Cookies on Fees Register Admin console', 5);
    this.click({ css: 'button.cookie-banner-accept-button' });
    this.click({ css: 'div.cookie-banner-accept-message > div.govuk-button-group > button' });
    this.wait(CCPBConstants.twoSecondWaitTime);
  },

  RejectFeeRegAdminWebCookies() {
    this.waitForText('Cookies on Fees Register Admin console', 5);
    this.click({ css: 'button.cookie-banner-reject-button' });
    this.click({ css: 'div.cookie-banner-reject-message > div.govuk-button-group > button' });
    this.wait(CCPBConstants.twoSecondWaitTime);
  },

  getFormattedDate(){
    const date = new Date();
    const stringFillSize = 2;
    const day = date.getDate().toString().padStart(stringFillSize, '0');
    const month = (date.getMonth() + 1).toString().padStart(stringFillSize, '0');
    const year = date.getFullYear().toString();
    return`${day}/${month}/${year}`;
  },
  parseDate(dateToBeParsed){
    let date = new Date(dateToBeParsed);
    const day = date.toLocaleString('default', { day: '2-digit'});
    const month = date.toLocaleString('default', { month: 'long'});
    const year = date.toLocaleString('default', { year: 'numeric'});
    const newDate = day+' '+month+' '+year;
    console.log("newDate----------->"+newDate);
    return newDate;
  },

  async getFeeCode(){
    const feeCodeConfirmationText = await this.grabTextFrom({css: '.govuk-panel__title'});
    const FeeCode = feeCodeConfirmationText.toString().split(" ");
    console.log('FeeCode: ' + FeeCode[1]);
    return FeeCode[1];
  },

  async addNewFee(feeKeyword, formattedFromDate) {
    const memoLineNumber = faker.random.number(RANDOM_NUMBER);
    const naturalAccountCode = faker.random.number(RANDOM_NUMBER);

    this.click('Create a new fee');
    this.fillField('textarea[id="reasonForUpdate"]', 'New Fee Creation');
    this.fillField({ css: '#description'}, "E2E Testing");
    this.fillField({ css: '#statutoryInstrument'}, feeKeyword);
    this.fillField('textarea[id="lastAmendingSi"]', feeKeyword);
    this.fillField({ css: '#siRefId'}, feeKeyword);
    this.fillField({ css: '#consolidatedFeeOrderName'}, feeKeyword);

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
    // this.pressKey('Backspace');

    this.fillField({ css: '#fromDate'}, formattedFromDate);
    this.fillField({ css: '#naturalAccountCode'}, '232425');
    this.wait(CCPBConstants.tenSecondWaitTime);
    this.click('input[id="submit"]');
    this.wait(CCPBConstants.tenSecondWaitTime);

    let newFeeObj = {
      memoLineNumber: memoLineNumber
    };
    return newFeeObj;
  },

  editDraft(){
    this.click('Edit fee');
    this.waitForText(  'Statutory Instrument', '10');
    this.fillField({ css: '#description'}, "E2E Testing Edit");
    this.fillField('textarea[id="reasonForUpdate"]', 'Edited this fee');
    this.fillField('textarea[id="lastAmendingSi"]', 'Edit last amending SI');
    this.fillField({ css: '#consolidatedFeeOrderName'}, 'Edit consolidated fee');
    // this.checkOption('input[id="percentage"]');
    this.wait(CCPBConstants.twoSecondWaitTime);
    // this.fillField('//input[@type="text" and @id="percentage"]', '10');

    //service
    this.checkOption('input[id="probate"]');
    //jurisdiction1;
    this.checkOption('input[id="civil"]');
    //jurisdiction2
    this.checkOption('input[id="county court"]');
    //FeeType
    this.checkOption('input[id="typefixed"]');
    this.fillField({ css: '#amount'}, 600.00);
    this.wait(CCPBConstants.twoSecondWaitTime);
    //event
    this.checkOption('input[id="issue"]');
    //channel
    this.checkOption('input[id="online"]');
    //Applicant;
    this.checkOption('input[id="personal"]');
    //direction
    this.checkOption('input[id="licence"]');

    const fromDate = new Date();
    const formattedFromDate = fromDate.toLocaleDateString('en-GB');
    // this.fillField({ css: '#fromDate'}, formattedFromDate);

    // this.wait(CCPBConstants.fiveSecondWaitTime);
    this.click('input[id="submit"]');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
  submitForApproval() {
    this.see(  'Request approval');
    this.click(  'Request approval');
    this.waitForText('Don’t submit this fee for approval',CCPBConstants.tenSecondWaitTime);
    this.see('Are you sure you want to submit this fee for approval?' );
    this.click(  'Request approval');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
  deleteFees() {
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
    this.click({ xpath: '//td[.="E2E Testing"]/following-sibling::td/a[contains(text(), "View")][1]' });
    //this.click({xpath: '//td/a[1]'});
    this.waitForText('Direction','10');
    this.click("Approve fee");
    let feeCode= await this.getFeeCode();
    console.log('The Fee Code after approval : '+feeCode)
    // verify approved fee under Live Tab
    // this.click('Fees');
    // this.waitForText('Live fees', '10');
    /*this.click('Approved but not live fees');
    this.wait(CCPBConstants.fiveSecondWaitTime);
    this.waitForText('Approved but not live fees', '10');*/
    this.see(feeCode);
  },
  async rejectFees() {
    // we are trying to use fee code already existed and created as par of editor journey
    //this.click("//*[contains(text(),\"E2E Testing\")]/..//a[\"View\"][1]");
    //this.click("/html/body/main/table/tbody/tr[1]/td[6]/a");
    //this.click({xpath: '//td/a[1]'});
    this.click({ xpath: '//td[.="E2E Testing"]/following-sibling::td/a[contains(text(), "View")][1]' });
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

  async addNewFeeAndSubmitForApprovalUsingApi(editorUserName, editorPassword) {
    const feeKeyword = "SN" + new Date().valueOf().toString();
    const memoLineNumber = faker.random.number(RANDOM_NUMBER);
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() + 2);
    const feeCode = await this.createNewFeeApi(editorUserName, editorPassword, fromDate, feeKeyword, memoLineNumber);
    this.submitFeeForApprovalApi(editorUserName, editorPassword, feeCode, 1);
    let feeObj = {
      feeKeyword: feeKeyword,
      feeCode: feeCode,
      memoLineNumber: memoLineNumber,
      fromDate: fromDate
    };
    return feeObj;
  },

  async createNewFeeApi(editorUserName, editorPassword, fromDate, feeKeyword, memoLineNumber = '12345') {
    const feeCode = await fregHelper.createFee(editorUserName, editorPassword, fromDate.toISOString(), feeKeyword, memoLineNumber);
    return feeCode;
  },

  async submitFeeForApprovalApi(editorUserName, editorPassword, feeCode, version) {
    await fregHelper.subbmitFeeForApproval(editorUserName, editorPassword, feeCode, version);
  },

  verifyFeesHeaders,
  verifyFeeDetails,
  verifyDownloadLink,
  clickDownloadLink,
  verifyCurrentFeeVersion,
  verifyPreviousFeeVersion,
  verifyFeeDraftHeaders,
  verifyFeeDraftHeadersAwaitingApproval,
  verifyReferenceData
});
