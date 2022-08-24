      
import cookieManager from '@hmcts/cookie-manager';

cookieManager.on('UserPreferencesLoaded', (preferences) => {
  const dataLayer = window.dataLayer || [];
  dataLayer.push({'event': 'Cookie Preferences', 'cookiePreferences': preferences});
});

cookieManager.on('UserPreferencesSaved', (preferences) => {
  const dataLayer = window.dataLayer || [];
  const dtrum = window.dtrum;

  dataLayer.push({'event': 'Cookie Preferences', 'cookiePreferences': preferences});

  if(dtrum !== undefined) {
    if(preferences.apm === 'on') {
      dtrum.enable();
      dtrum.enableSessionReplay();
    } else {
      dtrum.disableSessionReplay();
      dtrum.disable();
    }
  }
});

cookieManager.on('PreferenceFormSubmitted', () => {
  const message = document.querySelector('.cookie-preference-success');
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}); 

const config = {
  userPreferences: {
    cookieName: 'fee-register-admin-cookie-preferences',
  },
  preferencesForm: {
    class: 'cookie-preferences-form',
  },
  cookieManifest: [
    {
      categoryName: 'analytics',
      cookies: [
        '_ga',
        '_gid',
        '_gat_UA-'
      ]
    },
    {
      categoryName: 'apm',
      cookies: [
        'dtCookie',
        'dtLatC',
        'dtPC',
        'dtSa',
        'rxVisitor',
        'rxvt'
      ]
    },
    {
        categoryName: 'essential',
        optional: false,
        matchBy: 'exact',
        cookies: [
          '_csrf',
          '__user-info'
        ]
      }
  ]
};

cookieManager.init(config);