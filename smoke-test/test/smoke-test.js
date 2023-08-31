Feature('FEE Reg Admin Web Smoke Test');

Scenario('FEE Reg Admin Web Health Check Test', ({ I }) => {
  I.amOnPage('/');
  I.see('{"status":"UP"}');
});
