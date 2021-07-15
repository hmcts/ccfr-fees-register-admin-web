import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { RejectFeeForm } from 'fees/v2/forms/model/RejectFeeForm'

const cookieName: string = config.get<string>('session.cookieName')

let reasonForReject = {

  reason_for_reject: 'xxx'

}

describe('Reject Fee page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render the reject fee page', async () => {

      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .get(AdminPaths.feeCreatePageV2.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

    it('should render the reject fee page', async () => {

      feesServiceMock.resolveGetFee()

      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .get(AdminPaths.feeRejectReason.uri.replace(':feeCode', 'FEE0001').replace(':feeVersion', '1'))
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

  })

  describe('on POST', () => {
    it('should reject fee', async () => {

      feesServiceMock.resolveCreateRangedFee()
      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .post(AdminPaths.feeRejectReason.uri)
        .send(RejectFeeForm.fromObject(reasonForReject))
        .set('Cookie', `${cookieName}=JWT`)

    })

  })

})
