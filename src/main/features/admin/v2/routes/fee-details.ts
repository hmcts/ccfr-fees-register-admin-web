import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.feeDetailsViewPagev2.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .getFee(req.query.feeCode)
      .then((feeDto: Fee2Dto) => {
        res.render(Paths.feeDetailsViewPagev2.associatedView, {
          pageType: req.query.pageType,
          versionNo: req.query.vno,
          feeDto: feeDto })
      })
  })

