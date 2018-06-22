import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/fees'

const cookieName: string = config.get<string>('session.cookieName')

describe('Dashboard page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render the dashboard when fees-register returns data', async () => {
      feesServiceMock.resolveGetFees()

      await request(app)
        .get(AdminPaths.dashboard.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(res => expect(res.statusCode).to.be.equal(200))
    })
  })
})
