import * as express from 'express'

import { Paths } from 'admin/paths'

export default express.Router()
  .post(Paths.createBulkFeesPage.uri, (req: express.Request, res: express.Response) => {

    res.render(Paths.createBulkFeesPage.associatedView)
  })
