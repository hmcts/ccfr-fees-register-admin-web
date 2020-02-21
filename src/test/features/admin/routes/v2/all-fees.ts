import * as config from 'config'
import * as mock from 'nock'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/fees'
import * as idamServiceMock from '../../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')
const request = require('supertest')

describe('All fees list page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render all fees when fees-register returns data', async () => {
      feesServiceMock.resolveGetFees()
      idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .get(AdminPaths.allFeesPageV2.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })
  })
})
