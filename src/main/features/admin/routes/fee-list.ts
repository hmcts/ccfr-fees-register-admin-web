import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/feesClient'
import Fee from 'app/fees/fee'

export default express.Router()
  .get(Paths.feeListPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveFees()
      .then((fees: Array<Fee>) => {
        res.render(Paths.feeListPage.associatedView, {
          fees: fees
        })
      })
  })
