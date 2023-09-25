const CONF = require('config');

exports.config = {
  name: 'fee-reg-admin-webb-smoke-test',
  tests: './test/smoke-test.js',
  timeout: 10000,
  output: `${process.cwd()}/smoke-output/reports`,
  helpers: {
    Playwright: {
      url: `${CONF.e2e.frontendUrl}/health`,
      show: false,
      browser: 'chromium',
      waitForTimeout: 60001,
      waitForAction: 500,
      timeout: 20002,
      waitForNavigation: 'networkidle0',
      ignoreHTTPSErrors: true,
      fullPageScreenshots: true,
      uniqueScreenshotNames: true,
      recordVideo: {
        dir: `${process.cwd()}/smoke-output/reports`,
        size : {
          width: 1024,
          height: 768
        }
      }
    },
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2,
    },
    autoDelay: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    allure: {
      enabled: true,
      require: '@codeceptjs/allure-legacy'
    },
  },
  mocha: {}
};
