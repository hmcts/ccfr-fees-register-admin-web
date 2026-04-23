'use strict'

module.exports = {
    exit: true,
    timeout: 10000,
    recursive: true,
    extension: ['ts', 'js'],
    loader: 'ts-node/esm',
    require: [
      'ts-node/register',
      'tsconfig-paths/register'
    ],
    reporter: 'mochawesome'
}
