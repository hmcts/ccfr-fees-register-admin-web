import * as express from 'express'
import * as helmet from 'helmet'

import { ContentSecurityPolicy } from './modules/contentSecurityPolicy'
import { ReferrerPolicy } from './modules/referredPolicy'

export interface Config {
  referrerPolicy: string
}

/**
 * Module that enables helmet for Express.js applications
 */
export class Helmet {

  constructor (public config: Config, public developmentMode: boolean) {
  }

  enableFor (app: express.Express) {
    app.use(helmet())

    new ContentSecurityPolicy(this.developmentMode).enableFor(app)

    if (this.config.referrerPolicy) {
      new ReferrerPolicy(this.config.referrerPolicy).enableFor(app)
    }
  }
}
