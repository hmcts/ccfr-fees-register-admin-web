import * as express from 'express'
import * as config from 'config'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as logging from '@hmcts/nodejs-logging'
import * as featureToggles from 'feature-toggles'
import * as isUndefined from 'is-undefined'
import { NotFoundError } from './errors'
import { AccessLogger } from 'logging/accessLogger'
import { ErrorLogger } from 'logging/errorLogger'
import * as IDAM from 'idam/security'
import { RouterFinder } from 'common/router/routerFinder'
import { Helmet, Config as HelmetConfig } from 'modules/helmet'
import I18Next from 'modules/i18n'
import Nunjucks from 'modules/nunjucks'

import { Feature as AdminFeature } from 'admin/index'

export const app: express.Express = express()

logging.config({
  microservice: 'fees-register-admin-web',
  team: 'cc',
  environment: process.env.NODE_ENV
})

import * as dateFilter from 'nunjucks-date-filter'
dateFilter.setDefaultFormat('DD-MM-YYYY')

// Feature toggle to supress/disable edit features, defaultToggle for making the existing middleware test to pass
let defaultToggle = isUndefined(process.env.NODE_ENV) ? true : false

const toggles = {edit: process.env.FEATURE_TOGGLE || defaultToggle }
featureToggles.load(toggles)
app.use(featureToggles.middleware)

const env = process.env.NODE_ENV || 'development'
app.locals.ENV = env

const developmentMode = env === 'development'

const i18next = I18Next.enableFor(app)

new Nunjucks(developmentMode, i18next)
  .enableFor(app)
new Helmet(config.get<HelmetConfig>('security'), developmentMode)
  .enableFor(app)

app.enable('trust proxy')
app.use(favicon(path.join(__dirname, '/public/img/favicon.ico')))
app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({ limit: '20mb',
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.all(/^.*$/, AuthorizationMiddlewareFactory.genericRequestHandler())

new AdminFeature().enableFor(app)

const security = new IDAM({
  clientId : 'registration_web',
  clientSecret : 'QM5RQQ53LZFOSIXJ',
  loginUrl: config.get<String>('idam.loginurl'),
  apiUrl: config.get<String>('idam.apiurl'),
  redirectUri: '/oauth2/callback'
})

app.use('/logout', security.logout())
app.use('/oauth2/callback', security.OAuth2CallbackEndpoint())

app.use('/', security.protect('admin'), RouterFinder.findAll(path.join(__dirname, 'routes')))

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
