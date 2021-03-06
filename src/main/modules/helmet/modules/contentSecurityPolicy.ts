import * as express from 'express'
import * as helmet from 'helmet'

const none = '\'none\''
const self = '\'self\''

export class ContentSecurityPolicy {

  constructor (public developmentMode: boolean) {
  }

  enableFor (app: express.Express) {
    const scriptSrc = [self]
    const connectSrc = [self]

    if (this.developmentMode) {
      scriptSrc.push('http://localhost:35729')
      connectSrc.push('ws://localhost:35729')
    }

    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [none],
        fontSrc: [self, 'data:'],
        imgSrc: [self],
        styleSrc: [self],
        scriptSrc: scriptSrc,
        connectSrc: connectSrc,
        objectSrc: [self]
      }
    }))
  }
}
