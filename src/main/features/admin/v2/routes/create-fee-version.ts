import * as express from 'express'
import { Paths } from 'admin/paths'
import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { CreateFeeVersionForm } from 'fees/v2/forms/model/CreateFeeVersionForm'
import { FormValidator } from 'app/forms/validation/formValidator'
import { Fee2Dto, FeeVersionDto } from 'fees/v2/model/fees-register-api-contract'

class Renderer {
  static renderPage (form: Form<CreateFeeVersionForm>, res: express.Response, feeVersionDto: FeeVersionDto) {
    FeesClient.retrieveReferenceData().then(
      data => {
        res.render(Paths.createFeeVersionPageV2.associatedView,
          {
            form: form,
            referenceData: data,
            feeVersionDto: feeVersionDto
          })
      }
    )
  }
}

export default express.Router()
  .get(Paths.createFeeVersionPageV2.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .getFee(req.params.feeCode)
      .then((feeDto: Fee2Dto) => {
        if (req.query.action === 'edit') {
          const v = feeDto.fee_versions.find((v: FeeVersionDto) => v.status === 'draft' && req.query.version === v.version.toString())
          if (v) {
            return Renderer.renderPage(new Form(CreateFeeVersionForm.fromObject(v)), res, v)
          }
        } else {
          Renderer.renderPage(new Form(CreateFeeVersionForm.fromObject(feeDto.current_version)), res, feeDto.current_version)
        }
      })
  })
  .post(Paths.createFeeVersionPageV2.uri, FormValidator.requestHandler(CreateFeeVersionForm, CreateFeeVersionForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateFeeVersionForm> = req.body

    if (req.query.action === 'edit') {
      FeesClient
        .updateFeeVersion(res.locals.user, req.params.feeCode, req.query.version, form.model.toDto())
        .then(() => res.render('admin/v2/views/confirm-edit-fee-version'))
        .catch(
          (e: Error) => {
            form.backendErrors.push(e.message)
            Renderer.renderPage(form, res, req.query.type)
          })
    } else {
      FeesClient
        .createFeeVersion(res.locals.user, req.params.feeCode, form.model.toDto())
        .then(() => res.render('admin/v2/views/confirm-create-fee-version'))
        .catch(
          (e: Error) => {
            form.backendErrors.push(e.message)
            Renderer.renderPage(form, res, req.query.type)
          })
    }
  })
