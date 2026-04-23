'use strict'

module.exports = {
    exit: true,
    timeout: 10000,
    recursive: true,
    extension: ['ts', 'js'],
    'node-option': [
      'loader=./node_modules/ts-node/esm.mjs'
    ],
    require: [
      'ts-node/register',
      'tsconfig-paths/register.js'
    ],
    reporter: 'mochawesome'
}
