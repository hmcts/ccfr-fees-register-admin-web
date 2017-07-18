import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as feesServiceMock from '../../../http-mocks/fees'

describe('Categories list page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render categories when fees-register returns data', async () => {
      feesServiceMock.resolveGetCategories()

      await request(app)
        .get(AdminPaths.categoryListPage.uri)
        .expect(res => expect(res).to.be.successful.withText('onlinefees', 'hearingfees', '<td class="numeric">2</td>'))
    })
  })
})
