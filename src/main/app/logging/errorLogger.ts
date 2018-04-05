export class ErrorLogger {
  constructor (public logger = require('@hmcts/nodejs-logging').getLogger('errorLogger.js')) {
    this.logger = logger
  }

  log (err) {
    if (err) {
      this.logger.error(`${err.stack || err}`)
      this.logger.error(JSON.stringify(err))
    } else {
      this.logger.debug('Received error was blank')
    }
  }
}
