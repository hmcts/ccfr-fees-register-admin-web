
import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'

import '../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../main/app'

import * as idamServiceMock from '../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')

describe('Cookies Details Page', () => {
    beforeEach(() => {
        mock.cleanAll()
    })

    describe('on GET', () => {
        it('should render the cookie details page', async () => {
            idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

            await request(app)
                .get(AdminPaths.cookieDetailsPage.uri,)
                .set('Cookie', `${cookieName}=JWT`)
                .expect(res => (expect(res).to.be as any).successful.withText('How cookies are used across services'))
        })

    })

})