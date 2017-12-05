import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.dashboard.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .fetchFeesPendingApproval()
      .then((fees: Array<Fee2Dto>) => {
        res.render(Paths.dashboard.associatedView, {
          fees: fees
        })
      })
  })
