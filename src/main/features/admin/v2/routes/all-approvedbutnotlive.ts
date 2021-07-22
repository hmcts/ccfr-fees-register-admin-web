import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

import * as config from 'config'
const feesUrl = config.get('fees.url')

export default express.Router()
  .get(Paths.allApprovedbutnotlivePageV2.uri, (req: express.Request, res: express.Response) => {
    var  baseurl = feesUrl
    var authtoken =  res.locals.user.bearerToken
    FeesClient
      .searchFees(null, null, null, null, null, false)
      .then((fees: Array<Fee2Dto>) => {
        fees.sort((a: Fee2Dto, b: Fee2Dto): number => -a.code.localeCompare(b.code))
        res.render(Paths.allApprovedbutnotlivePageV2.associatedView, {
          fees: fees , baseurl : baseurl  , authtoken: authtoken
        })
      })
  })
