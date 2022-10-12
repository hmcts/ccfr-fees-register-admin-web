import * as express from 'express'
import * as helmet from 'helmet'

const none = '\'none\''
const self = '\'self\''
const googleAnalyticsDomain = '*.google-analytics.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];

export class ContentSecurityPolicy {

  constructor (public developmentMode: boolean) {
  }

  enableFor (app: express.Express) {
    const scriptSrc = [self, ...tagManager, googleAnalyticsDomain, "'unsafe-inline'", "'unsafe-eval'"]
    const connectSrc = [self, googleAnalyticsDomain]

    if (this.developmentMode) {
      scriptSrc.push('http://localhost:35729')
      connectSrc.push('ws://localhost:35729')
    }

    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [none],
        fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
        imgSrc: [self , ...tagManager, googleAnalyticsDomain, 'data:', 'https://ssl.gstatic.com', 'https://www.gstatic.com'],
        styleSrc: [self, ...tagManager,  "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: scriptSrc,
        connectSrc: connectSrc,
        objectSrc: [self]
      }
    }))
  }
}
