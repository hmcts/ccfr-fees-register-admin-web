import * as express from 'express'

export default express.Router()
  .get('/', function (req, res) {
    const roles = res.locals.user.userInfo
    if (roles.indexOf('freg-approver') !== -1) {
      res.redirect('/admin/V2/pending-approval')
    } else {
      res.redirect('/admin/V2/all-fees')
    }
    // res.redirect('/admin/V2/all-fees')

  })
