import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeForm } from 'fees/v2/forms/model/CreateFeeForm'
import { FormValidator } from 'app/forms/validation/formValidator'
import { FixedFeeDto, RangedFeeDto } from 'fees/v2/model/fees-register-api-contract'

class Renderer {
  static renderPage (form: Form<CreateFeeForm>, res: express.Response, isEdit?: boolean, rejectReason?: string, approvedBy?: string) {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.feeCreatePageV2.associatedView,
          {
            form: form,
            referenceData: data,
            edit: isEdit ? isEdit : false,
            reasonReject: rejectReason ? rejectReason : null,
            approvedBy: approvedBy ? approvedBy : null
          })
      }
    )
  }
}

export default express.Router()
  .get(Paths.feeCreatePageV2.uri, (req: express.Request, res: express.Response) => {
    if (req.query.action === 'edit' && req.query.feeCode) {
      FeesClient.getFee(res.locals.user, req.query.feeCode)
        .then(fee => {
          let reasonForReject = fee.fee_versions[0].reason_for_reject
          let approvedBy = fee.fee_versions[0].approvedBy

          Renderer.renderPage(new Form(CreateFeeForm.fromGivenVersion(fee, 1, true)), res, true, reasonForReject, approvedBy)
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
            FeesClient.deleteFee(res.locals.user, form.model.code).then(
              () => {
                FeesClient.createFixedFee(res.locals.user, form.model.toDto() as FixedFeeDto).then(
                  () => res.render('admin/v2/views/confirm-edit-fee', {
                    feeCode: form.model.code
                  })
                )
              }
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
            FeesClient.deleteFee(res.locals.user, form.model.code).then(
              () => {
                FeesClient.createRangedFee(res.locals.user, form.model.toDto() as RangedFeeDto).then(
                  () => res.render('admin/v2/views/confirm-edit-fee', {
                    feeCode: form.model.code
                  })
                )
              }
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
