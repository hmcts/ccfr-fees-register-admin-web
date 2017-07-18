import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as feesServiceMock from '../../../http-mocks/fees'

describe('Category view page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render category when fees-register returns data', async () => {
      feesServiceMock.resolveGetCategory()

      await request(app)
        .get(AdminPaths.categoryViewPage.uri.replace(':categoryId', 'hearingfees'))
        .expect(res => expect(res).to.be.successful.withText('hearingfees', 'Civil Court fees - Hearing fees - Multi track claim', '£1,090'))
    })
  })
})
