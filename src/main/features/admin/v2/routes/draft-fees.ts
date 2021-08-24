import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'app/fees/v2/model/fees-register-api-contract'
let draftAuthor = null

export default express.Router()
  .get(Paths.myDraftFeesPageV2.uri, (req: express.Request, res: express.Response) => {
    if (res.locals.user.allInfo.roles.indexOf('freg-editor') !== -1) {
      draftAuthor = res.locals.user.allInfo.id
    }
    FeesClient
      .searchFees('draft', draftAuthor, null)
      .then((fees: Array<Fee2Dto>) => {
        fees.sort((a: Fee2Dto, b: Fee2Dto): number => -a.code.localeCompare(b.code))
        res.render(Paths.myDraftFeesPageV2.associatedView, {
          fees: fees
        })
      })
  })
