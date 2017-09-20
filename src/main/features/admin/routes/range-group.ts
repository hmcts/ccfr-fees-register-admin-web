import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/feesClient'

export default express.Router()
  .get(Paths.rangeGroupPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveRangeGroup(req.params.rangeGroupCode)
      .then(rangeGroup => {
        res.render(Paths.rangeGroupPage.associatedView, {
          rangeGroup: rangeGroup
        })
      })
  })
