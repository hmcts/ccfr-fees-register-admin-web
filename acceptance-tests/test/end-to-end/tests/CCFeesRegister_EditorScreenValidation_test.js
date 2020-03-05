const CCFRATConstants = require('./CCFRAcceptanceTestConstants');

Feature('CC FeesRegister Admin Acceptance Tests');

BeforeSuite(I => {
  I.amOnPage('/');
  I.wait(CCFRATConstants.twoSecondWaitTime);
  I.resizeWindow(CCFRATConstants.windowsSizeX, CCFRATConstants.windowsSizeY);
});

Scenario('FeesRegister Admin Console Editor Screen Validation', I => {
  I.login('frpreprodsidameditor@mailnesia.com', 'LevelAt12');
  I.wait(CCFRATConstants.tenSecondWaitTime);
  I.waitForText('Welcome', CCFRATConstants.tenSecondWaitTime);
  I.see('Choose an action');
  I.see('Reference Data');
  I.see('Add a new fee');
  I.see('Upload fees');
  I.see('View all fees');
  I.see('View all discontinued fees');
  I.see('My open actions');
  I.see('Applicants');
  I.see('Jurisdictions 1');
  I.see('Jurisdictions 2');
  I.see('Services');
  I.see('Channels');
  I.see('Events');
  I.see('Directions');
  I.Logout();
});
