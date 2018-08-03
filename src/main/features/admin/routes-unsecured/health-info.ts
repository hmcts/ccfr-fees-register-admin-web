import * as express from 'express'

import { Paths } from 'admin/paths'

import * as config from 'config'
import * as healthcheck from '@hmcts/nodejs-healthcheck'
import { CompositeCheck } from '@hmcts/nodejs-healthcheck/healthcheck/checks'
import * as outputs from '@hmcts/nodejs-healthcheck/healthcheck/outputs'
import { getBuildInfo } from '@hmcts/nodejs-healthcheck/healthcheck/routes'

// ignore self signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

function renderHealthPage (config, req: express.Request, res: express.Response) {
  const check = new CompositeCheck(config.checks)
  getBuildInfo().then((buildInfo) => {
    return buildInfo
  }).then((buildInfo) => {
    Promise
      .resolve(check.call(req, res))
      .then((results) => {
        const allOk = Object.values(results)
          .every(result => {

            if (!result['status']) {
              result['status'] = outputs.DOWN
            }

            return result['status'] === outputs.UP
          })
        const output = Object.assign(
          outputs.status(allOk),
          results)

        res.send({ ...output, buildInfo })
      })
  })
}

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

export default express.Router()
  .get(Paths.healthInfoPage.uri, (req: express.Request, res: express.Response) => {

    renderHealthPage({
      checks: {
        'fees': basicHealthCheck('fees'),
        'idamapi': basicHealthCheck('idam.api'),
        'idamauthenticationweb': basicHealthCheck('idam.authentication-web')
      }
    }, req, res)
  })
