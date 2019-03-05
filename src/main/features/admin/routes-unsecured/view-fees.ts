import * as express from 'express'
import { Paths } from 'admin/paths'
import { FeesClient } from 'fees/v2/feesClient'
import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.unsecuredViewFees.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .searchFees(null, null, null, null, null, false)
      .then((fees: Array<Fee2Dto>) => {
        fees.sort((a: Fee2Dto, b: Fee2Dto): number => -a.code.localeCompare(b.code))
        res.render(Paths.unsecuredViewFees.associatedView, {
          fees: fees
        })
      })
  })
