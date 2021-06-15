import * as express from 'express'

import { Paths } from 'admin/paths'

import { Form } from 'app/forms/form'


import { FormValidator } from 'app/forms/validation/formValidator'
import { RejectFeeForm } from 'app/fees/v2/forms/model/RejectFeeform'


class Renderer {
    static renderPage(form: Form<RejectFeeForm>, res: express.Response) {

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
        }
    })