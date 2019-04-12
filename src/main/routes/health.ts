import * as express from 'express'
import * as config from 'config'
import * as healthcheck from '@hmcts/nodejs-healthcheck'

let healthCheckRouter = express.Router()
let healthCheckConfig = {
  checks: {
    'fees': basicHealthCheck('fees')
  }
}

export default express.Router().use(healthCheckRouter)
healthcheck.addTo(healthCheckRouter, healthCheckConfig)

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
