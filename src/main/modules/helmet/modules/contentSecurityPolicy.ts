import * as express from 'express'
import { contentSecurityPolicy } from 'helmet'

const none = '\'none\''
const self = '\'self\''
const googleAnalyticsDomain = '*.google-analytics.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const dynatrace = 'https://*.dynatrace.com';

export class ContentSecurityPolicy {

  constructor (public developmentMode: boolean) {
  }

  enableFor (app: express.Express) {
    const scriptSrc = [self, ...tagManager, googleAnalyticsDomain, dynatrace, "'unsafe-inline'", "'unsafe-eval'"]
    const connectSrc = [self, googleAnalyticsDomain, dynatrace]

    if (this.developmentMode) {
      scriptSrc.push('http://localhost:35729')
      connectSrc.push('ws://localhost:35729')
    }

    app.use(contentSecurityPolicy({
      useDefaults: false,
      directives: {
        defaultSrc: [none],
        fontSrc: [self, 'data:', 'https://fonts.gstatic.com'],
        imgSrc: [self , ...tagManager, googleAnalyticsDomain, 'data:', 'https://ssl.gstatic.com', 'https://www.gstatic.com'],
        styleSrc: [self, ...tagManager,  "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: scriptSrc,
        connectSrc: connectSrc,
        objectSrc: [self]
      }
    }) as express.RequestHandler)
  }
}
