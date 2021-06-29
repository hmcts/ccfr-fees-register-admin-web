import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { ApplicantTypeDto, ServiceTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
.get(Paths.referenceDataPage.uri, (req: express.Request, res: express.Response) => {

  FeesClient
    .retrieveApplicants()
    .then((applicants: Array<ApplicantTypeDto>) => {
      res.render(Paths.referenceDataPage.associatedView, {
        roles: res.locals.user.userInfo,
        applicants: applicants
      })
    }),
  FeesClient
    .retrieveServices()
    .then((services: Array<ServiceTypeDto>) => {
      res.render(Paths.referenceDataPage.associatedView, {
        roles: res.locals.user.userInfo,
        services: services
      })
    })
})
// .get(Paths.applicantListPage.uri, (req: express.Request, res: express.Response) => {

//     FeesClient
//       .retrieveApplicants()
//       .then((applicants: Array<ApplicantTypeDto>) => {
//         res.render(Paths.applicantListPage.associatedView, {
//           applicants: applicants
//         })
//       })
//   })
//   .get(Paths.serviceListPage.uri, (req: express.Request, res: express.Response) => {

//     FeesClient
//       .retrieveServices()
//       .then((services: Array<ServiceTypeDto>) => {

//         res.render(Paths.serviceListPage.associatedView, {
//           services: services
//         })
//       })
//   })
