import { expect } from 'chai'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as idamServiceMock from '../../../http-mocks/idam'

describe('Accessibility Page', () => {
    beforeEach(() => {
        mock.cleanAll()
    })

    describe('on GET', () => {
        it('should render the accessibility page', async () => {
            idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

            await request(app)
                .get(AdminPaths.accessibilityPage.uri)
                .expect(res => (expect(res).to.be as any).successful.withText('Accessibility statement for Fee Register'))
        })
    })

})