import * as _ from 'lodash'
import {IsDefined, Max, MaxLength, Min, ValidateIf} from 'class-validator'
import {IsNotBlank} from 'app/forms/validation/validators/isBlank'
import {Fractions} from 'app/forms/validation/validators/fractions'

export class ValidationErrors {
  static readonly DESCRIPTION_REQUIRED: string = 'Enter description'
  static readonly DESCRIPTION_TOO_LONG: string = 'Enter description no longer than $constraint1 characters'

  static readonly AMOUNT_REQUIRED: string = 'Enter amount'
  static readonly AMOUNT_NOT_NEGATIVE: string = 'Enter amount equal or greater than zero'
  static readonly AMOUNT_INVALID_DECIMALS: string = 'Enter amount with maximum two decimal places'

  static readonly PERCENTAGE_REQUIRED: string = 'Enter percentage'
  static readonly PERCENTAGE_GREATER_THAN_0: string = 'Enter percentage greater than 0'
  static readonly PERCENTAGE_LOWER_THAN_100: string = 'Enter percentage lower than 100'
  static readonly PERCENTAGE_INVALID_DECIMALS: string = 'Enter percentage with maximum two decimal places'
}

export class FeeForm {
  code?: string
  type?: string

  @IsDefined({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @IsNotBlank({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @MaxLength(2000, {message: ValidationErrors.DESCRIPTION_TOO_LONG})
  description?: string

  @ValidateIf(o => o.type === 'fixed')
  @IsDefined({message: ValidationErrors.AMOUNT_REQUIRED})
  @Min(0, {message: ValidationErrors.AMOUNT_NOT_NEGATIVE})
  @Fractions(0, 2, {message: ValidationErrors.AMOUNT_INVALID_DECIMALS})
  amount?: number

  @ValidateIf(o => o.type === 'percentage')
  @IsDefined({message: ValidationErrors.PERCENTAGE_REQUIRED})
  @Min(0.01, {message: ValidationErrors.PERCENTAGE_GREATER_THAN_0})
  @Max(100, {message: ValidationErrors.PERCENTAGE_LOWER_THAN_100})
  @Fractions(0, 2, {message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS})
  percentage?: number

  constructor (code?: string, type?: string, description?: string, amount?: number, percentage?: number) {
    this.code = code
    this.type = type
    this.description = description
    this.amount = amount
    this.percentage = percentage
  }

  static fromObject (value?: any): FeeForm {
    if (!value) {
      return value
    }

    const code = value.code ? value.code : undefined
    const type = value.type ? value.type : undefined
    const description = value.description ? value.description : undefined
    const amount = value.amount ? _.toNumber(value.amount) : undefined
    const percentage = value.percentage ? _.toNumber(value.percentage) : undefined

    return new FeeForm(code, type, description, amount, percentage)
  }
}
