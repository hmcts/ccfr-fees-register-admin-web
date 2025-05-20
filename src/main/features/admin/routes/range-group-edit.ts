import * as express from 'express'
import * as featureToggles from 'feature-toggles'

import { Paths } from 'admin/paths'

import { FeesClientError } from 'app/client/request'
import { FeesClient } from 'app/fees/feesClient'
import RangeGroup from 'fees/rangeGroup'
import { Form } from 'app/forms/form'
import { CreateRangeGroupForm, EditRangeGroupForm, RangeForm } from 'app/forms/models/rangeGroupForms'
import { FormValidator } from 'app/forms/validation/formValidator'

function renderEditPage (form: Form<EditRangeGroupForm>, res: express.Response) {
  FeesClient
    .retrieveFees()
    .then(fees => {
      res.render(Paths.rangeGroupEditPage.associatedView, {
        form: form,
        feeOptions: fees.map(fee => ({ value: fee.code, label: fee.code + ': ' + fee.description }))
      })
    })
}

function actionHandler (req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (req.body.action) {
    const form: Form<EditRangeGroupForm> = req.body
    if (req.body.action.addRow) {
      form.model.addRange()
    } else if (req.body.action.deleteRow) {
      form.model.deleteLastRange()
    }
    return renderEditPage(form, res)
  }
  next()
}

export default express.Router()
  .get(Paths.rangeGroupCreatePage.uri, (req: express.Request, res: express.Response) => {
    if (featureToggles.isFeatureEnabled('edit')) {
      res.render(Paths.rangeGroupCreatePage.associatedView, { form: new Form(new CreateRangeGroupForm()) })
    } else {
      res.render(Paths.notFoundPage.associatedView)
    }
  })
  .post(Paths.rangeGroupCreatePage.uri, FormValidator.requestHandler(CreateRangeGroupForm, CreateRangeGroupForm.fromObject), (req: express.Request, res: express.Response) => {
    if (featureToggles.isFeatureEnabled('edit')) {
      const form: Form<CreateRangeGroupForm> = req.body

      if (form.hasErrors()) {
        res.render(Paths.rangeGroupCreatePage.associatedView, { form: form })
      } else {
        let editFeeForm = new EditRangeGroupForm(form.model.code, '', [])
        renderEditPage(new Form(editFeeForm), res)
      }
    } else {
      res.render(Paths.notFoundPage.associatedView)
    }

  })
  .get(Paths.rangeGroupEditPage.uri, (req: express.Request, res: express.Response) => {
    if (featureToggles.isFeatureEnabled('edit')) {
      FeesClient
        .retrieveRangeGroup(req.params.rangeGroupCode)
        .then(rangeGroup =>
          renderEditPage(
            new Form(new EditRangeGroupForm(
              rangeGroup.code,
              rangeGroup.description,
              rangeGroup.ranges.map(range => new RangeForm(
                range.from >= 0 ? range.from / 100 : null,
                range.to >= 0 ? range.to / 100 : null,
                range.fee.code
              ))
            )),
            res
          ))
    } else {
      res.render(Paths.notFoundPage.associatedView)
    }
  })
  .post(Paths.rangeGroupEditPage.uri, FormValidator.requestHandler(EditRangeGroupForm, EditRangeGroupForm.fromObject, ['addRow', 'deleteRow']), actionHandler,
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

      if (featureToggles.isFeatureEnabled('edit')) {
        const form: Form<EditRangeGroupForm> = req.body

        if (form.hasErrors()) {
          renderEditPage(form, res)
        } else {
          FeesClient
            .updateRangeGroup(res.locals.user, form.model.toRangeGroup())
            .then((rangeGroup: RangeGroup) => {
              res.redirect(Paths.rangeGroupListPage.uri)
            })
            .catch((err: Error) => {
              if (err instanceof FeesClientError) {
                form.backendErrors.push(err.message)
                renderEditPage(form, res)
              } else {
                throw err
              }
            })
        }
      } else {
        res.render(Paths.notFoundPage.associatedView)
      }
    })
