import * as express from 'express'
const csrf = require('csurf');

export class CsrfProtection {
  enableFor (app: express.Express) {
    app.use(
      csrf(
        {
          cookie: {
            key: '_csrf',
            secure: true,
            sameSite: 'lax',
            httpOnly: true
          }
        }
      )
    )

    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.locals.csrfToken = req.csrfToken()
      next()
    })
  }
}
