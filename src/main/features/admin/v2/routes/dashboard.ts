import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'
import { AuthOptions } from 'app/client/request'

class Renderer {

  static render (res: express.Response) {
    let draftAuthor = null
    let pendingAuthor = null
    let approvedAuthor = null
    let draftApprovedBy = null
    let pendingApprovedBy = null
    let approvedApprovedBy = null
    let isActive = false
    let isExpired = false

    if (res.locals.user.allInfo.roles.indexOf('freg-editor') !== -1) {
      draftAuthor = res.locals.user.allInfo.id
      pendingAuthor = res.locals.user.allInfo.id
      approvedApprovedBy = res.locals.user.allInfo.id
    } else if (res.locals.user.allInfo.roles.indexOf('freg-approver') !== -1) {
      approvedApprovedBy = res.locals.user.allInfo.id
    }

    Promise.all([
      FeesClient.searchFees('draft', draftAuthor, draftApprovedBy),
      FeesClient.searchFees('pending_approval', pendingAuthor, pendingApprovedBy),
      FeesClient.searchFees('approved', approvedAuthor, approvedApprovedBy, isActive, isExpired)
    ]).then((fees: Fee2Dto[][]) => {
      res.render(Paths.dashboard.associatedView, {
        draftFees: fees[0],
        pendingApprovalFees: fees[1],
        approvedFees: fees[2]
      })
    })

  }

  static executeAction (user: AuthOptions, action: string, feeCode: string, version: number): Promise<Boolean> {
    switch (action) {
      case 'approve':
        return FeesClient.approveFee(user, feeCode, version)
      case 'delete':
        return FeesClient.deleteFeeVersion(user, feeCode, version)
      case 'reject':
        return FeesClient.rejectFee(user, feeCode, version)
      case 'submit':
        return FeesClient.submitForReview(user, feeCode, version)
    }
  }
}

export default express.Router()
  .get(Paths.dashboard.uri, (req: express.Request, res: express.Response) => {
    Renderer.render(res)
  })
  .post(Paths.dashboard.uri, (req: express.Request, res: express.Response) => {
    Renderer.executeAction(res.locals.user, req.body.action, req.body.feeCode, req.body.version)
      .then(() => Renderer.render(res))
      .catch(() => Renderer.render(res))
  })
