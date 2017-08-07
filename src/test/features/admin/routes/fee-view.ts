import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as feesServiceMock from '../../../http-mocks/fees'
import * as idamServiceMock from '../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')

describe('Category view page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render category when fees-register returns data', async () => {
      feesServiceMock.resolveGetFee()
      idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .get(AdminPaths.feeViewPage.uri.replace(':categoryCode', 'any').replace(':feeCode', 'X0001') )
        .set('Cookie', `${cookieName}=JWT`)
        .expect(res => expect(res).to.be.successful.withText('X0001', 'Civil Court fees - Hearing fees - Claim Amount - 0.01 upto 300 GBP', '25'))
    })
  })
})
