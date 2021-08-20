'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function verifyFeesHeaders(){
  const I = this;
  I.waitForText('Live fees', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.waitForText('Code',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Description',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Amount',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Statutory Instrument',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('SI Ref ID',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Last Amending SI',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Consolidated/Original Fee Order Name',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Service',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Jurisdiction1',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Jurisdiction2',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Event',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Range from',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Range to',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Unit',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Fee type',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Amount type',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('%',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Channel',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Keyword',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Applicant type',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Version',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Direction',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Valid from',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Valid to',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Status',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Memo',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Natural Account Code',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
}

function verifyDownloadLink(){
  const I = this;
  I.waitForValue('//input','Download all fees', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
}

function clickDownloadLink(){
  const I = this;
  I.click('Download all fees');
  I.wait(CCFRAcceptanceTestConstants.fiveSecondWaitTime);
}

module.exports = {
  verifyFeesHeaders, verifyDownloadLink, clickDownloadLink
};
