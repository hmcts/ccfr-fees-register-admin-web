import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/feesClient'
import RangeGroup from 'fees/rangeGroup'

export default express.Router()
  .get(Paths.allFeesListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveRangeGroups()
      .then((rangeGroups: Array<RangeGroup>) => {
        res.render(Paths.allFeesListPage.associatedView, {
          rangeGroups: rangeGroups
        })
      })
  })
