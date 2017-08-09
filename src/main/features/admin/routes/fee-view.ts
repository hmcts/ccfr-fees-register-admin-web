import * as express from 'express'

import { Paths } from 'admin/paths'

import FeesClient from 'app/fees/feesClient'
import Fee from 'app/fees/fee'
import { Form } from 'app/forms/form'
import { FormValidator } from 'app/forms/validation/formValidator'
import { FeeForm } from 'app/forms/models/feeForm'
import { ensureUriSafeOrFallback } from 'utils/ReturnUriValidator'

function renderView (returnUri: string, form: Form<FeeForm>, res: express.Response): void {
  res.render(Paths.feeViewPage.associatedView, {
    form: form,
    returnUri: ensureUriSafeOrFallback(returnUri, Paths.feeListPage.uri)
  })
}

export default express.Router()
  .get(Paths.feeListPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveFees()
      .then((fees: Array<Fee>) => {
        res.render(Paths.feeListPage.associatedView, {
          fees: fees
        })
      })
  })
  .get(Paths.feeViewPage.uri, (req: express.Request, res: express.Response) => {
    const {feeCode} = req.params

    FeesClient
      .retrieveFee(feeCode)
      .then((fee: Fee) => {
        renderView(req.query.returnUri, new Form(new FeeForm(fee.code, fee.type, fee.description, fee.amount / 100, fee.percentage)), res)
      })
  })
  .post(Paths.feeViewPage.uri, FormValidator.requestHandler(FeeForm, FeeForm.fromObject), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {feeCode} = req.params
    const form: Form<FeeForm> = req.body
    const model = form.model
    model.code = feeCode

    if (form.hasErrors()) {
      renderView(req.query.returnUri, form, res)
    } else {
      FeesClient
        .updateFee(res.locals.user, model.toFee())
        .then((fee: Fee) => {
          res.redirect(ensureUriSafeOrFallback(req.query.returnUri, Paths.feeListPage.uri))
        })
    }
  })
