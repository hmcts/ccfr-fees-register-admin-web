import * as express from 'express'

import { Paths } from 'admin/paths'

// import { FeesClient } from '../../../../app/fees/v2/feesClient'

// import { AuthOptions } from 'request'

// class Renderer {
//     static render(res: express.Response): any {
//         throw new Error("Method not implemented.");
//     }
// static executeAction(user: AuthOptions, action: string, feeCode: string, version: number) {
//      return FeesClient.approveFee(user, feeCode, version)
// }
// }

export default express.Router()
.get(Paths.confirmDraftApprovalV2.uri, (req: express.Request, res: express.Response) => {
  console.log('one')
  res.render(Paths.confirmDraftApprovalV2.associatedView)
})

  // .post(Paths.dashboard.uri, (req: express.Request, res: express.Response) => {
  //   Renderer.executeAction(res.locals.user, req.body.action, req.body.feeCode, req.body.version)
  //     .then(() => Renderer.render(res))
  //     .catch(() => Renderer.render(res))
  // })
