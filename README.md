# Fees Register Admin Web

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/hmcts/ccfr-fees-register-admin-web.svg)](https://greenkeeper.io/)

This is the frontend application for CMC.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) >= v18.17.1
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
#### Running the Functional tests

configure the following environment variables
TEST_URL=<PR/AAT>

Run them with:
```bash
$ yarn test:functional
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
