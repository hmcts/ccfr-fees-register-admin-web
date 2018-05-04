import * as express from 'express'

import { Paths } from 'admin/paths'

export default express.Router()
  .get(Paths.welcomePage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.welcomePage.associatedView, {roles: res.locals.user.userInfo})
  })
  .post(Paths.welcomePage.uri, (req: express.Request, res: express.Response) => {
    res.redirect(Paths.categoryListPage.uri)
  })
