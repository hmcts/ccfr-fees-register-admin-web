const LATEST_MAC = 'macOS 10.15';
const LATEST_WINDOWS = 'Windows 10';

const supportedBrowsers = {
  microsoft: {
    ie11: {
      browserName: 'internet explorer',
      platformName: LATEST_WINDOWS,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'FeeAndPay: IE11_LATEST',
        extendedDebugging: true,
        capturePerformance: true
      }
    }
  },
  chrome: {
    chrome_win_latest: {
      browserName: 'chrome',
      platformName: LATEST_WINDOWS,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'FeeAndPay: WIN_CHROME_LATEST',
        extendedDebugging: true,
        capturePerformance: true
      }
    },
    chrome_mac_latest: {
      browserName: 'chrome',
      platformName: LATEST_MAC,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'FeeAndPay: MAC_CHROME_LATEST',
        extendedDebugging: true,
        capturePerformance: true
      }
    }
  },
  firefox: {
    firefox_win_latest: {
      browserName: 'firefox',
      platformName: LATEST_WINDOWS,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'FeeAndPay: WIN_FIREFOX_LATEST',
        extendedDebugging: true,
        capturePerformance: true
      }
    }
  },
  safari: {
    safari_mac_latest: {
      browserName: 'safari',
      platformName: LATEST_MAC,
      browserVersion: 'latest',
      'sauce:options': {
        name: 'FeeAndPay: MAC_SAFARI_LATEST',
        extendedDebugging: true,
        capturePerformance: true
      }
    }
  }
};

module.exports = supportedBrowsers;
