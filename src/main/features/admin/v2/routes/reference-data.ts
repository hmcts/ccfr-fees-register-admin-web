import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
// import { AllReferenceDataDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
.get(Paths.referenceDataPage.uri, (req: express.Request, res: express.Response) => {

  FeesClient
      .retrieveReferenceData()
    //   .then((references: <AllReferenceDataDto>) => {

        // res.render(Paths.referenceDataPage.associatedView, {
        //   reference: references
        // })
})
    // }
