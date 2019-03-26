import * as express from 'express'
import * as config from 'config'
import * as healthcheck from '@hmcts/nodejs-healthcheck'

// ignore self signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

function basicHealthCheck (serviceName) {
  return healthcheck.web(url(serviceName))
}

function url (serviceName: string): string {
  const healthCheckUrlLocation = `${serviceName}.healthCheckUrl`

  if (config.has(healthCheckUrlLocation)) {
    return config.get<string>(healthCheckUrlLocation)
  } else {
    return config.get<string>(`${serviceName}.url`) + '/health'
  }
}

let healthCheckRouter = express.Router()
let healthCheckConfig = {
  checks: {
    'fees': basicHealthCheck('fees'),
    'idamapi': basicHealthCheck('idam.api'),
    'idamauthenticationweb': basicHealthCheck('idam.authentication-web')
  }
}

export default express.Router().use(healthCheckRouter)
healthcheck.addTo(healthCheckRouter, healthCheckConfig)
