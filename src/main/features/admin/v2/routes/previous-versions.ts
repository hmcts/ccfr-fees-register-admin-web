import * as express from 'express'
import { Paths } from 'admin/paths'
import { FeesClient } from 'fees/v2/feesClient'
import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()

  .get(Paths.previousVersionsViewPagev2.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .getFee(req.params.feeCode)
      .then((feeDto: Fee2Dto) => {
        res.locals.user = {
          allInfo: { roles: [] }
        }
        res.render(Paths.previousVersionsViewPagev2.associatedView, { feeDto: feeDto })
      })
  })
