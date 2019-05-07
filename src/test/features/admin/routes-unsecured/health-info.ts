import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'
import isDone = mock.isDone

describe('Health page', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should respond with JSON data', async () => {
      await request(app)
        .get(AdminPaths.healthInfoPage.uri)
        .expect(res => {
          expect(res.body).to.haveOwnProperty('fees')
          expect(res.body).to.haveOwnProperty('buildInfo')
        })
      isDone()
    })
  })
})
