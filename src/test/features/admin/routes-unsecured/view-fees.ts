import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'
import * as feesServiceMock from '../../../http-mocks/fees'

describe('Unsecured view-fees page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should respond with all-fees pointing at view-fee-version-history', async () => {
      feesServiceMock.resolveGetFees()

      await request(app)
        .get(AdminPaths.unsecuredViewFees.uri)
        .expect(res => {
          expect(res.text).to.include('/fees/X0001')
        })
    })
  })
})
