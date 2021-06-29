import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { ServiceTypeDto } from 'fees/v2/model/fees-register-api-contract'
// import { AllReferenceDataDto } from 'fees/v2/model/fees-register-api-contract'

// export default express.Router()
// .get(Paths.referenceDataPage.uri, (req: express.Request, res: express.Response) => {

//   FeesClient
//       .retrieveReferenceData()
//     //   .then((references: <AllReferenceDataDto>) => {

//         // res.render(Paths.referenceDataPage.associatedView, {
//         //   reference: references
//         // })
// })
//     // }

export default express.Router()
  .get(Paths.serviceListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveServices()
      .then((services: Array<ServiceTypeDto>) => {

        res.render(Paths.serviceListPage.associatedView, {
          services: services
        })
      })
  })
