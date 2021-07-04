import * as express from 'express'

import { Paths } from 'admin/paths'

export default express.Router()
  .get(Paths.draftDeletedConfirmationV2.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.draftDeletedConfirmationV2.associatedView, {
      feeCode: req.query.feeCode })
  })
