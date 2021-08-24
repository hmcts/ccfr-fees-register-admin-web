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
        .get(AdminPaths.feeDetailsViewPagev2.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(500)
    })
  })
  describe('on POST', () => {
    it('should submit fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'submit')
      feesServiceMock.resolveGetFees()
      await request(app)
        .post(AdminPaths.feeDetailsViewPagev2.uri)
        .send({
          'feeCode': 'FEE002', 'version': 1, 'action': 'submit'
        })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(302)
    })

    it('should approve fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'approve')
      feesServiceMock.resolveGetFees()
      await request(app)
        .post(AdminPaths.feeDetailsViewPagev2.uri)
        .send({
          'feeCode': 'FEE002', 'version': 1, 'action': 'approve'
        })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(302)
    })
  })
})
