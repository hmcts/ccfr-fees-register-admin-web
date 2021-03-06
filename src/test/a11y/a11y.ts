import * as supertest from 'supertest'
import * as pa11y from 'pa11y'
import * as promisify from 'es6-promisify'
import { expect } from 'chai'

import { RoutablePath } from 'common/router/routablePath'
import { Paths as AdminPaths } from 'admin/paths'

import './mocks'
import { app } from '../../main/app'

const agent = supertest.agent(app)
const pa11yTest = pa11y({
  verifyPage: '<title>((?!error).)*<\/title>' // Pages with error word in page title will fail immediately
})
const test = promisify(pa11yTest.run, pa11yTest)

function check (url: string): void {
  describe(`Page ${url}`, () => {

    it('should have no accessibility errors', (done) => {
      test(agent.get(url).url)
        .then((messages) => {
          const errors = messages.filter((m) => m.type === 'error')
          /* tslint:disable:no-unused-expression */
          // need a better solution at some point, https://github.com/eslint/eslint/issues/2102
          expect(errors, `\n${JSON.stringify(errors, null, 2)}\n`).to.be.empty
          /* tslint:enable:no-unused-expression */
          done()
        })
        .catch((err) => done(err))
    })
  })
}

describe('Accessibility', () => {
  function checkPaths (pathsRegistry: object): void {
    Object.values(pathsRegistry).forEach((path: RoutablePath) => {
      if (path.uri !== 'n/a' && path.uri !== '/admin/v2/applicants' && path.uri !== '/health') {
        check(path.uri)
      }
    })
  }

  checkPaths(AdminPaths)
})
