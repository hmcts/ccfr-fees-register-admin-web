import * as chai from 'chai'
import * as spies from 'chai-spies'

chai.use(spies)
const expect = chai.expect

import { RequestLoggingHandler } from 'logging/requestPromiseLoggingHandler'

describe('RequestLoggingHandler', () => {

  let options

  /* tslint:disable:no-empty allow empty for mocking */
  let requestPromise = {
    get: (options) => {
    },
    post: (options) => {
    },
    put: (options) => {
    },
    del: (options) => {
    },
    delete: (options) => {
    },
    patch: (options) => {
    },
    head: (options) => {
    },
    another: (options) => {
    }
  }

  /* tslint:enable:no-empty */

  beforeEach(() => {
    options = {}
  })

  describe('request-promise http calls proxy', () => {
    let logRequestCall

    let apiLogger

    let handler

    let proxy

    beforeEach(() => {

      /* tslint:disable:no-empty allow empty for mocking */
      apiLogger = {
        logRequest: (requestData) => {
        },
        logResponse: (responseData) => {
        }
      }

      handler = new RequestLoggingHandler(requestPromise, apiLogger)
      proxy = new Proxy(requestPromise, handler)

      logRequestCall = chai.spy.on(apiLogger, 'logRequest')
    })

    const suiteParameters = [
      { paramName: 'options object', param: {} },
      { paramName: 'uri string', param: 'http://local.instance/some/path' }
    ]

    suiteParameters.forEach((suite) => {
      describe(`when passed an ${suite.paramName}`, () => {
        it('should handle logging on a get call', () => {
          proxy.get(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a put call', () => {
          proxy.put(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a post call', () => {
          proxy.post(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a del call', () => {
          proxy.del(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a delete call', () => {
          proxy.delete(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a patch call', () => {
          proxy.patch(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should handle logging on a head call', () => {
          proxy.head(suite.param)
          expect(logRequestCall).to.have.been.called()
        })

        it('should not handle logging on other calls', () => {
          proxy.another(suite.param)
          expect(logRequestCall).not.to.have.been.called()
        })
      })
    })
  })

  describe('handleLogging', () => {
    let originalCallback

    let apiLogger

    let handler

    beforeEach(() => {
      originalCallback = chai.spy()

      /* tslint:disable:no-empty allow empty for mocking */
      apiLogger = {
        logRequest: (requestData) => {
        },
        logResponse: (responseData) => {
        }
      }

      handler = new RequestLoggingHandler(requestPromise, apiLogger)

    })

    it('should assign a callback to the options object', () => {
      handler.handleLogging('any', options)
      // tslint:disable:disable-next-line no-unused-expression allow chai to be used without ()
      expect(options.callback).not.to.be.undefined
    })

    it('should override the originally assigned callback', () => {
      options.callback = originalCallback
      handler.handleLogging('any', options)

      expect(options.callback).not.to.equal(originalCallback)
    })

    it('should call the original callback defined in options object', () => {
      options.callback = originalCallback
      handler.handleLogging('any', options)
      options.callback()

      expect(originalCallback).to.have.been.called()
    })
  })
})
