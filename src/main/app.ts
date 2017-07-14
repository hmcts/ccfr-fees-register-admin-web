import * as express from 'express'
import * as config from 'config'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as logging from 'nodejs-logging'
import { NotFoundError } from './errors'
import { AccessLogger } from 'logging/accessLogger'
import { ErrorLogger } from 'logging/errorLogger'
import { RouterFinder } from 'common/router/routerFinder'
import { AuthorizationMiddlewareFactory } from 'idam/authorizationMiddlewareFactory'
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.all(/^\/(?!admin).*$/, AuthorizationMiddlewareFactory.genericRequestHandler())

new AdminFeature().enableFor(app)

app.use('/', RouterFinder.findAll(path.join(__dirname, 'routes')))

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
