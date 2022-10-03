'use strict';

const idamHelper = require('./idam_helper');

const fetch = require('node-fetch');
const fregApi = process.env.FEE_REG_API || 'http://fees-register-api-aat.service.core-compute-aat.internal';

async function createFee(username, password, validFrom, feeKeyword, memoLineNumber) {
  const accessToken = await idamHelper.getIdamUserAccessToken(username, password);
  const data = {
    version: {
      description: 'E2E Testing',
      status: 'draft',
      version: 1,
      valid_from: validFrom,
      flat_amount: {
        amount: 120
      },
      memo_line: memoLineNumber,
      statutory_instrument: feeKeyword,
      last_amending_si: feeKeyword,
      consolidated_fee_order_name: feeKeyword,
      direction: 'enhanced',
      reason_for_update: 'New Fee Creation',
      si_ref_id: feeKeyword,
      natural_account_code: '232425'
    },
    jurisdiction1: 'family',
    jurisdiction2: 'family court',
    service: 'divorce',
    channel: 'online',
    event: 'hearing',
    keyword: feeKeyword,
    applicant_type: 'all'
  };
  return fetch(`${fregApi}/fees-register/fixed-fees`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken},
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status !== 201) {
      console.log(`Error creating the fee, response: ${response.status}`);
    }
    const location = response.headers.get('location');
    const feeCode = location.split('/');
    return feeCode[3];
  }).catch(err => {
    console.log(err);
  });
}

async function subbmitFeeForApproval(username, password, feeCode, version) {
  const accessToken = await idamHelper.getIdamUserAccessToken(username, password);
  return fetch(`${fregApi}/fees/${feeCode}/versions/${version}/submit-for-review`, {
    method: 'PATCH',
    headers: {'Authorization': 'Bearer ' + accessToken}
  }).then(response => {
    if (response.status !== 204) {
      console.log(`Error submitting fee for approval, response: ${response.status}`);
    }
  }).catch(err => {
    console.log(err);
  });
}

async function deleteFee(username, password, feeCode) {
  const accessToken = await idamHelper.getIdamUserAccessToken(username, password);
  return fetch(`${fregApi}/fees-register/fees/${feeCode}`, {
    method: 'DELETE',
    headers: {'Authorization': 'Bearer ' + accessToken}
  }).then(response => {
    if (response.status !== 204) {
      console.log(`Error deleting the test fee code, response: ${response.status}`);
    }
  }).catch(err => {
    console.log(err);
  });
}

module.exports = {
  createFee, subbmitFeeForApproval, deleteFee
};
