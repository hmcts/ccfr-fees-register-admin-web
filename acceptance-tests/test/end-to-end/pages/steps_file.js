'use strict';
const CCPBConstants = require('../tests/CCFRAcceptanceTestConstants');
// in this file you can append custom step methods to 'I' object
// const faker = require('faker');
const faker = require('faker');
const RANDOM_NUMBER = 99999;
const {verifyFeesHeaders, verifyFeeDetails} = require('./live_fees');
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

  addNewFee(feeKeyword) {
    const memoLineNumber = faker.random.number(RANDOM_NUMBER);
    const naturalAccountCode = faker.random.number(RANDOM_NUMBER);
    const fromDate = new Date();
    // const toDate = new Date();
    // toDate.setMonth(toDate.getMonth() + 3);
    this.click('Add a new fee');
    this.fillField('textarea[id="reasonForUpdate"]', 'New Fee Creation');
    this.fillField({ css: '#memoLine'}, memoLineNumber);
    this.fillField({ css: '#naturalAccountCode'}, '232425');
    this.fillField({ css: '#description'}, feeKeyword);
    this.wait(2);
    this.fillField({ css: '#fromDate'}, this.getFormattedDate());
    this.wait(2);
    this.fillField({ css: '#amount'}, 120.00);
    //Applicant;
    this.checkOption('input[id="all"]');
    //jurisdiction1;
    this.checkOption('input[id="family"]');
    //jurisdiction2
    this.checkOption('input[id="family court"]');
    //service
    this.checkOption('input[id="divorce"]');
    //event
    this.checkOption('input[id="hearing"]');
    //channel
    this.checkOption('input[id="online"]');
    //direction
    this.checkOption('input[id="enhanced"]');
    this.fillField({ css: '#keyword'}, feeKeyword);
    this.fillField({ css: '#feeOrderName'}, feeKeyword);
    this.fillField({ css: '#statutoryInstrument'}, feeKeyword);
    this.fillField({ css: '#siRefId'}, feeKeyword);
    this.click('Save as draft');
    this.wait(CCPBConstants.tenSecondWaitTime);
  },
  submitForApproval(feeKeyword) {
   this.see('My open action');
   this.click('My open action');
   this.see(feeKeyword);
   this.click(`//*[contains(text(),"${feeKeyword}")]/..//input[@type="submit" and @value = "Submit"]`)
   this.wait(CCPBConstants.fiveSecondWaitTime)
  },
  deleteFees(feeKeyword) {
    this.see('My open action');
    this.click('My open action');
    this.see(feeKeyword);
    this.click(`//*[contains(text(),"${feeKeyword}")]/..//input[@type="submit" and @value = "Delete"]`)
    this.wait(CCPBConstants.fiveSecondWaitTime)
  },
  verifyFeesSentForApproval(feeKeyword) {
    this.see('My open action');
    this.click('My open action');
    this.see(feeKeyword);
  },
  rejectFeesSentForApproval(feeKeyword) {
    this.see(feeKeyword);
    this.click(`//*[contains(text(),"${feeKeyword}")]/..//input[@type="submit" and @value = "Reject"]`)
    this.wait(CCPBConstants.fiveSecondWaitTime)
  },
    verifyFeesHeaders,
    verifyFeeDetails
});
