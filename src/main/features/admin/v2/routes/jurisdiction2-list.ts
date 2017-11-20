import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { Jurisdiction2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.jurisdiction2ListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveJurisdiction2()
      .then((jurisdictions: Array<Jurisdiction2Dto>) => {

        res.render(Paths.jurisdiction2ListPage.associatedView, {
          jurisdictions: jurisdictions
        })
      })
  })
