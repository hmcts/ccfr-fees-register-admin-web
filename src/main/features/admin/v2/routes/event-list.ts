import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { EventTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.eventListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveEvents()
      .then((events: Array<EventTypeDto>) => {
        res.render(Paths.eventListPage.associatedView, {
          events: events
        })
      })
  })
