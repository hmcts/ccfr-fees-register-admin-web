/* eslint-disable */
const CONF = require('config');
const supportedBrowsers = require('./test/end-to-end/crossbrowser/supportedBrowsers.js');
const event = require('codeceptjs').event;
const container = require('codeceptjs').container;
const tests = 'test/end-to-end/tests/*_test.js';

const getBrowserConfig = browserGroup => supportedBrowsers[browserGroup].map(browserConfig => ({
  browser: browserConfig.browser,
  name: browserConfig.name,
  windowSize: browserConfig.windowSize,
}));

const setupConfig = {
  name: 'cross-browser',
  tests: tests,
  output: `${process.cwd()}/functional-output/cross-browser/reports`,
  helpers: {
    Playwright: {
      url: CONF.e2e.frontendUrl,
      browser: 'chromium',
      name: 'chromium',
      windowSize: '1400x1050',
      waitForTimeout: 60002,
      waitForAction: 800,
      timeout: 20004,
      waitForNavigation: 'domcontentloaded',
      ignoreHTTPSErrors: true,
    }
  },
  plugins: {
    retryFailedStep: {
      enabled: true,
      retries: 2
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
    }
  },
  include: {
    I: './test/end-to-end/pages/steps_file.js'
  },
  multiple: {
    webkit: {
      tests,
      browsers: getBrowserConfig('webkit')
    },
    chromium: {
      tests,
      browsers: getBrowserConfig('chromium')
    },
    firefox: {
      tests,
      browsers: getBrowserConfig('firefox')
    }
  }
};

event.dispatcher.on(event.test.before, function (test) {
  const {Playwright} = container.helpers();
  test.title = test.title + ' - ' + Playwright.options.name;
});

exports.config = setupConfig;
