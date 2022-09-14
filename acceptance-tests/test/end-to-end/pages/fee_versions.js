'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function verifyCurrentFeeVersion(cVersion, pVersion, cDescription, pDescription, cInstrument, pInstrument, cValidTo, pValidTo, cMemo, pMemo, cEditor, pEditor, cApprover, pApprover,
                           code, service, event, jurisdiction1, jurisdiction2, feeType, amountType, applicantType, keyword, channel, amount, siRefId, reasonForFeeUpdate, consolidateOrderFee,
                           lastAmendingSI, validFrom, naturalAccountCode, status, direction) {
  const I = this;
  I.waitForText('Fee versions', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.see('Version '+cVersion);

  I.click('//span[contains(text(),"Version '+cVersion+'")]');
  I.wait(CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Updated details', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('Version');
  I.see(cVersion);
  I.see(pVersion);
  I.see('Description');
  I.see(cDescription);
  I.see(pDescription);
  I.see('Statutory Instrument');
  I.see(cInstrument);
  I.see(pInstrument);
  I.see('Valid to');
  I.see(cValidTo);
  I.see(pValidTo);
  I.see('Memo');
  I.see(cMemo);
  I.see(pMemo);
  I.see('Editor');
  I.see(cEditor);
  I.see(pEditor);
  I.see('Approver');
  I.see(cApprover);
  I.see(pApprover);

//Existing Details
  I.see('Existing details');
  I.see('Code');
  I.see(code);
  I.see('Service');
  I.see(service);
  I.see('Event');
  I.see(event);
  I.see('Jurisdiction1');
  I.see(jurisdiction1);
  I.see('Jurisdiction2');
  I.see(jurisdiction2);
  I.see('Fee type');
  I.see(feeType);
  I.see('Amount type');
  I.see(amountType);
  I.see('Applicant type');
  I.see(applicantType);
  I.see('Keyword');
  I.see(keyword);
  I.see('Channel');
  I.see(channel);
  I.see('Amount');
  I.see('£'+amount);
  I.see('SI Ref ID');
  I.see(siRefId);
  I.see('Reason for fee update');
  I.see(reasonForFeeUpdate);
  I.see('Consolidated/Original Fee Order Name');
  I.see(consolidateOrderFee);
  I.see('Last Amending SI');
  I.see(lastAmendingSI);
  I.see('Valid from');
  I.see(validFrom);
  I.see('Natural Account Code');
  I.see(naturalAccountCode);
  I.see('Status');
  I.see(status);
  I.see('Direction');
  I.see(direction);
}

function verifyPreviousFeeVersion(version, code, service, event, jurisdiction1, jurisdiction2, feeType, amountType, applicantType, keyword, channel) {
  const I = this;
  I.waitForText('Fee versions', CCFRAcceptanceTestConstants.tenSecondWaitTime);
  I.see('Version '+version);

  I.click('//span[contains(text(),"Version '+version+'")]');
  I.wait(CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.waitForText('Code', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see(code);
  I.see('Service');
  I.see(service);
  I.see('Event');
  I.see(event);
  I.see('Jurisdiction1');
  I.see(jurisdiction1);
  I.see('Jurisdiction2');
  I.see(jurisdiction2);
  I.see('Fee type');
  I.see(feeType);
  I.see('Amount type');
  I.see(amountType);
  I.see('Applicant type');
  I.see(applicantType);
  I.see('Keyword');
  I.see(keyword);
  I.see('Channel');
  I.see(channel);
}

module.exports = {
  verifyCurrentFeeVersion, verifyPreviousFeeVersion
};
