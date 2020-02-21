import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { CreateFeeForm } from 'fees/v2/forms/model/CreateFeeForm'

const cookieName: string = config.get<string>('session.cookieName')

let version = 1

let rangedFee = {

  code: 'X0001',

  natural_account_code: 'xxx',

  fee_order_name: 'xxx',

  description: 'a lonely fee',

  applicant_type: {
    name: 'xxx'
  },

  channel_type: {
    name: 'xxx'
  },

  event_type: {
    name: 'event_xxx'
  },

  service_type: {
    name: 'xxx'
  },

  direction: 'indirection',

  range_unit: 'fishes',

  jurisdiction1: {
    name: 'xxx'
  },

  jurisdiction2: {
    name: 'xxx'
  },

  keyword: 'rangedKeyword',

  fee_type: 'ranged',

  min_range: 1,
  max_range: 100,

  fee_versions: [
    {
      version: 1,
      flat_amount: {
        amount: 100
      }
    }
  ]

}

let fixedFee = {

  code: 'X0001',

  natural_account_code: 'xxx',

  fee_order_name: 'xxx',

  description: 'a lonely fee',

  applicant_type: {
    name: 'xxx'
  },

  direction: 'indirection',

  channel_type: {
    name: 'xxx'
  },

  event_type: {
    name: 'event_xxx'
  },

  service_type: {
    name: 'xxx'
  },

  jurisdiction1: {
    name: 'xxx'
  },

  jurisdiction2: {
    name: 'xxx'
  },

  keyword: 'testKeyword',

  fee_type: 'fixed',

  fee_versions: [
    {
      version: 1,
      flat_amount: {
        amount: 100
      }
    }
  ]

}

describe('Create/Edit Fee page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render the create fee page', async () => {

      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .get(AdminPaths.feeCreatePageV2.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

    it('should render the create fee page in edit mode', async () => {

      feesServiceMock.resolveGetFee()

      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .get(AdminPaths.feeCreatePageV2.uri + '?action=edit&feeCode=X0001')
        .set('Cookie', `${cookieName}=JWT`)
        .expect(200)
    })

  })

  describe('on POST', () => {
    it('should create a ranged fee', async () => {

      feesServiceMock.resolveCreateRangedFee()
      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .post(AdminPaths.feeCreatePageV2.uri)
        .send(CreateFeeForm.fromGivenVersion(rangedFee, version, false))
        .set('Cookie', `${cookieName}=JWT`)

    })

    it('should edit a ranged fee', async () => {

      feesServiceMock.resolveDeleteFee()
      feesServiceMock.resolveCreateRangedFee()
      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .post(AdminPaths.feeCreatePageV2.uri)
        .send(CreateFeeForm.fromGivenVersion(rangedFee, version, true))
        .set('Cookie', `${cookieName}=JWT`)

    })

    it('should create a fixed fee', async () => {

      feesServiceMock.resolveCreateFixedFee()
      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .post(AdminPaths.feeCreatePageV2.uri)
        .send(CreateFeeForm.fromGivenVersion(fixedFee, version, false))
        .set('Cookie', `${cookieName}=JWT`)

    })

    it('should edit a fixed fee', async () => {

      feesServiceMock.resolveDeleteFee()
      feesServiceMock.resolveCreateFixedFee()
      feesServiceMock.resolveGetReferenceData()

      await request(app)
        .post(AdminPaths.feeCreatePageV2.uri)
        .send(CreateFeeForm.fromGivenVersion(fixedFee, version, true))
        .set('Cookie', `${cookieName}=JWT`)

    })

  })

})
