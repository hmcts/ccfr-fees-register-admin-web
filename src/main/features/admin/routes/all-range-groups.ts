import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/feesClient'
import Category from 'fees/category'

export default express.Router()
  .get(Paths.allFeesListPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveCategories()
      .then((categories: Array<Category>) => {
        res.render(Paths.allFeesListPage.associatedView, {
          categories: categories
        })
      })
  })
