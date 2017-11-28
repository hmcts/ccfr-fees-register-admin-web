import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeForm } from 'fees/v2/forms/model/CreateFeeForm'

export default express.Router()
  .get(Paths.feeCreatePageV2.uri, (req: express.Request, res: express.Response) => {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.feeCreatePageV2.associatedView,
          {
            form: new Form(new CreateFeeForm()),
            referenceData: data
          })
      }
    )

  })
