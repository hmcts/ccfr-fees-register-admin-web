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
function verifyFeeDetails(feeCode, siRefID, consolidatedOriginalFeeOrderName, service, event, description, statutoryInstrument,
lastAmendingSI, jurisdiction1, jurisdiction2, feeType, amountType, amount, percentage, validFrom, version, reasonForFeeUpdate, naturalAccountCode,
memo, direction, applicantType, keyword, channel, status, editor, approver) {
  const I = this;
  I.click(feeCode);
  I.waitForText('Fee details', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.see('Code');
  I.see(feeCode);
  I.see('SI Ref ID');
  I.see(siRefID);
  I.see('Consolidated/Original Fee Order Name');
  I.see(consolidatedOriginalFeeOrderName);
  I.see('Service');
  I.see(service);
  I.see('Event');
  I.see(event);
  I.see('Description');
  I.see(description);
  I.see('Statutory Instrument');
  I.see(statutoryInstrument);
  I.see('Last Amending SI');
  I.see(lastAmendingSI);
  I.see('Jurisdiction 1');
  I.see(jurisdiction1);
  I.see('Jurisdiction 2');
  I.see(jurisdiction2);
  I.see('Fee type');
  I.see(feeType);
  I.see('Amount type');
  I.see(amountType);
  I.see('Amount');
  I.see('£'+amount);
  I.see('Percentage');
  I.see(percentage);
  I.see('Valid from');
  I.see(validFrom);
  I.see('Version');
  I.see(version);
  I.see('Reason for fee update');
  I.see(reasonForFeeUpdate);
  I.see('Natural account code');
  I.see(naturalAccountCode);
  I.see('Memo');
  I.see(memo);
  I.see('Direction');
  I.see(direction);
  I.see('Applicant type');
  I.see(applicantType);
  I.see('Keyword');
  I.see(keyword);
  I.see('Channel');
  I.see(channel);
  I.see('Status');
  I.see(status);
  I.see('Editor');
  I.see(editor);
  I.see('Approver');
  I.see(approver);
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
  verifyFeesHeaders , verifyFeeDetails, verifyDownloadLink, clickDownloadLink
};
