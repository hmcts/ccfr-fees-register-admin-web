import * as express from 'express'

import { Paths } from 'admin/paths'
import { FeesClient } from 'app/fees/v2/feesClient'

import { AuthOptions } from 'app/client/request'
import { validateFeeParams } from 'app/utils/feeRequestValidation'

class Renderer {
  static executeAction (user: AuthOptions, feeCode: string, version: number): Promise<Boolean> {
    return FeesClient.deleteFeeVersion(user, feeCode, version)
  }
}

export default express.Router()
  .get(Paths.draftDeleteAreYouSureV2.uri,
    validateFeeParams([{ source: 'query', name: 'feeCode' }, { source: 'query', name: 'version' }]),
    (req: express.Request, res: express.Response) => {
      res.render(Paths.draftDeleteAreYouSureV2.associatedView, {
        version: req.query.version,
        pageType: req.query.pageType,
        feeCode: req.query.feeCode })
    })
  .post(Paths.draftDeleteAreYouSureV2.uri,
    validateFeeParams([{ source: 'body', name: 'feeCode', required: true }, { source: 'body', name: 'version', required: true }]),
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
      Renderer.executeAction(res.locals.user, req.body.feeCode, req.body.version)
        .then(() => res.redirect(`/admin/v2/draft-deleted-confirmation?feeCode=${req.query.feeCode}`))
        .catch(next)
    })
