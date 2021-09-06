import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'
import { AuthOptions } from 'request'

class Renderer {

  static executeAction (user: AuthOptions, action: string, feeCode: string, version: number): Promise<Boolean> {
    switch (action) {
      case 'approve':
        return FeesClient.approveFee(user, feeCode, version)
      case 'submit':
        return FeesClient.submitForReview(user, feeCode, version)
    }
  }
}

export default express.Router()
  .get(Paths.feeDetailsViewPagev2.uri, (req: express.Request, res: express.Response) => {
    FeesClient
      .getFee(res.locals.user, req.query.feeCode)
      .then((feeDto: Fee2Dto) => {
        res.render(Paths.feeDetailsViewPagev2.associatedView, {
          draft: req.query.draft,
          pageType: req.query.pageType,
          versionNo: req.query.vno,
          feeDto: feeDto })
      })
  })
  .post(Paths.feeDetailsViewPagev2.uri, (req: express.Request, res: express.Response) => {
    Renderer.executeAction(res.locals.user, req.body.action, req.body.feeCode, req.body.version)
      .then(() => {
        if(req.body.action === 'approve') {
          res.redirect(`/admin/v2/approval-confirmation?feeCode=${req.query.feeCode}`)
        } else if(req.body.action === 'submit') {
          res.redirect(`/admin/v2/approval-request-confirmation?feeCode=${req.query.feeCode}`)
        }
      })
  })
