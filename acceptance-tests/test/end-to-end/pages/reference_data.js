'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function section(label) {
  return `//details/summary/span[normalize-space()="${label}"]`;
}

function verifyReferenceData() {
  const I = this;

  // Applicants
  I.click(section('Applicants'));
  I.waitForText('personal', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('all');
  I.see('professional');

  // Jurisdictions 1
  I.click(section('Jurisdictions 1'));
  I.waitForText('civil', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('family');
  I.see('tribunal');

  // Jurisdictions 2
  I.click(section('Jurisdictions 2'));
  I.waitForText('county court', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('high court');
  I.see('magistrates court');
  I.see('court of protection');
  I.see('family court');
  I.see('probate registry');
  I.see('gambling tribunal');
  I.see('gender recognition panel');
  I.see('immigration and asylum chamber');
  I.see('property chamber');
  I.see('upper tribunal immigration and asylum chamber');
  I.see('upper tribunal lands chamber');
  I.see('civil');
  I.see('employment appeal tribunal');
  I.see('employment tribunal');

  // Services
  I.click(section('Services'));
  I.waitForText('civil money claims', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('possession claim');
  I.see('insolvency');
  I.see('private law');
  I.see('public law');
  I.see('divorce');
  I.see('adoption');
  I.see('gambling');
  I.see('gender recognition');
  I.see('immigration and asylum');
  I.see('property');
  I.see('probate');
  I.see('general');
  I.see('magistrates');
  I.see('other');
  I.see('appeal');
  I.see('judicial review');
  I.see('civil');

  // Channels
  I.click(section('Channels'));
  I.waitForText('online', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('bulk');
  I.see('default');

  // Events
  I.click(section('Events'));
  I.waitForText('enforcement', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('enforcement');
  I.see('appeal');
  I.see('search');
  I.see('issue');
  I.see('general application');
  I.see('copies');
  I.see('hearing');
  I.see('miscellaneous');
  I.see('cost assessment');

  // Directions
  I.click(section('Directions'));
  I.waitForText('cost recovery', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('enhanced');
  I.see('licence');
  I.see('partial cost recovery');
  I.see('pre cost recovery');
  I.see('reduced churn');
  I.see('simplified');
  I.see('inflationary');

}

module.exports = {
  verifyReferenceData
};
