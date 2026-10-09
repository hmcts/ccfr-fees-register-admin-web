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
                .expect(res => {
                    (expect(res).to.be as any).successful
                    expect(res.text).to.contain('Accessibility statement for Fee Register')
                    expect(res.text).to.contain('This service is partially compliant with WCAG 2.2')
                    expect(res.text).to.contain('href="https://www.equalityadvisoryservice.com/"')
                    expect(res.text).to.contain('href="https://www.w3.org/TR/WCAG22/"')
                    expect(res.text).to.contain('class="govuk-heading-xl"')
                    expect(res.text).to.contain('class="govuk-grid-column-two-thirds accessibility-statement-content"')
                    expect(res.text).to.contain('class="govuk-body"')
                })
        })
    })

})
