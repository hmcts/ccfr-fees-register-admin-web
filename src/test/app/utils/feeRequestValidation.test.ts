import { expect } from 'chai'
import * as sinon from 'sinon'
import * as express from 'express'
import * as httpMocks from 'node-mocks-http'

import { parseVersion, isValidFeeCode, validateFeeParams } from 'utils/feeRequestValidation'
import { BadRequestError } from 'errors'

describe('feeRequestValidation', () => {
  describe('parseVersion', () => {
    it('should accept a valid positive integer', () => {
      expect(parseVersion('1')).to.equal(1)
      expect(parseVersion(1)).to.equal(1)
      expect(parseVersion('99999')).to.equal(99999)
    })

    it('should reject empty or missing values', () => {
      expect(parseVersion(undefined)).to.equal(null)
      expect(parseVersion(null)).to.equal(null)
      expect(parseVersion('')).to.equal(null)
    })

    it('should reject non-numeric values', () => {
      expect(parseVersion('abc')).to.equal(null)
      expect(parseVersion('1.5')).to.equal(null)
      expect(parseVersion('1e3')).to.equal(null)
      expect(parseVersion(' 1 ')).to.equal(null)
    })

    it('should reject zero and negatives', () => {
      expect(parseVersion('0')).to.equal(null)
      expect(parseVersion('-1')).to.equal(null)
    })

    it('should reject versions above the maximum bound', () => {
      expect(parseVersion('100001')).to.equal(null)
      expect(parseVersion('999999999')).to.equal(null)
    })
  })

  describe('isValidFeeCode', () => {
    it('should accept alphanumeric codes with dash and underscore', () => {
      expect(isValidFeeCode('FEE002')).to.equal(true)
      expect(isValidFeeCode('x_1-Y')).to.equal(true)
    })

    it('should reject empty, non-string and out-of-pattern values', () => {
      expect(isValidFeeCode('')).to.equal(false)
      expect(isValidFeeCode(123)).to.equal(false)
      expect(isValidFeeCode(null)).to.equal(false)
      expect(isValidFeeCode('FEE/../etc')).to.equal(false)
      expect(isValidFeeCode('a'.repeat(51))).to.equal(false)
    })
  })

  describe('validateFeeParams', () => {
    function invoke (source: string, values: { [k: string]: any }): any {
      const middleware: express.RequestHandler = validateFeeParams([{ source: source as any, name: 'feeCode' }, { source: source as any, name: 'version' }])
      const req: any = httpMocks.createRequest()
      const res: any = httpMocks.createResponse()
      const next: sinon.SinonSpy = sinon.spy()
      req[source] = values
      middleware(req, res, next)
      return { req, next }
    }

    it('should call next() with no error for valid input', () => {
      const { next } = invoke('body', { feeCode: 'FEE002', version: '2' })
      expect(next.calledOnce).to.equal(true)
      expect(next.firstCall.args[0]).to.equal(undefined)
    })

    it('should normalise the version to a number', () => {
      const { req } = invoke('body', { feeCode: 'FEE002', version: '2' })
      expect(req.body.version).to.equal(2)
    })

    it('should reject an invalid version', () => {
      const { next } = invoke('query', { feeCode: 'FEE002', version: '999999999' })
      expect(next.calledOnce).to.equal(true)
      expect(next.firstCall.args[0]).to.be.instanceOf(BadRequestError)
    })

    it('should reject an invalid feeCode', () => {
      const { next } = invoke('body', { feeCode: 'FEE/../x', version: '1' })
      expect(next.calledOnce).to.equal(true)
      expect(next.firstCall.args[0]).to.be.instanceOf(BadRequestError)
    })
  })
})
