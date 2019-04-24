process.env.TS_NODE_FAST = "true"
require('ts-node/register')
require('tsconfig-paths/register')
require('./src/main/server.ts')
require('@hmcts/properties-volume').addTo(require('config'))
