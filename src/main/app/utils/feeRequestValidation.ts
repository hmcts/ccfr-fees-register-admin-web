import * as express from 'express'

import { BadRequestError } from 'errors'

export const MAX_FEE_VERSION = 100000
export const FEE_CODE_PATTERN = /^[A-Za-z0-9_-]{1,50}$/

export function parseVersion (value: any): number | null {
  if (value === undefined || value === null || value === '') {
    return null
  }
  if (!/^\d+$/.test(String(value))) {
    return null
  }
  const number: number = Number(value)
  if (!Number.isInteger(number) || number < 1 || number > MAX_FEE_VERSION) {
    return null
  }
  return number
}

export function isValidFeeCode (value: any): boolean {
  return typeof value === 'string' && FEE_CODE_PATTERN.test(value)
}

export type ParamSource = 'body' | 'query' | 'params'
export interface FeeParamSpec {
  source: ParamSource
  name: 'feeCode' | 'version'
  field?: string
  required?: boolean
}

export function validateFeeParams (specs: FeeParamSpec[]): express.RequestHandler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      for (const spec of specs) {
        const container: any = spec.source === 'body' ? req.body : spec.source === 'query' ? req.query : req.params
        const field: string = spec.field || spec.name
        const required: boolean = spec.required === true

        if (required && (container[field] === undefined || container[field] === null || container[field] === '')) {
          throw new BadRequestError(`Invalid ${spec.name}`)
        }
        if (container[field] === undefined || container[field] === null || container[field] === '') {
          continue
        }

        if (spec.name === 'version') {
          const parsed = parseVersion(container[field])
          if (parsed === null) {
            throw new BadRequestError('Invalid version')
          }
          container[field] = parsed
        } else {
          if (!isValidFeeCode(container[field])) {
            throw new BadRequestError('Invalid feeCode')
          }
        }
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}
