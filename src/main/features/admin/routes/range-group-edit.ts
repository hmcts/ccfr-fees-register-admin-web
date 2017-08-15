import * as express from 'express'

import { Paths } from 'admin/paths'

import FeesClient from 'app/fees/feesClient'
import RangeGroup from 'fees/rangeGroup'
import { Form } from 'app/forms/form'
import { EditRangeGroupForm, RangeForm } from 'app/forms/models/rangeGroupForms'
import { FormValidator } from 'app/forms/validation/formValidator'

export default express.Router()
  .get(Paths.rangeGroupEditPage.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .retrieveRangeGroup(req.params.rangeGroupCode)
      .then((rangeGroup: RangeGroup) => {
        res.render(Paths.rangeGroupEditPage.associatedView, {
          form: new Form(new EditRangeGroupForm(
            rangeGroup.code,
            rangeGroup.description,
            rangeGroup.ranges.map(range => new RangeForm(
              range.from >= 0 ? range.from / 100 : null,
              range.to >= 0 ? range.to / 100 : null,
              range.fee.code
            ))
          ))
        })
      })
  })
  .post(Paths.rangeGroupEditPage.uri, FormValidator.requestHandler(EditRangeGroupForm, EditRangeGroupForm.fromObject), (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const form: Form<EditRangeGroupForm> = req.body

    if (form.hasErrors()) {
      res.render(Paths.rangeGroupEditPage.associatedView, {form: form})
    } else {
      FeesClient
        .updateRangeGroup(res.locals.user, form.model.toRangeGroup())
        .then((rangeGroup: RangeGroup) => {
          console.log(rangeGroup)
          res.redirect(Paths.rangeGroupListPage.uri)
        })
    }
  })
