'use strict';
const CCFRAcceptanceTestConstants = require('../tests/CCFRAcceptanceTestConstants');

function verifyReferenceData() {
  const I = this;

  // Applicants
  I.click('//*[@id="content"]/div/details[1]/summary/span');
  I.waitForText('personal', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('all');
  I.see('professional');

  // Jurisdictions 1
  I.click('//*[@id="content"]/div/details[2]/summary/span');
  I.waitForText('civil', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('family');
  I.see('tribunal');

  // Jurisdictions 2
  I.click('//*[@id="content"]/div/details[3]/summary/span');
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
  I.click('//*[@id="content"]/div/details[4]/summary/span');
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
  I.click('//*[@id="content"]/div/details[5]/summary/span');
  I.waitForText('online', CCFRAcceptanceTestConstants.fiveSecondWaitTime);
  I.see('bulk');
  I.see('default');

  // Events
  I.click('//*[@id="content"]/div/details[6]/summary/span');
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
  I.click('//*[@id="content"]/div/details[7]/summary/span');
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
