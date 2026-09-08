import * as config from 'config'
import * as mock from 'nock'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/fees'
import * as idamServiceMock from '../../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')
const request = require('supertest')

describe('Fee request parameter validation (ITHC DoS remediation)', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on POST with an invalid version', () => {
    const invalidVersions = ['abc', '0', '-1', '999999999', '', '1.5']

    invalidVersions.forEach((version) => {
      it(`should respond 400 for confirm-draft-approval without reaching the backend (version=${version})`, async () => {
        idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

        await request(app)
          .post(AdminPaths.confirmDraftApprovalV2.uri)
          .send({ 'feeCode': 'FEE002', 'version': version, 'action': 'submit' })
          .set('Cookie', `${cookieName}=JWT`)
          .expect(400)
      })

      it(`should respond 400 for fee-details without reaching the backend (version=${version})`, async () => {
        idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

        await request(app)
          .post(AdminPaths.feeDetailsViewPagev2.uri)
          .send({ 'feeCode': 'FEE002', 'version': version, 'action': 'submit' })
          .set('Cookie', `${cookieName}=JWT`)
          .expect(400)
      })

      it(`should respond 400 for dashboard without reaching the backend (version=${version})`, async () => {
        idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

        await request(app)
          .post(AdminPaths.dashboard.uri)
          .send({ 'feeCode': 'FEE002', 'version': version, 'action': 'submit' })
          .set('Cookie', `${cookieName}=JWT`)
          .expect(400)
      })
    })
  })

  describe('on POST with an invalid feeCode', () => {
    it('should respond 400 for confirm-draft-approval without reaching the backend', async () => {
      idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.confirmDraftApprovalV2.uri)
        .send({ 'feeCode': 'FEE/../x', 'version': '1', 'action': 'submit' })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(400)
    })
  })

  describe('on POST with valid input', () => {
    it('should still submit a fee version', async () => {
      feesServiceMock.resolveApprove('FEE002', 1, 'submit')
      idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.confirmDraftApprovalV2.uri)
        .send({ 'feeCode': 'FEE002', 'version': 1, 'action': 'submit' })
        .set('Cookie', `${cookieName}=JWT`)
        .expect(302)
    })
  })
})