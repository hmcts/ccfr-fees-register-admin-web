'use strict';

const fetch = require('node-fetch');
const uuid = require('uuid');
const authCache = require('./local_auth_cache');

const idamApi = process.env.IDAM_API_URL || 'https://idam-api.aat.platform.hmcts.net';
const idamTestingSupportApi = process.env.IDAM_TESTING_SUPPORT_API || 'https://idam-testing-support-api.aat.platform.hmcts.net';
const clientId ='fees_admin_frontend';
const clientSecret = process.env.CLIENT_SECRET;
const clientRedirectUri = process.env.CLIENT_REDIRECT_URI || 'https://fees-register.aat.platform.hmcts.net/oauth2/callback';
const scope = 'openid profile roles search-user';

async function getAccessTokenClientSecret() {
  return authCache.getOrCreate(['fees-register-admin-web', idamApi, 'client_credentials', clientId], async () => {
    let searchParams = new URLSearchParams();
    searchParams.set('grant_type', 'client_credentials');
    searchParams.set('client_id', clientId);
    searchParams.set('client_secret', clientSecret);
    searchParams.set('scope', 'profile roles');

    const response = await fetch(`${idamApi}/o/token`, {
      method: 'POST',
      body: searchParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    if (!response.ok) {
      throw new Error(`IDAM client credentials request failed with status ${response.status}`);
    }

    const json = await response.json();
    if (!json.access_token) {
      throw new Error('IDAM client credentials response did not include access_token');
    }
    return json.access_token;
  });
}

async function createIdamUserUsingTestingSupportService(forename, email, password, userRoles) {
  const accessToken = await this.getAccessTokenClientSecret();
  const userId = uuid.v4();
  const data = {
    activationSecretPhrase: password,
    user: {
      id: userId,
      email: email,
      forename: forename,
      surname: 'User',
      displayName: forename + ' User',
      roleNames: userRoles
    }
  };
  return fetch(`${idamTestingSupportApi}/test/idam/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken},
  }).then(res => res.json())
    .then((json) => {
      return json;
    })
    .catch(err => {
      console.log(err);
    });
}

async function getIdamUserAccessToken(username, password) {
  return authCache.getOrCreate(
    ['fees-register-admin-web', idamApi, 'password', username, clientId, clientRedirectUri, scope],
    async () => {
      let searchParams = new URLSearchParams();
      searchParams.set('grant_type', 'password');
      searchParams.set('username', username);
      searchParams.set('password', password);
      searchParams.set('client_id', clientId);
      searchParams.set('client_secret', clientSecret);
      searchParams.set('redirect_uri', clientRedirectUri);
      searchParams.set('scope', scope);

      const response = await fetch(`${idamApi}/o/token`, {
        method: 'POST',
        body: searchParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      if (!response.ok) {
        throw new Error(`IDAM user token request failed with status ${response.status} for ${username}`);
      }

      const json = await response.json();
      if (!json.access_token) {
        throw new Error(`IDAM user token response did not include access_token for ${username}`);
      }
      return json.access_token;
    }
  );
}

module.exports = {
  getAccessTokenClientSecret, createUserUsingTestingSupportService: createIdamUserUsingTestingSupportService, getIdamUserAccessToken
};

