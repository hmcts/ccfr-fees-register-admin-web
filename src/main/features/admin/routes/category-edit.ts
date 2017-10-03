import * as express from 'express'
import * as featureToggles from 'feature-toggles'

import { Paths } from 'admin/paths'

import { Form } from 'app/forms/form'
import { FormValidator } from 'app/forms/validation/formValidator'
import { CreateCategoryForm, EditCategoryForm } from 'app/forms/models/categoryForms'
import { FeesClient } from 'app/fees/feesClient'
import Category from 'app/fees/category'
import RangeGroup from 'app/fees/rangeGroup'
import * as _ from 'lodash'

function renderEditPage (form: Form<EditCategoryForm>, res: express.Response) {

  Promise
    .all([FeesClient.retrieveFees(), FeesClient.retrieveRangeGroups()])
    .then(([fees, rangeGroups]) => {
      rangeGroups.unshift(new RangeGroup('', '       ', null))
      res.render(Paths.categoryEditPage.associatedView, {
        form: form,
        feeOptions: fees.map(fee => ({value: fee.code, label: fee.code + ': ' + fee.description})),
        rangeOptions: rangeGroups.map(rangeGroup => ({
          value: rangeGroup.code,
          label: rangeGroup.code + '' + rangeGroup.description
        }))
      })
    })
}

function actionHandler (req: express.Request, res: express.Response, next: express.NextFunction): void {
  if (req.body.action) {
    const form: Form<EditCategoryForm> = req.body
    if (req.body.action.addRow) {
      form.model.addFee()
    } else if (req.body.action.deleteRow) {
      form.model.deleteLastFee()
    }

    return renderEditPage(form, res)
  }
  next()
}

export default express.Router()
  .get(Paths.categoryCreatePage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.categoryCreatePage.associatedView, {form: new Form(new CreateCategoryForm())})
  })
  .post(Paths.categoryCreatePage.uri, FormValidator.requestHandler(CreateCategoryForm, CreateCategoryForm.fromObject), (req: express.Request, res: express.Response) => {
    const form: Form<CreateCategoryForm> = req.body

    if (form.hasErrors()) {
      res.render(Paths.categoryCreatePage.associatedView, {form: form})
    } else {
      let editCategoryForm = new EditCategoryForm(form.model.code, '', undefined, [])
      renderEditPage(new Form(editCategoryForm), res)
    }
  })

  .get(Paths.categoryEditPage.uri, (req: express.Request, res: express.Response) => {

    if (featureToggles.isFeatureEnabled('edit')) {
      FeesClient
        .retrieveCategory(req.params.categoryCode)
        .then(category =>
          renderEditPage(
            new Form(new EditCategoryForm(category.code,
              category.description,
              _.isNull(category.rangeGroup) ? '' : category.rangeGroup.code,
              category.fees.map(fee =>
                fee.code
              )
            )),
            res
          ))
    } else {
      res.render(Paths.notFoundPage.associatedView)
    }

  })
  .post(Paths.categoryEditPage.uri, FormValidator.requestHandler(EditCategoryForm, EditCategoryForm.fromObject, ['addRow', 'deleteRow', 'assignRangeGroup', 'unAssignRangeGroup']), actionHandler,
    (req: express.Request, res: express.Response, next: express.NextFunction) => {

      if (featureToggles.isFeatureEnabled('edit')) {
        const form: Form<EditCategoryForm> = req.body
        if (form.hasErrors()) {
          renderEditPage(form, res)
        } else {
          FeesClient
            .updateCategory(res.locals.user, form.model.toCategory())
            .then((category: Category) => {
              res.redirect(Paths.categoryListPage.uri)
            })
        }
      } else {
        res.render(Paths.notFoundPage.associatedView)
      }
    })
