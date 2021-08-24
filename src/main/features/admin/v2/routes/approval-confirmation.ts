import * as express from 'express'

import { Paths } from 'admin/paths'

export default express.Router()
  .get(Paths.approvalConfirmationPageV2.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.approvalConfirmationPageV2.associatedView, {
      feeCode: req.query.feeCode })
  })
