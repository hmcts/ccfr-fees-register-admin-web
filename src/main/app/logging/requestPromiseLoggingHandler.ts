const httpCallMethods = ['get', 'post', 'put', 'patch', 'delete', 'del', 'head']

function contains (array, value) {
  return array.indexOf(value) >= 0
}

/**
 * Request provides a convenience method which accepts an URI string and builds the options
 * object behind the scenes. We need the options object upfront to set the logging callback on it.
 */
function asOptions (param) {
  if (typeof param === 'string' || param instanceof String) {
    return {
      uri: param
    }
  } else {
    return param
  }
}

function intercept (callbackFunction) {
  return (err, response, body) => {
    if (callbackFunction) {
      callbackFunction(err, response, body)
    }
  }
}

export class RequestLoggingHandler {
  constructor (public apiLogger: any) {
    this.apiLogger = apiLogger;
  }

  apply (target: any, thisArg: any, argumentsList: any) {
    const calledMethodName = target.name;
    if (contains(httpCallMethods, calledMethodName)) {
      this.handleLogging(calledMethodName.toUpperCase(), asOptions(argumentsList[0]));
    }
    return Reflect.apply(target, thisArg, argumentsList);
  }

  handleLogging (method: any, options: any) {
    this.apiLogger.logRequest({
      method: method,
      uri: options.uri,
      requestBody: options.body,
      query: options.qs,
    });
    const originalCallback = intercept(options.callback);
    options.callback = (err: any, response: any, body: any) => {
      originalCallback(err, response, body);
      this.apiLogger.logResponse({
        uri: options.uri,
        responseCode: ((response) ? response.statusCode : undefined),
        responseBody: body,
        error: err,
      });
    };
  }
}
