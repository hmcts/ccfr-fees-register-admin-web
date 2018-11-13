import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeVersionForm } from 'fees/v2/forms/model/CreateFeeVersionForm'
import { FormValidator } from 'app/forms/validation/formValidator'

class Renderer {
  static renderPage (form: Form<CreateFeeVersionForm>, res: express.Response, type: string) {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.createFeeVersionPageV2.associatedView,
          {
            form: form,
            referenceData: data,
            type: type
          })
      }
    )
  }
}

export default express.Router()
  .get(Paths.createFeeVersionPageV2.uri, (req: express.Request, res: express.Response) => {
    Renderer.renderPage(new Form(new CreateFeeVersionForm()), res, req.query.type)
  })
  .post(Paths.createFeeVersionPageV2.uri, FormValidator.requestHandler(CreateFeeVersionForm, CreateFeeVersionForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateFeeVersionForm> = req.body

    FeesClient
      .createFeeVersion(res.locals.user, req.params.feeCode, form.model.toDto())
      .then(() => res.render('admin/v2/views/confirm-create-fee-version'))
      .catch(
        (e: Error) => {
          form.backendErrors.push(e.message)
          Renderer.renderPage(form, res, req.query.type)
        })
  })
