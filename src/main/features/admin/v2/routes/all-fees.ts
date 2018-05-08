import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.allFeesPageV2.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .searchFees('approved', null, null, null)
      .then((fees: Array<Fee2Dto>) => {
        res.render(Paths.allFeesPageV2.associatedView, {
          fees: fees
        })
      })
  })
