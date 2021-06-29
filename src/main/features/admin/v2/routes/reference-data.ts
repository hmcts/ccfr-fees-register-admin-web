import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { ApplicantTypeDto } from 'app/fees/v2/model/fees-register-api-contract'
// import { ServiceTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
.get(Paths.referenceDataPage.uri, (req: express.Request, res: express.Response) => {
  FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.referenceDataPage.associatedView,
            {
              referenceData: data,
              applicants: ApplicantTypeDto,
    
            })
          })
})
