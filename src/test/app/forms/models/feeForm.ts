/* Allow chai assertions which don't end in a function call, e.g. expect(thing).to.be.undefined */
/* tslint:disable:no-unused-expression */

import { expect } from 'chai'
import { Validator } from 'class-validator'

import { expectValidationError } from './validationUtils'

import { FeeForm, ValidationErrors } from 'app/forms/models/feeForm'
import * as _ from 'lodash'
import Fee from 'app/fees/fee'

describe('FeeForm', () => {

  describe('description validation', () => {
    const validator: Validator = new Validator()

    it('should reject empty description', () => {
      const errors = validator.validateSync(new FeeForm())
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.DESCRIPTION_REQUIRED)
    })

    it('should reject long description', () => {
      const errors = validator.validateSync(FeeForm.fromObject({description: 'a'.repeat(2001)}))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.DESCRIPTION_TOO_LONG.replace('$constraint1', '2000'))
    })

    it('should accept max description', () => {
      const errors = validator.validateSync(FeeForm.fromObject({description: 'a'.repeat(2000)}))
      expect(errors.length).to.equal(0)
    })
  })

  describe('amount validation', () => {
    const validFixedFee: any = {description: 'any', type: 'fixed', amount: '10'}
    const validator: Validator = new Validator()

    it('should reject empty amount', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {amount: null})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.AMOUNT_REQUIRED)
    })

    it('should reject negative amount', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {amount: '-1'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.AMOUNT_NOT_NEGATIVE)
    })

    it('should reject large amount', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {amount: '10000000'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.AMOUNT_TOO_BIG)
    })

    it('should reject 3 decimal places amount', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {amount: '0.001'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.AMOUNT_INVALID_DECIMALS)
    })

    it('should accept zero amount', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {amount: '0.00'})))
      expect(errors.length).to.equal(0)
    })
  })

  describe('percentage validation', () => {
    const validFixedFee: any = {description: 'any', type: 'percentage', percentage: '10'}
    const validator: Validator = new Validator()

    it('should reject empty percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: null})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.PERCENTAGE_REQUIRED)
    })

    it('should reject negative percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: '-1'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.PERCENTAGE_GREATER_THAN_0)
    })

    it('should reject zero percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: '0.00'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.PERCENTAGE_GREATER_THAN_0)
    })

    it('should reject 100.01 percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: '100.01'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.PERCENTAGE_LOWER_THAN_100)
    })

    it('should reject 3 decimal places percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: '0.001'})))
      expect(errors.length).to.equal(1)
      expectValidationError(errors, ValidationErrors.PERCENTAGE_INVALID_DECIMALS)
    })

    it('should accept 100 percentage', () => {
      const errors = validator.validateSync(FeeForm.fromObject(_.merge(validFixedFee, {percentage: '100.00'})))
      expect(errors.length).to.equal(0)
    })
  })

  describe('percentage validation', () => {
    it('should convert to Fee', () => {
      let feeForm = new FeeForm('code', 'type', 'description', 111, 222)
      expect(feeForm.toFee()).deep.equal(new Fee('code', 'type', 'description', 11100, 222))
    })

    it('should convert float point correctly', () => {
      let feeForm = new FeeForm('code', 'type', 'description', 0.57, 222)
      expect(feeForm.toFee()).deep.equal(new Fee('code', 'type', 'description', 57, 222))
    })
  })
})
