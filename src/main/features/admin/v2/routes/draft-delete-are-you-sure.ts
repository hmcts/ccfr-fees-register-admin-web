import * as express from 'express'

import { Paths } from 'admin/paths'
import { FeesClient } from 'app/fees/v2/feesClient'

export default express.Router()
  .get(Paths.draftDeleteAreYouSureV2.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.draftDeleteAreYouSureV2.associatedView, {
      version: req.query.version,
      feeCode: req.query.feeCode })
  })
  .post(Paths.draftDeleteAreYouSureV2.uri, (req: express.Request, res: express.Response) => {
    FeesClient.deleteFeeVersion(res.locals.user, req.body.feeCode, req.body.version)
      .then(() =>res.redirect(`/admin/v2/draft-deleted-confirmation?feeCode=${req.query.feeCode}`))
  })