import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'
import { ApplicantTypeDto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
  .get(Paths.applicantListPage.uri, (req: express.Request, res: express.Response) => {

    FeesClient
      .retrieveApplicants()
      .then((applicants: Array<ApplicantTypeDto>) => {
        res.render(Paths.applicantListPage.associatedView, {
          applicants: applicants
        })
      })
  })
