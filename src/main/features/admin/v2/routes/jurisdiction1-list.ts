import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { Jurisdiction1Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.jurisdiction1ListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveJurisdiction1()
      .then((jurisdictions: Array<Jurisdiction1Dto>) => {

        res.render(Paths.jurisdiction1ListPage.associatedView, {
          jurisdictions: jurisdictions
        })
      })
  })
