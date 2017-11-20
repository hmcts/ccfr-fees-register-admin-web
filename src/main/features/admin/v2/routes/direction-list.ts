import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { DirectionTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.directionListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveDirections()
      .then((directions: Array<DirectionTypeDto>) => {
        res.render(Paths.directionListPage.associatedView, {
          directions: directions
        })
      })
  })
