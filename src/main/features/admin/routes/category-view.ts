import * as express from 'express'

import {Paths} from 'admin/paths'

import FeesClient from 'app/fees/feesClient'
import FeeCategory from 'app/fees/category'

export default express.Router()
  .get(Paths.categoryViewPage.uri, (req: express.Request, res: express.Response) => {
    const { categoryId } = req.params

    FeesClient
      .retrieveCategory(categoryId)
      .then((category: FeeCategory) => {
        res.render(Paths.categoryViewPage.associatedView, {
          category: category
        })
      })
  })
