import * as express from 'express'

import { Paths } from 'admin/paths'

import { Form } from 'app/forms/form'

import { FeesClient } from 'app/fees/v2/feesClient'

import { FormValidator } from 'app/forms/validation/formValidator'
import { RejectFeeForm } from 'app/fees/v2/forms/model/RejectFeeForm'
import { ReasonDto } from 'app/fees/v2/model/fees-register-api-contract'

class Renderer {
  static renderPage (form: Form<RejectFeeForm>, res: express.Response) {

    res.render(Paths.feeRejectReason.associatedView,
      {
	    form: form
	  })

  }
}

export default express.Router()
	.get(Paths.feeRejectReason.uri, (req: express.Request, res: express.Response) => {
	  Renderer.renderPage(new Form(new RejectFeeForm()), res)
})

	.post(Paths.feeRejectReason.uri, FormValidator.requestHandler(RejectFeeForm, RejectFeeForm.fromObject), (req: express.Request, res: express.Response) => {
  const form: Form<RejectFeeForm> = req.body

	  if (form.hasErrors()) {
	    Renderer.renderPage(form, res)
	  } else {
		  FeesClient.reasonForRejectFee(res.locals.user, req.url.split('/')[4], Number(req.url.split('/')[5]), form.model.toDto() as ReasonDto).then(
				() =>
				  res.render('admin/v2/views/fee-rejected-confirmation', {
				  feeCode: req.url.split('/')[4]
			  })
		  ).catch(
			  (e: Error) => {
			    form.backendErrors.push(e.message)
    Renderer.renderPage(form, res)
			  }
			)
  }
})
