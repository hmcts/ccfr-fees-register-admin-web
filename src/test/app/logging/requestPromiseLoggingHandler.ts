import { expect } from 'chai';

import { RequestLoggingHandler } from 'logging/requestPromiseLoggingHandler';
import * as sinon from 'sinon';

const fakeUri = 'http://example.org';

describe('request logging handler', () => {

  let mockApiLogger: any;
  let requestLoggingHandler: RequestLoggingHandler;

  beforeEach(() => {
    mockApiLogger = {
      logRequest: sinon.spy(),
      logResponse: sinon.spy(),
    };
    requestLoggingHandler = new RequestLoggingHandler(mockApiLogger);
  });

  it('should call logRequest, then invoke the target, and return its result', () => {
    const fakeGet = sinon.stub().returns('FAKE_RESULT');
    Object.defineProperty(fakeGet, 'name', { value: 'get' });

    const options = {
      uri: fakeUri,
      body: { body: 'meat' },
      qs: { q: 'queryX' },
      callback: () => {},
    };

    const returnValue = requestLoggingHandler.apply(fakeGet, null, [options]);

    sinon.assert.calledOnceWithExactly(mockApiLogger.logRequest, {
      method: 'GET',
      uri: fakeUri,
      requestBody: options.body,
      query:      options.qs,
    });

    sinon.assert.calledOnceWithExactly(fakeGet, options);
    expect(returnValue).to.equal('FAKE_RESULT');
  });

  it('should not log or wrap non-HTTP methods', () => {
    const fakeFn = sinon.stub().returns(123);
    Object.defineProperty(fakeFn, 'name', { value: 'notAHttpMethod' });

    const options = { foo: 'bar' };
    const result = requestLoggingHandler.apply(fakeFn, null, [options]);

    sinon.assert.notCalled(mockApiLogger.logRequest);
    sinon.assert.calledOnceWithExactly(fakeFn, options);
    expect(result).to.equal(123);
  });

  it('should log request and response', () => {
    const options = {
      callback: sinon.stub(),
      uri: fakeUri,
      body: 'empty',
      qs: 'empty',
    };

    requestLoggingHandler.handleLogging('GET', options);

    sinon.assert.calledOnceWithExactly(mockApiLogger.logRequest, {
      method: 'GET',
      uri: fakeUri,
      requestBody: 'empty',
      query: 'empty',
    });


    const responseObj = { statusCode: 200 };
    const responseBody = 'responseBody';
    options.callback(null, responseObj, responseBody);

    sinon.assert.calledOnceWithExactly(mockApiLogger.logResponse, {
      uri: fakeUri,
      responseCode: 200,
      responseBody: 'responseBody',
      error: null,
    });

  });
});
