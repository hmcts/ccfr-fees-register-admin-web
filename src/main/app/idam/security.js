/* eslint-disable max-lines */
'use strict';

const request = require('superagent');
const URL = require("url");
const UUID = require("uuid/v4");

const SECURITY_COOKIE = '__auth-token';
const REDIRECT_COOKIE = '__redirect';

const ACCESS_TOKEN_OAUTH2 = 'access_token';

function Security(options) {
  this.opts = options || {};

  if (!this.opts.loginUrl) {
    throw new Error('login URL required for Security');
  }
}

/* --- INTERNAL --- */

function addOAuth2Parameters(url, state, self, req) {

  url.query.response_type = "code";
  url.query.state = state;
  url.query.client_id = self.opts.clientId;
  url.query.scope = 'openid profile roles';
  url.query.redirect_uri = req.protocol + "://" + req.get('host') + self.opts.redirectUri;

}

function login(req, res, roles, self) {

  const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var state = generateState();

  storeRedirectCookie(req, res, originalUrl, state);

  var url;

  if (roles.includes('letter-holder')) {
    url = URL.parse(self.opts.loginUrl + "/pin", true);
  } else {
    url = URL.parse(self.opts.loginUrl, true);
  }

  addOAuth2Parameters(url, state, self, req);

  res.redirect(url.format());

}

function denyAccess(next, msg) {
  next({status: 401, code: "UNAUTHORIZED", error: msg});
}

function forbidAccess(next, msg) {
  next({status: 403, code: "FORBIDDEN", error: msg});
}

function authorize(roles, res, next, self) {

  if (roles !== null) {
    for (var role in self.roles) {
      if (roles.includes(self.roles[role])) {
        res.locals.isLoggedIn = true
        return next();
      }
    }
  }

  return forbidAccess(next, 'ERROR: Access forbidden - User does not have any of ' + self.roles + '. Actual roles:' + roles);
}

function getTokenFromCode(self, req) {

  var url = URL.parse(self.opts.apiUrl + "/o/token", true);

  return request.post(url.format())
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .type('form')
    .send({ client_id: self.opts.clientId })
    .send({ client_secret: self.opts.clientSecret })
    .send({"grant_type": 'authorization_code'})
    .send({"code": req.query.code})
    .send({"redirect_uri": req.protocol + "://" + req.get('host') + self.opts.redirectUri});
}

function getUserDetails(self, securityCookie) {
  return request.get(self.opts.apiUrl + "/o/userinfo")
    .set('Accept', 'application/json')
    .set('Authorization', "Bearer " + securityCookie);
}

function storeCookie(req, res, token) {
  req.authToken = token;

  if (req.protocol === "https") { /* SECURE */
    res.cookie(SECURITY_COOKIE, req.authToken, {secure: true, httpOnly: true});
  } else {
    res.cookie(SECURITY_COOKIE, req.authToken, {httpOnly: true});
  }
}

function handleCookie(req) {

  if (req.cookies && req.cookies[SECURITY_COOKIE]) {
    req.authToken = req.cookies[SECURITY_COOKIE];
    return req.authToken;
  }

  return null;
}

Security.prototype.logout = function () {
  const self = {opts: this.opts};

// eslint-disable-next-line no-unused-vars
  return function (req, res, next) {

    var token = req.cookies[SECURITY_COOKIE];

    res.clearCookie(SECURITY_COOKIE);
    res.clearCookie(REDIRECT_COOKIE);

    if (token) {
      res.redirect(self.opts.loginUrl + "/logout?jwt=" + token);
    } else {
      res.redirect(self.opts.loginUrl + "/logout");
    }
  }

};

function protectImpl(req, res, next, self) {

  var securityCookie = handleCookie(req);

  if (!securityCookie) {
    return login(req, res, self.roles, self);
  }

  getUserDetails(self, securityCookie).end(
    function (err, response) {

      if (err) {

        if (!err.status) {
          err.status = 500;
        }

        switch (err.status) {
          case 401 :
            return login(req, res, self.roles, self);
          case 403 :
            return forbidAccess(next, "Access Forbidden");
          default :
            return next({status: err.status, details: JSON.stringify(err)});
        }
      }

      res.locals.user = {
        userInfo: response.body.roles,
        bearerToken: securityCookie,
        allInfo: response.body
      };
      req.roles = response.body.roles;
      req.bearerToken = securityCookie;
      req.userInfo = response.body;
      authorize(response.body.roles, res, next, self);

    });
}

Security.prototype.protect = function (role) {
  if (process.env.DISABLE_AUTH === 'true') {
    return function (req, res, next) {
      res.locals.user = {
        userInfo: ['freg'],
        bearerToken: 'spoof_bearer_token',
        allInfo: {
          roles: []
        }
      }
      next()
    };
  }

  const self = {
    roles: [role],
    new: false,
    opts: this.opts
  };

  return function (req, res, next) {
    protectImpl(req, res, next, self);
  };
};

Security.prototype.protectWithAnyOf = function (roles) {
  const self = {
    roles: roles,
    new: false,
    opts: this.opts
  };

  return function (req, res, next) {
    protectImpl(req, res, next, self);
  };
};

Security.prototype.protectWithUplift = function (role, roleToUplift) {

  const self = {
    role: role,
    roleToUplift: roleToUplift,
    new: false,
    opts: this.opts
  };

  return function (req, res, next) {

    /* Read the value of the token from the cookie */
    var securityCookie = handleCookie(req);

    if (!securityCookie) {
      return login(req, res, self.role, self);
    }

    getUserDetails(self, securityCookie)
      .end(function (err, response) {

        if (err) {

          /* If the token is expired we want to go to login.
          * - This invalidates correctly sessions of letter users that does not exist anymore
          */
          if (err.status === 401) {
            return login(req, res, [], self);
          } else {
            return denyAccess(next, err + ": " + response.text);
          }
        }

        req.roles = response.body.roles;
        req.userInfo = response.body;

        if (req.roles.includes(self.role)) { /* LOGGED IN ALREADY WITH THE UPLIFTED USER */
          return next();
        }

        if (!req.roles.includes(self.roleToUplift)) {
          return denyAccess(next, "This user can not uplift");
        }

        /* REDIRECT TO UPLIFT PAGE */
        const originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

        var state = generateState();
        storeRedirectCookie(req, res, originalUrl, state);

        var url = URL.parse(self.opts.loginUrl + "/uplift", true);
        addOAuth2Parameters(url, state, self, req);
        url.query.jwt = securityCookie;

        res.redirect(url.format());

      });
  };
};

function generateState() {
  return UUID();
}

function storeRedirectCookie(req, res, continue_url, state) {

  var url = URL.parse(continue_url);

  var cookieValue = {continue_url: url.path, state: state};

  if (req.protocol === "https") {
    res.cookie(REDIRECT_COOKIE, JSON.stringify(cookieValue), {secure: true, httpOnly: true});
  } else {
    res.cookie(REDIRECT_COOKIE, JSON.stringify(cookieValue), {httpOnly: true});
  }
}

function getRedirectCookie(req) {

  if (!req.cookies[REDIRECT_COOKIE]) {
    return null;
  }

  return JSON.parse(req.cookies[REDIRECT_COOKIE]);
}

/* Callback endpoint */
Security.prototype.OAuth2CallbackEndpoint = function () {

  const self = {opts: this.opts};

  return function (req, res, next) {

    /* We clear any potential existing sessions first, as we want to start over even if we deny access */
    res.clearCookie(SECURITY_COOKIE);

    /* We check that our stored state matches the requested one */
    var redirectInfo = getRedirectCookie(req);

    if (!redirectInfo) {
      return denyAccess(next, "Redirect cookie is missing");
    }

    if (redirectInfo.state !== req.query.state) {
      return denyAccess(next, "States do not match: " + redirectInfo.state + " is not " + req.query.state);
    }

    if (!redirectInfo.continue_url.startsWith('/')) {
      return denyAccess(next, "Invalid redirect_uri: " + redirectInfo.continue_url);
    }

    if (!req.query.code) {
      return res.redirect(redirectInfo.continue_url);
    }

    getTokenFromCode(self, req).end(function (err, response) { /* We ask for the token */

      if (err) {
        return denyAccess(next, err);
      }

      /* We store it in a session cookie */
      storeCookie(req, res, response.body[ACCESS_TOKEN_OAUTH2]);

      /* We delete redirect cookie */
      res.clearCookie(REDIRECT_COOKIE);

      /* And we redirect back to where we originally tried to access */
      res.redirect(redirectInfo.continue_url);

    });
  }
};

module.exports = Security;
