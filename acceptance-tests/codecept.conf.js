/* eslint-disable no-magic-numbers */
const CONF = require('config');

exports.config = {
  name: 'fee-register-admin-web-acceptance-tests',
  tests: './test/end-to-end/tests/*_test.js',
  timeout: 10000,
  output: './output',
  helpers: {
    Puppeteer: {
      url: CONF.e2e.frontendUrl,
      waitForNavigation: 'domcontentloaded',
      show: false,
      headless: true,
      ignoreHTTPSErrors: true,
      chrome: {
        ignoreHTTPSErrors: true,
        args: [
          '--no-sandbox',
          '--start-maximized'
        ]
      }
    },
    Mochawesome: { uniqueScreenshotNames: 'true' }
  },
  include: { I: './test/end-to-end/pages/steps_file.js' },
  mocha: {
    reporterOptions: {
      mochaFile: 'functional-output/result.xml',
      reportDir: 'functional-output',
      takePassedScreenshot: false,
      clearOldScreenshots: true,
      shortScrFileNames: false
    }
  },
  bootstrap: false
};
