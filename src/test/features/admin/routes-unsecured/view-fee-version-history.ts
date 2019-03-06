import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

describe('Unsecured view-fee-version-history page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should respond with view-fee-version-history pointing at view-fees', async () => {
      await request(app)
        .get(AdminPaths.unsecuredViewFeeVersionHistory.uri.replace(':feeCode', 'FEE0001'))
        .expect(res => {
          expect(res.text).to.include('/view-fees')
        })
    })
  })
})
