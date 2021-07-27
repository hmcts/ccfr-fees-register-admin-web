import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeForm } from 'fees/v2/forms/model/CreateFeeForm'
import { FormValidator } from 'app/forms/validation/formValidator'
import { FixedFeeDto, RangedFeeDto } from 'fees/v2/model/fees-register-api-contract'

class Renderer {
  static renderPage (form: Form<CreateFeeForm>, res: express.Response, isEdit?: boolean) {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.feeCreatePageV2.associatedView,
          {
            form: form,
            referenceData: data,
            edit: isEdit ? isEdit : false
          })
      }
    )
  }
}

export default express.Router()
  .get(Paths.feeCreatePageV2.uri, (req: express.Request, res: express.Response) => {
    if (req.query.action === 'edit' && req.query.feeCode) {
      FeesClient.getFee(req.query.feeCode)
        .then(fee => {
          Renderer.renderPage(new Form(CreateFeeForm.fromGivenVersion(fee, 1, true)), res, true)
        })
    } else {
      Renderer.renderPage(new Form(new CreateFeeForm()), res)
    }
  })
  .post(Paths.feeCreatePageV2.uri, FormValidator.requestHandler(CreateFeeForm, CreateFeeForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateFeeForm> = req.body

    if (form.hasErrors()) {
      Renderer.renderPage(form, res, form.model.edit)
    } else {
      switch (form.model.type) {
        case 'fixed' :
          if (form.model.edit) {
            FeesClient.updateFixedFee(res.locals.user, form.model.toDto() as FixedFeeDto).then(
              () => res.render('admin/v2/views/confirm-edit-fee', {
                feeCode: form.model.code
              })
            ).catch(
              (e: Error) => {
                form.backendErrors.push(e.message)
                Renderer.renderPage(form, res, form.model.edit)
              }
            )
          } else {
            FeesClient.createFixedFee(res.locals.user, form.model.toDto() as FixedFeeDto).then(
              () => res.render('admin/v2/views/confirm-create-fee')
            ).catch(
              (e: Error) => {
                form.backendErrors.push(e.message)
                Renderer.renderPage(form, res, form.model.edit)
              }
            )
          }
          break
        case 'ranged' :
          if (form.model.edit) {
            FeesClient.updateRangedFee(res.locals.user, form.model.toDto() as RangedFeeDto).then(
              () => res.render('admin/v2/views/confirm-edit-fee', {
                feeCode: form.model.code
              })
            ).catch(
                (e: Error) => {
                  form.backendErrors.push(e.message)
                  Renderer.renderPage(form, res, form.model.edit)
                }
            )
          } else {
            FeesClient.createRangedFee(res.locals.user, form.model.toDto() as RangedFeeDto).then(
              () => res.render('admin/v2/views/confirm-create-fee')
            ).catch(
              (e: Error) => {
                form.backendErrors.push(e.message)
                Renderer.renderPage(form, res, form.model.edit)
              }
            )
          }
          break
        default :
          Renderer.renderPage(form, res, form.model.edit)
      }
    }
  })
