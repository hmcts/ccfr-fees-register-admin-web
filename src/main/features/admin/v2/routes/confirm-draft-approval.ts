import * as express from 'express'

import { Paths } from 'admin/paths'
import { FeesClient } from 'app/fees/v2/feesClient'

export default express.Router()
  .get(Paths.confirmDraftApprovalV2.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.confirmDraftApprovalV2.associatedView, {
      version: req.query.version,
      feeCode: req.query.feeCode })
  })
  .post(Paths.confirmDraftApprovalV2.uri, (req: express.Request, res: express.Response) => {
    FeesClient.approveFee(res.locals.user, req.body.feeCode, req.body.version)
      .then(() => res.redirect(`/admin/v2/approval-request-confirmation?feeCode=${req.query.feeCode}`))
  })
