import * as express from 'express'

export default express.Router()
  .get('/', function (req, res) {
    res.redirect('/admin/V2/all-fees')
  })
