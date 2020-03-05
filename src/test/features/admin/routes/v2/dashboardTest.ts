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
        .expect(200)
    })
  })

  describe('on POST', () => {
    it('should submit fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'submit')
      feesServiceMock.resolveGetFees()
      await request(app)
        .post(AdminPaths.dashboard.uri)
        .send({
          'feeCode': 'FEE002', 'version': 1, 'action': 'submit'
        })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

    it('should delete fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'delete')
      feesServiceMock.resolveGetFees()
      await request(app)
        .post(AdminPaths.dashboard.uri)
        .send({
          'feeCode': 'FEE002', 'version': 1, 'action': 'delete'
        })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

    it('should approve fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'approve')
      feesServiceMock.resolveGetFees()
      await request(app)
        .post(AdminPaths.dashboard.uri)
        .send({
          'feeCode': 'FEE002', 'version': 1, 'action': 'approve'
        })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })
  })
})
