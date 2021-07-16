import * as express from 'express'

import { Paths } from 'admin/paths'

import { FeesClient } from 'app/fees/v2/feesClient'

import { Fee2Dto } from 'fees/v2/model/fees-register-api-contract'

export default express.Router()
    .get(Paths.feeVersions.uri, (req: express.Request, res: express.Response) => {
      FeesClient
          .getFee(req.params.feeCode)
            .then((feeDto: Fee2Dto) => {

              res.render(Paths.feeVersions.associatedView, { 
                draft: req.query.draft,
                pageType: req.query.pageType,
                versionNo: req.query.vno,
                feeDto: feeDto
              })
            })

    })
