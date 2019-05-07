import { TranslationOptions } from 'i18next'
import * as path from 'path'
import * as express from 'express'
import * as nunjucks from 'nunjucks'
import * as dateFilter from 'nunjucks-date-filter'
import * as numeralFilter from 'nunjucks-numeral-filter'
import * as numeral from 'numeral'
import { Fee2Dto, FeeVersionDto } from 'fees/v2/model/fees-register-api-contract'

const packageDotJson = require('../../../../package.json')

const appAssetPaths = {
  js: '/js',
  js_vendor: '/js/lib',
  style: '/stylesheets',
  style_vendor: '/stylesheets/lib',
  images_vendor: '/img/lib'
}

export default class Nunjucks {

  constructor (public developmentMode: boolean, public i18next) {
    this.developmentMode = developmentMode
    this.i18next = i18next
  }

  enableFor (app: express.Express) {
    app.set('view engine', 'njk')
    const nunjucksEnv = nunjucks.configure([
      path.join(__dirname, '..', '..', 'views'),
      path.join(__dirname, '..', '..', 'features')
    ], {
      autoescape: true,
      express: app
    })

    require('numeral/locales/en-gb')
    numeral.locale('en-gb')

    nunjucksEnv.addGlobal('asset_paths', appAssetPaths)
    nunjucksEnv.addGlobal('serviceName', 'Fees Register Admin console')
    nunjucksEnv.addGlobal('development', this.developmentMode)
    nunjucksEnv.addGlobal('govuk_template_version', packageDotJson.dependencies.govuk_template_jinja)
    nunjucksEnv.addGlobal('t', (key: string, options?: TranslationOptions): string => this.i18next.t(key, options))
    nunjucksEnv.addFilter('date', dateFilter)
    nunjucksEnv.addFilter('numeral', numeralFilter)
    nunjucksEnv.addGlobal('hasApprovedVersion', (ar: Array<FeeVersionDto>): boolean => {
      if (ar != null) {
        return ar.findIndex((el) => el.status === 'approved') !== -1
      } else {
        return false
      }
    })
    nunjucksEnv.addGlobal('isEditor', (roles: Array<any>): boolean => {
      return roles.indexOf('freg-editor') !== -1
    })
    nunjucksEnv.addGlobal('isAdmin', (roles: Array<any>): boolean => {
      return roles.indexOf('freg-admin') !== -1
    })
    nunjucksEnv.addGlobal('isApprover', (roles: Array<any>): boolean => {
      return roles.indexOf('freg-approver') !== -1
    })
    nunjucksEnv.addGlobal('isDraftFeeSubmittable', (fee: Fee2Dto): boolean => {
      if (fee != null && (fee.current_version || fee.fee_versions)) {
        let testVersion: FeeVersionDto = fee.current_version ? fee.current_version : fee.fee_versions[0]
        if (testVersion.natural_account_code.length === 0 ||
          testVersion.memo_line.length === 0 ||
          testVersion.si_ref_id.length === 0 ||
          testVersion.statutory_instrument.length === 0 ||
          testVersion.fee_order_name.length === 0) {
          return false
        }
        return true
      }
      return false
    })
    nunjucksEnv.addGlobal('getLastFeeVersion', (fee: Fee2Dto): FeeVersionDto => {
      let currentVersionNumber: number = -1
      let result: FeeVersionDto = fee.current_version
      if (fee.fee_versions != null) {
        fee.fee_versions.forEach((fv) => {
          if (fv.version > currentVersionNumber && fv.status === 'approved') {
            currentVersionNumber = fv.version
            result = fv
          }
        })
      }
      return result
    })
    nunjucksEnv.addGlobal('isDraftVersionExists', (fee: Fee2Dto): boolean => {
      let isExists = false
      fee.fee_versions.filter((v) => {
        if (v.status === 'draft') {
          isExists = true
          return
        }
      })
      return isExists
    })

    return nunjucksEnv
  }
}
