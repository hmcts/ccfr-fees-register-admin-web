'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function verifyFeeDraftHeaders(){
  const I = this;
  I.waitForText('Code',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Description',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Amount',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Statutory Instrument',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Service',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Valid from',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
}

function verifyFeeDraftHeadersAwaitingApproval(){
  const I = this;
  I.waitForText('Code',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Description',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Version',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Service',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Valid from',CCFRAcceptanceTestConstants.fiveSecondWaitTime);
}

module.exports = {
  verifyFeeDraftHeaders, verifyFeeDraftHeadersAwaitingApproval
};
