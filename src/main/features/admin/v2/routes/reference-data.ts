import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

export default express.Router()
.get(Paths.referenceDataPage.uri, (req: express.Request, res: express.Response) => {
  FeesClient.retrieveReferenceData()
  .then(data => {
    res.render(Paths.referenceDataPage.associatedView, {
      referenceData: data,
      applicants: data.applicantTypes,
      jurisdictions: data.jurisdictions1,
      jurisdictions2: data.jurisdictions2,
      services: data.serviceTypes,
      channels: data.channelTypes,
      events: data.eventTypes,
      directions: data.directionTypes
    })
  })
})
