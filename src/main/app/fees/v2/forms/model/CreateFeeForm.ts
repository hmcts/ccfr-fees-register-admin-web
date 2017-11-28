import { IsDefined, Matches, Max, MaxLength, Min, ValidateIf } from 'class-validator'

import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { Fractions } from 'app/forms/validation/validators/fractions'
import { IsUnique } from 'app/forms/validation/validators/isUnique'

import { FeesClient } from 'app/fees/v2/feesClient'

import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'

export class CreateFeeForm {
  @IsDefined({message: ValidationErrors.CODE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.CODE_REQUIRED})
  @MaxLength(50, {message: ValidationErrors.CODE_TOO_LONG})
  @Matches(/[A-Za-z0-9_-]+/, {message: ValidationErrors.CODE_INVALID_CHARACTERS})
  @IsUnique((value) => FeesClient.checkFeeExists(value).then((exists) => !exists), {message: ValidationErrors.CODE_EXISTS})
  code?: string

  @IsDefined({message: ValidationErrors.TYPE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.TYPE_REQUIRED})
  type?: string

  @IsDefined({message: ValidationErrors.TYPE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.TYPE_REQUIRED})
  amountType?: string

  @IsDefined({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @IsNotBlank({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @MaxLength(2000, {message: ValidationErrors.DESCRIPTION_TOO_LONG})
  description?: string

  @ValidateIf(o => o.amountType === 'fixed')
  @Min(0, {message: ValidationErrors.AMOUNT_NOT_NEGATIVE})
  @Max(9999999.99, {message: ValidationErrors.AMOUNT_TOO_BIG})
  @Fractions(0, 2, {message: ValidationErrors.AMOUNT_INVALID_DECIMALS})
  amount?: number

  @ValidateIf(o => o.amountType === 'percentage')
  @Min(0.01, {message: ValidationErrors.PERCENTAGE_GREATER_THAN_0})
  @Max(100, {message: ValidationErrors.PERCENTAGE_LOWER_THAN_100})
  @Fractions(0, 2, {message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS})
  percentage?: number

  @IsDefined({message: ValidationErrors.CHANNEL_REQUIRED})
  channel?: string

  @IsDefined({message: ValidationErrors.EVENT_REQUIRED})
  event?: string

  direction?: string

  @IsDefined({message: ValidationErrors.SERVICE_REQUIRED})
  service?: string

  @IsDefined({message: ValidationErrors.JURISDICTION1_REQUIRED})
  jurisdiction1?: string

  @IsDefined({message: ValidationErrors.JURISDICTION2_REQUIRED})
  jurisdiction2?: string

  constructor (code?: string, type?: string, amountType?: string) {
    this.code = code
    this.type = type
    this.amountType = amountType
  }

  static fromObject (value?: any): CreateFeeForm {
    if (!value) {
      return value
    }

    const code = value.code ? value.code : undefined
    const type = value.type ? value.type : undefined
    const amountType = value.amountType ? value.amountType : undefined

    return new CreateFeeForm(code, type, amountType)
  }
}
