'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function verifyFeeDetails(feeTypeFlag, feeCode, siRefID, consolidatedOriginalFeeOrderName, service, event, description, statutoryInstrument,
lastAmendingSI, jurisdiction1, jurisdiction2, feeType, amountType, amount, percentage, validFrom, validTo, version, reasonForFeeUpdate, naturalAccountCode,
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

  if(feeTypeFlag === 'disconnected') {
    I.see('Valid to');
    I.see(validTo);
  }
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

module.exports = {
  verifyFeeDetails
};
