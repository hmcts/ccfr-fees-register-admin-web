'use strict'

module.exports = {
    // Keep TypeScript compilation in ts-node; native stripping cannot handle decorators or parameter properties.
    'node-option': ['no-experimental-strip-types'],
    exit: true,
    timeout: 10000,
    recursive: true,
    require: [
      'ts-node/register',
      'tsconfig-paths/register'
    ],
    reporter: 'mochawesome'
}
