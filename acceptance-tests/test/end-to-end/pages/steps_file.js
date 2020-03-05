'use strict';
const CCPBConstants = require('../tests/CCFRAcceptanceTestConstants');
// in this file you can append custom step methods to 'I' object
// const faker = require('faker');
const faker = require('faker');

const RANDOM_NUMBER = 9999999999999999;

const CCDNumber = faker.random.number(RANDOM_NUMBER);

module.exports = () => actor({
  // done
  login(email, password) {
    this.amOnPage('/');
    this.retry(CCPBConstants.retryCountForStep).waitForElement('#username', CCPBConstants.thirtySecondWaitTime);
    this.fillField('Email address', email);
    this.fillField('Password', password);
    this.waitForElement({ css: '[type="submit"]' }, CCPBConstants.thirtySecondWaitTime);
    this.click({ css: '[type="submit"]' });
  },

  Logout() {
    this.moveCursorTo('#proposition-links > li > a');
    this.see('Sign out (editor editor)');
    this.click('Sign out (editor editor)');
    this.wait(CCPBConstants.fiveSecondWaitTime);
  },
});
