'use strict';
/* eslint-disable */
const pa11y = require('pa11y');
const fs = require('fs');
const htmlReporter = require('pa11y-reporter-html');
const outputFolder = 'functional-output';
const url = process.env.TEST_URL;
const editorUsername = process.env.EDITOR_USERNAME;
const editorPassword = process.env.EDITOR_PASSWORD;
const approverUsername = process.env.APPROVER_USERNAME;
const approverPassword = process.env.APPROVER_PASSWORD;

// Generates HTML reporter
const generateHTMLReport = html => new Promise((resolve, reject) => {
  fs.appendFile(`${outputFolder}/a11y.html`, html, err => {
    if (err) reject(new Error(err));
    resolve({message: 'a11y report file updated.'});
  });
});

async function runEditorTests() {

  try {

    // Pages running the tests
    console.log("admin/V2/all-fees page");
    const pa11yResult1 = await pa11y(`${url}/admin/V2/all-fees`, {
      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/V2/all-fees',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-all-fees.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/V2/all-approvedbutnotlive page");
    const pa11yResult2 = await pa11y(`${url}/admin/V2/all-approvedbutnotlive`, {
      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/V2/all-approvedbutnotlive',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-all-approvedbutnotlive.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/V2/all-discontinued page");
    const pa11yResult3 = await pa11y(`${url}/admin/V2/all-discontinued`, {

      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/V2/all-discontinued',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-all-discontinued.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/v2/upload page");
    const pa11yResult4 = await pa11y(`${url}/admin/v2/upload`, {

      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/v2/upload',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-upload.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/v2/fees/create page");
    const pa11yResult5 = await pa11y(`${url}/admin/v2/fees/create`, {

      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/v2/fees/create',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-fees-create.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/v2/reference-data page");
    const pa11yResult6 = await pa11y(`${url}/admin/v2/reference-data`, {

      actions: [
        `set field #username to ${editorUsername}`,
        `set field #password to ${editorPassword}`,
        'click element .button',
        'wait for path to be /admin/v2/reference-data',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-reference-data.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    const pa11yResults = [pa11yResult1, pa11yResult2, pa11yResult3, pa11yResult4, pa11yResult5, pa11yResult6];

    for (let index = 0; index < pa11yResults.length; index++) {
      const pa11yResult = pa11yResults[index];

      htmlReporter.results(pa11yResult)
        .then(htmlResults =>
          generateHTMLReport(htmlResults)
            .then(response => {
              console.log(`Url: ${pa11yResult.pageUrl}`);
              console.log(`Number of issues: ${pa11yResult.issues.length}`);
              console.log(`File Status: ${response.message}`);
              console.log('--');
            })
            .catch(console.error));
    }
  } catch (error) {
    console.log(error);
  }
}

async function runApproverTests() {

  try {

    // Pages running the tests
    console.log("admin/V2/pending-approval page");
    const pa11yResult1 = await pa11y(`${url}/admin/V2/pending-approval`, {
      actions: [
        `set field #username to ${approverUsername}`,
        `set field #password to ${approverPassword}`,
        'click element .button',
        'wait for path to be /admin/V2/pending-approval',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-pending-approval.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/V2/fee-details page");
    const pa11yResult2 = await pa11y(`${url}/admin/V2/fee-details?draft=true&feeCode=FEE0002&pageType=pa&vno=1`, {
      actions: [
        `set field #username to ${approverUsername}`,
        `set field #password to ${approverPassword}`,
        'click element .button',
        'wait for element .heading-xlarge to be visible',
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-fee-details.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/V2/approval-confirmation page");
    const pa11yResult3 = await pa11y(`${url}/admin/V2/approval-confirmation?feeCode=FEE1291`, {
      actions: [
        `set field #username to ${approverUsername}`,
        `set field #password to ${approverPassword}`,
        'click element .button',
        'wait for element .govuk-panel__title to be visible'
      ],
      wait: 2000,
      timeout: 70000,
      screenCapture: `${outputFolder}/admin-V2-approval-confirmation .png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });

    console.log("admin/V2/reject-fee-reason page");
    const pa11yResult4 = await pa11y(`${url}/admin/v2/reject-fee-reason/FEE1286/1`, {
      actions: [
        `set field #username to ${approverUsername}`,
        `set field #password to ${approverPassword}`,
        'click element .button',
        'wait for element .heading-xlarge to be visible',
        'set field #reasonForReject to testing',
        'click element .button',
        'wait for element .govuk-panel__title to be visible'
      ],
      wait: 100000,
      timeout: 100000,
      screenCapture: `${outputFolder}/admin-V2-reject-fee-reason.png`,
      log: {
        debug: console.log,
        error: console.error,
        info: console.log
      }
    });


    const pa11yResults = [pa11yResult1, pa11yResult2, pa11yResult3, pa11yResult4];

    for (let index = 0; index < pa11yResults.length; index++) {
      const pa11yResult = pa11yResults[index];

      htmlReporter.results(pa11yResult)
        .then(htmlResults =>
          generateHTMLReport(htmlResults)
            .then(response => {
              console.log(`Url: ${pa11yResult.pageUrl}`);
              console.log(`Number of issues: ${pa11yResult.issues.length}`);
              console.log(`File Status: ${response.message}`);
              console.log('--');
            })
            .catch(console.error));
    }
  } catch (error) {
    console.log(error);
  }

}

runEditorTests();
runApproverTests();
