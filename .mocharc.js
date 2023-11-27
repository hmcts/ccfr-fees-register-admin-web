'use strict'

module.exports = {
    exit: true,
    timeout: 10000,
    recursive: true,
    require: [
      'ts-node/register',
      'tsconfig-paths/register'
    ],
    reporter: 'mochawesome'
}
