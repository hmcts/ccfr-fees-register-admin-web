import * as express from 'express'
import * as config from 'config'
import * as propertiesVolume from '@hmcts/properties-volume'
propertiesVolume.addTo(config)
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as featureToggles from 'feature-toggles'
import * as isUndefined from 'is-undefined'
import { NotFoundError } from './errors'
import { Logger } from '@hmcts/nodejs-logging'
import { AccessLogger } from 'logging/accessLogger'
import { ErrorLogger } from 'logging/errorLogger'
import * as IDAM from 'idam/security'
import { RouterFinder } from 'common/router/routerFinder'
import { Helmet, Config as HelmetConfig } from 'modules/helmet'
import I18Next from 'modules/i18n'
import Nunjucks from 'modules/nunjucks'
import { Feature as AdminFeature } from 'admin/index'
import { CsrfProtection } from 'modules/csrf'

export const app: express.Express = express()

const logger = Logger.getLogger('app')

logger.info({
  microservice: 'fees-register-admin-web',
  team: 'cc',
  environment: process.env.NODE_ENV
})

import * as dateFilter from 'nunjucks-date-filter'

dateFilter.setDefaultFormat('DD-MM-YYYY')

// Feature toggle to supress/disable edit features, defaultToggle for making the existing middleware test to pass
let defaultToggle = !!isUndefined(process.env.NODE_ENV)

const toggles = { edit: process.env.FEATURE_TOGGLE || defaultToggle }
featureToggles.load(toggles)
app.use(featureToggles.middleware)

const env = process.env.NODE_ENV || 'development'
app.locals.ENV = env

const developmentMode = env === 'development'

const i18next = I18Next.enableFor(app)

export const nunjucksEnv = new Nunjucks(developmentMode, i18next)
  .enableFor(app)
new Helmet(config.get<HelmetConfig>('security'), developmentMode)
  .enableFor(app)

app.enable('trust proxy')
app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({
  limit: '20mb',
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

if (env !== 'development') {
  new CsrfProtection().enableFor(app)
}

if (!config.has('security.clientId') || !config.has('secrets.ccpay.freg-idam-client-secret')) {
  console.error('Client id or client secret not found.')
  console.error('If this is a dev environment, please set FEES_CLIENT_ID and FEES_CLIENT_SECRET environment variable')
  console.error('Ask a dev on the team for the id and secret')

  process.exit(1)
}

const security = new IDAM({
  clientId: config.get<String>('security.clientId'),
  clientSecret: config.get<String>('secrets.ccpay.freg-idam-client-secret'),
  loginUrl: config.get<String>('idam.login.url'),
  apiUrl: config.get<String>('idam.api.url'),
  redirectUri: '/oauth2/callback'
})

app.use('/oauth2/callback', security.OAuth2CallbackEndpoint())
app.use('/logout', security.logout())
new AdminFeature().enableFor(app, security)

app.use('/', security.protect('freg'), RouterFinder.findAll(path.join(__dirname, 'routes')))

// Below will match all routes not covered by the router, which effectively translates to a 404 response
app.use((req, res, next) => {
  next(new NotFoundError(req.path))
})

// error handlers
const errorLogger = new ErrorLogger()
app.use((err, req, res, next) => {
  errorLogger.log(err)
  const view = (env === 'development' || env === 'dev' || env === 'demo') ? 'error_dev' : 'error'
  res.status(err.statusCode || 500)
  res.render(view, {
    error: err,
    title: 'error'
  })
  next()
})

const accessLogger = new AccessLogger()
app.use((req, res, next) => {
  res.on('finish', () => accessLogger.log(req, res))
  next()
})
