import * as express from 'express'

import { Paths } from 'admin/paths'

import FeesClient from 'app/fees/feesClient'
import Fee from 'app/fees/fee'
import { Form } from 'app/forms/form'
import { FormValidator } from 'app/forms/validation/formValidator'
import { CreateFeeForm, EditFeeForm } from 'app/forms/models/feeForms'
import { ensureUriSafeOrFallback } from 'utils/ReturnUriValidator'

function ensureSafeReturnUri (returnUri: string) {
  return ensureUriSafeOrFallback(returnUri, Paths.feeListPage.uri)
}

export default express.Router()
  .get(Paths.feeCreatePage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.feeCreatePage.associatedView, {form: new Form(new CreateFeeForm())})
  })
  .post(Paths.feeCreatePage.uri, FormValidator.requestHandler(CreateFeeForm, CreateFeeForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateFeeForm> = req.body

    if (form.hasErrors()) {
      res.render(Paths.feeCreatePage.associatedView, {form: form})
    } else {
      let editFeeForm = new EditFeeForm(form.model.code, form.model.type)
      res.render(Paths.feeEditPage.associatedView, {form: new Form(editFeeForm), returnUri: Paths.feeListPage.uri})
    }
  })
  .get(Paths.feeEditPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveFee(req.params.feeCode)
      .then((fee: Fee) => {
        res.render(Paths.feeEditPage.associatedView, {
          form: new Form(new EditFeeForm(fee.code, fee.type, fee.description, fee.amount / 100, fee.percentage)),
          returnUri: ensureSafeReturnUri(req.query.returnUri)
        })
      })
  })
  .post(Paths.feeEditPage.uri, FormValidator.requestHandler(EditFeeForm, EditFeeForm.fromObject), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const form: Form<EditFeeForm> = req.body
    const returnUri = ensureSafeReturnUri(req.query.returnUri)

    if (form.hasErrors()) {
      res.render(Paths.feeEditPage.associatedView, {form: form, returnUri: returnUri})
    } else {
      FeesClient
        .updateFee(res.locals.user, form.model.toFee())
        .then((fee: Fee) => res.redirect(returnUri))
    }
  })
