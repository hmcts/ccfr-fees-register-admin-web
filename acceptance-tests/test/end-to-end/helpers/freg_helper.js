'use strict';

const idamHelper = require('./idam_helper');

const fetch = require('node-fetch');
const fregApi = process.env.FEE_REG_API || 'http://fees-register-api-aat.service.core-compute-aat.internal';

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
  deleteFee
};
