import { RequestLoggingHandler } from 'logging/requestPromiseLoggingHandler'
import { ApiLogger } from 'logging/apiLogger'
const fetch = require('node-fetch');
const logger = new ApiLogger()

const localDevEnvironment = 'development'
const developmentMode = (process.env.NODE_ENV || localDevEnvironment) === localDevEnvironment

const timeout: number = developmentMode ? 10000 : 4500

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
  const controller = new AbortController()
  const signal = controller.signal
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    return await fetch(url, { ...options, signal })
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

const wrappedFetch = new Proxy(fetchWithTimeout, new RequestLoggingHandler(logger))

export interface AuthOptions {
  bearerToken?: string
}

export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}

export default async function makeRequest(
  url: string,
  method: string,
  token: string = null,
  body: object = null
): Promise<Response> {
  const options: {method: string, headers: object, body?: string} = {
    method,
    headers: { 'Content-Type': 'application/json' }
  }

  if (token) { options.headers['Authorization'] = `Bearer ${token}` }
  if (body) { options.body = JSON.stringify(body); }

  const resp = await wrappedFetch(url, options);
  if (resp.ok) { return resp; }

  throw new FeesClientError(await resp.text())
}
