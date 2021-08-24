import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../routes/expectations'

import { app } from '../../main/app'

import * as feesServiceMock from '../http-mocks/fees'
import * as idamServiceMock from '../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')

describe('pending fees list page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render all fees when fees-register returns data', async () => {
      feesServiceMock.resolveGetCategories()
      idamServiceMock.resolveRetrieveUserFor(3, 'approver', 'approver')

      await request(app)
        .get('/')
        .set('Cookie', `${cookieName}=JWT`)
        .expect(res => (expect(res).to.be as any).redirect.toLocation('/admin/V2/all-fees'))
    })
    it('should render all fees when fees-register returns data', async () => {
      feesServiceMock.resolveGetCategories()
      idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
         .get('/')
         .set('Cookie', `${cookieName}=JWT`)
         .expect(res => (expect(res).to.be as any).redirect.toLocation('/admin/V2/all-fees'))
    })
  })
})
