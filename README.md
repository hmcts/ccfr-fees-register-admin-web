# Fees Register Admin Web

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/ccfr-fees-register-admin-web.svg)](https://greenkeeper.io/)

This is the frontend application for CMC.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) >= v7.2.0
* [yarn](https://yarnpkg.com/)
* [Gulp](http://gulpjs.com/)

#### Private NPM repository

Private NPM repository is defined in `.npmrc` file. All dependencies should be pulled from the private repository. Pulling dependencies from the public NPM registry can not be guaranteed on the CI server.

### Running the application

Install dependencies by executing the following command:

 ```bash
$ yarn install
 ```

Run:

```bash
$ yarn start
```

It will be available at https://localhost:3000

## Developing

### Code style

We use [TSLint](https://palantir.github.io/tslint/) with [StandardJS](http://standardjs.com/index.html) rules alongside [sass-lint](https://github.com/sasstools/sass-lint)

Running the linting:
`yarn lint`

### Running the tests

Mocha is used for writing tests.
Run them with:
```bash
$ yarn test
```
### Running the Functional tests

configure the following environment variables
E2E_FRONTEND_URL=<PR/AAT>
TEST_URL=<PR/AAT>
To see steps running and screenshots on failover change the ```--reporter mochawesome``` to ```--steps"``` for ```yarn test:acceptance``` under package.

Run them with:
```bash
$ yarn test:acceptance
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details
