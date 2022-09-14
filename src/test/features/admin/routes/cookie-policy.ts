
import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as idamServiceMock from '../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')

describe('Cookies Page', () => {
    beforeEach(() => {
        mock.cleanAll()
    })

    describe('on GET', () => {
        it('should render the cookies page', async () => {
            idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

            await request(app)
                .get(AdminPaths.cookiePolicyPage.uri)
                .set('Cookie', `${cookieName}=JWT`)
                .expect(res => (expect(res).to.be as any).successful.withText('How cookies are used in this service'))
        })
    })

})