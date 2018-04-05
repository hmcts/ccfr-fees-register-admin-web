import * as express from 'express'
import * as path from 'path'
import * as IDAM from 'idam/security'

import { RouterFinder } from 'common/router/routerFinder'

export class Feature {
  enableFor (app: express.Express, security: IDAM) {
    app.use('/', security.protect('freg'),
      RouterFinder.findAll(path.join(__dirname, 'routes'))
        .concat(
          RouterFinder.findAll(path.join(__dirname, 'v2/routes'))
        )
    )
  }
}
