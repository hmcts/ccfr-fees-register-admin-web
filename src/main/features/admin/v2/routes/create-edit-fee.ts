import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeForm } from 'fees/v2/forms/model/CreateFeeForm'
import { FormValidator } from 'app/forms/validation/formValidator'
import { CreateFixedFeeDto } from 'fees/v2/model/fees-register-api-contract'

class Renderer {
  static renderPage (form: Form<CreateFeeForm>, res: express.Response) {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.feeCreatePageV2.associatedView,
          {
            form: form,
            referenceData: data
          })
      }
    )
  }
}

export default express.Router()
  .get(Paths.feeCreatePageV2.uri, (req: express.Request, res: express.Response) => {
    Renderer.renderPage(new Form(new CreateFeeForm()), res)
  })
  .post(Paths.feeCreatePageV2.uri, FormValidator.requestHandler(CreateFeeForm, CreateFeeForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateFeeForm> = req.body

    if (form.hasErrors()) {
      Renderer.renderPage(form, res)
    } else {

      switch (form.model.type) {

        case 'fixed' :
          FeesClient.createFixedFee(res.locals.user, form.model.toDto() as CreateFixedFeeDto).then(
            () => res.redirect('/')
          ).catch(
            (e: Error) => {
              form.backendErrors.push(e.message)
              Renderer.renderPage(form, res)
            }
          )

          break
        case 'ranged' :
          FeesClient.createRangedFee(res.locals.user, form.model.toDto() as CreateFixedFeeDto).then(
            () => res.redirect('/')
          ).catch(
            (e: Error) => {
              form.backendErrors.push(e.message)
              Renderer.renderPage(form, res)
            }
          )

          break
        default :
          Renderer.renderPage(form, res)
      }
    }
  })
