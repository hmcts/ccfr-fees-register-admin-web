import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

class Renderer {

  static render ( res: express.Response ) {

    FeesClient
      .searchFees('draft')
      .then ( ( fees: Array<Fee2Dto> ) => {
        res.render ( Paths.dashboard.associatedView, {
          fees: fees
        } )
      } )

  }

}

export default express.Router ()
  .get ( Paths.dashboard.uri, ( req: express.Request, res: express.Response ) => {

    if ( req.query.approveFeeCode && req.query.approveVersion ) {
      FeesClient
        .approveFee ( res.locals.user, req.query.approveFeeCode, req.query.approveVersion )
        .then ( () => Renderer.render ( res ) )
        .catch ( () => Renderer.render ( res ) )
    } else {
      Renderer.render ( res )
    }
  } )
