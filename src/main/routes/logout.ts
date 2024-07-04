import * as express from 'express'
import * as config from 'config'

const sessionCookie = config.get<string>('session.cookieName')
const REDIRECT = '/';

export default express.Router()
  .get('/logout', (req, res, next) => {
    res.clearCookie(sessionCookie)
    res.redirect(REDIRECT)
  })
