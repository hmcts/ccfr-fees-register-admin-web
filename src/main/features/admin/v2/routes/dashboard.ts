import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'
import { AuthOptions } from 'request'

class Renderer {

  static render ( res: express.Response ) {
    Promise.all ( [
      FeesClient.searchFees('draft', null, null, null),
      FeesClient.searchFees('pending_approval', null, null, null),
      res.locals.user.allInfo.roles.indexOf('freg-approver') !== -1 ?
        FeesClient.searchFeesApprovedBy('approved', res.locals.user.allInfo.id, false, false) :
        FeesClient.searchFees('approved', res.locals.user.allInfo.id, false, false)
    ] ).then ( ( fees: Fee2Dto[][] ) => {
      res.render ( Paths.dashboard.associatedView, {
        draftFees: fees[ 0 ],
        pendingApprovalFees: fees[ 1 ],
        approvedFees: fees[2]
      } )
    } )

  }

  static executeAction ( user: AuthOptions, action: string, feeCode: string, version: number ): Promise<Boolean> {
    switch ( action ) {
      case 'approve':
        return FeesClient.approveFee ( user, feeCode, version)
      case 'delete':
        return FeesClient.deleteFeeVersion ( user, feeCode, version )
      case 'reject':
        return FeesClient.rejectFee ( user, feeCode, version)
      case 'submit':
        return FeesClient.submitForReview ( user, feeCode, version)
    }
  }
}

export default express.Router ()
  .get ( Paths.dashboard.uri, ( req: express.Request, res: express.Response ) => {

    if ( req.query.action ) {
      Renderer.executeAction ( res.locals.user, req.query.action, req.query.feeCode, req.query.version )
        .then ( () => Renderer.render ( res ) )
        .catch ( () => Renderer.render ( res ) )
    } else {
      Renderer.render ( res )
    }
  } )
