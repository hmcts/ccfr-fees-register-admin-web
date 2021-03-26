'use strict';
const CCPBConstants = require('../tests/CCFRAcceptanceTestConstants');
// in this file you can append custom step methods to 'I' object
// const faker = require('faker');
const faker = require('faker');

const RANDOM_NUMBER = 99999;

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
    this.moveCursorTo('#proposition-links > li > a');
    this.see(signoutLabel);
    this.click(signoutLabel);
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },

  // getDateInDDMMYYYY(date = new Date()) {
  //   const stringFillSize = 2;
  //   const day = date.getDate()
  //     .toString()
  //     .padStart(stringFillSize, '0');
  //   const month = (date.getMonth() + 1).toString()
  //     .padStart(stringFillSize, '0');
  //   const year = date.getFullYear()
  //     .toString();
  //   return `${day}/${month}/${year}`;
  // },

  addNewFee(feeKeyword) {

    const memoLineNumber = faker.random.number(RANDOM_NUMBER);
    const naturalAccountCode = faker.random.number(RANDOM_NUMBER);

    const fromDate = new Date();
    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 3);

    this.click('Add a new fee');
    this.fillField({ css: '#memoLine'}, memoLineNumber);
    this.fillField({ css: '#naturalAccountCode'}, '232425');
    this.fillField({ css: '#description'}, feeKeyword);
    this.fillField({ css: '#fromDate'}, fromDate.toLocaleDateString('en-GB'));
    this.fillField({ css: '#toDate'}, toDate.toLocaleDateString('en-GB'));
    this.fillField({ css: '#amount'}, 120.00);
    this.selectOption({ css: '#applicantType' }, 'all');
    this.selectOption({ css: '#jurisdiction1' }, 'family');
    this.selectOption({ css: '#jurisdiction2' }, 'family court');
    this.selectOption({ css: '#service' }, 'divorce');
    this.selectOption({ css: '#event' }, 'appeal');
    this.selectOption({ css: '#channel' }, 'online');
    this.selectOption({ css: '#direction' }, 'enhanced');
    this.fillField({ css: '#keyword'}, feeKeyword);
    this.fillField({ css: '#feeOrderName'}, feeKeyword);
    this.fillField({ css: '#statutoryInstrument'}, feeKeyword);
    this.fillField({ css: '#siRefId'}, feeKeyword);
    this.click('Save draft');
    this.wait(CCPBConstants.tenSecondWaitTime);
  },

  submitForApproval(feeKeyword) {
   this.see('My open action');
   this.click('My open action');
   this.see(feeKeyword);
   this.click(`//*[contains(text(),"${feeKeyword}")]/..//input[@type="submit" and @value = "Submit"]`)
   this.wait(CCPBConstants.fiveSecondWaitTime)
   // this.click('Submit');
   // this.dontSee('Submit');
  },

  verifyFeesSentForApproval(feeKeyword) {
    this.see('My open action');
    this.click('My open action');
    this.see(feeKeyword);
  }
});
