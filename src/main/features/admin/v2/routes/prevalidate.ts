import * as express from 'express'
import { FeesClient } from 'app/fees/v2/feesClient'

export default express.Router()
  .get('/admin/v2/prevalidate', (req: express.Request, res: express.Response) => {

    FeesClient
      .prevalidate(
        res.locals.user,
        req.query.event,
        req.query.service,
        req.query.channel,
        req.query.jurisdiction1,
        req.query.jurisdiction2,
        req.query.keyword,
        req.query.rangeFrom,
        req.query.rangeTo
      )
      .then((valid: boolean) => {

        if (valid) {
          return res.sendStatus(200)
        } else {
          return res.sendStatus(409)
        }
      })
  })
