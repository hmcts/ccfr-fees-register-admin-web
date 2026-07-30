import * as express from 'express'
import { referrerPolicy } from 'helmet'

export class ReferrerPolicy {

  constructor (public policy: string) {
    if (!policy) {
      throw new Error('Referrer policy configuration is required')
    }
  }

  enableFor (app: express.Express) {
    app.use(referrerPolicy({
      policy: this.policy as any
    }) as express.RequestHandler)
  }
}
