import * as express from 'express'

import { Paths } from 'admin/paths'

import FeesClient from 'app/fees/feesClient'
import RangeGroup from 'fees/rangeGroup'

export default express.Router()
  .get(Paths.rangeGroupEditPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveRangeGroup(req.params.rangeGroupCode)
      .then((rangeGroup: RangeGroup) => {
        res.render(Paths.rangeGroupEditPage.associatedView, {
          rangeGroup: rangeGroup
        })
      })
  })
