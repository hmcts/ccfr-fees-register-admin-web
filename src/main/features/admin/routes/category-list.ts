import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/feesClient'
import FeeCategory from 'app/fees/category'

export default express.Router()
  .get(Paths.categoryListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveCategories()
      .then((categories: Array<FeeCategory>) => {
        res.render(Paths.categoryListPage.associatedView, {
          categories: categories
        })
      })
  })
