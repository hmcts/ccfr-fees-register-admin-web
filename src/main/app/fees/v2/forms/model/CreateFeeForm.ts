import { IsDefined, Matches, Max, MaxLength, Min, ValidateIf } from 'class-validator'

import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { Fractions } from 'app/forms/validation/validators/fractions'
import { IsUnique } from 'app/forms/validation/validators/isUnique'

import { FeesClient } from 'app/fees/v2/feesClient'

import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'
import {
  CreateFeeDto, CreateFixedFeeDto, CreateRangedFeeDto,
  FeeVersionDto, FlatAmountDto, PercentageAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class CreateFeeForm {
  @IsDefined ( { message: ValidationErrors.CODE_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.CODE_REQUIRED } )
  @MaxLength ( 50, { message: ValidationErrors.CODE_TOO_LONG } )
  @Matches ( /[A-Za-z0-9_-]+/, { message: ValidationErrors.CODE_INVALID_CHARACTERS } )
  @IsUnique ( ( value ) => FeesClient.checkFeeExists ( value ).then ( ( exists ) => !exists ), { message: ValidationErrors.CODE_EXISTS } )
  code?: string

  @IsDefined ( { message: ValidationErrors.TYPE_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.TYPE_REQUIRED } )
  type?: string

  @IsDefined ( { message: ValidationErrors.TYPE_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.TYPE_REQUIRED } )
  amountType?: string

  @IsDefined ( { message: ValidationErrors.DESCRIPTION_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.DESCRIPTION_REQUIRED } )
  @MaxLength ( 2000, { message: ValidationErrors.DESCRIPTION_TOO_LONG } )
  description?: string

  @MaxLength ( 2000, { message: ValidationErrors.DESCRIPTION_TOO_LONG } )
  memoLine?: string

  @ValidateIf ( o => o.amountType === 'fixed' )
  @Min ( 0, { message: ValidationErrors.AMOUNT_NOT_NEGATIVE } )
  @Max ( 9999999.99, { message: ValidationErrors.AMOUNT_TOO_BIG } )
  @Fractions ( 0, 2, { message: ValidationErrors.AMOUNT_INVALID_DECIMALS } )
  amount?: number

  @ValidateIf ( o => o.type === 'ranged' )
  @Min ( 0, { message: ValidationErrors.AMOUNT_NOT_NEGATIVE } )
  @Max ( 9999999.99, { message: ValidationErrors.AMOUNT_TOO_BIG } )
  @Fractions ( 0, 2, { message: ValidationErrors.AMOUNT_INVALID_DECIMALS } )
  fromRange?: number

  @ValidateIf ( o => o.type === 'ranged' )
  @Min ( 0, { message: ValidationErrors.AMOUNT_NOT_NEGATIVE } )
  @Max ( 9999999.99, { message: ValidationErrors.AMOUNT_TOO_BIG } )
  @Fractions ( 0, 2, { message: ValidationErrors.AMOUNT_INVALID_DECIMALS } )
  toRange?: number

  @ValidateIf ( o => o.amountType === 'percentage' )
  @Min ( 0.01, { message: ValidationErrors.PERCENTAGE_GREATER_THAN_0 } )
  @Max ( 100, { message: ValidationErrors.PERCENTAGE_LOWER_THAN_100 } )
  @Fractions ( 0, 2, { message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS } )
  percentage?: number

  @IsDefined ( { message: ValidationErrors.CHANNEL_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.CHANNEL_REQUIRED } )
  channel?: string

  @IsDefined ( { message: ValidationErrors.EVENT_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.EVENT_REQUIRED } )
  event?: string

  direction?: string

  @IsDefined ( { message: ValidationErrors.SERVICE_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.SERVICE_REQUIRED } )
  service?: string

  @IsDefined ( { message: ValidationErrors.JURISDICTION1_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.JURISDICTION1_REQUIRED } )
  jurisdiction1?: string

  @IsDefined ( { message: ValidationErrors.JURISDICTION2_REQUIRED } )
  @IsNotBlank ( { message: ValidationErrors.JURISDICTION2_REQUIRED } )
  jurisdiction2?: string

  naturalAccountCode?: string

  fromDate?: Date

  toDate?: Date

  statutoryInstrument?: string

  siRefId?: string

  feeOrderName?: string

  constructor () {
    this.code = ''
    this.type = 'fixed'
    this.amountType = 'flat'
    this.description = ''
    this.memoLine = ''
    this.service = ''
    this.event = ''
    this.channel = ''
    this.direction = ''
    this.jurisdiction1 = ''
    this.jurisdiction2 = ''
  }

  static fromObject ( value?: any ): CreateFeeForm {

    if ( !value ) {
      return new CreateFeeForm()
    }

    const form: CreateFeeForm = new CreateFeeForm()
    Object.keys(value).forEach(key => form[key] = value[key])

    if (form.amount) {
      form.amount = +form.amount
    }

    if (form.fromRange) {
      form.fromRange = +form.fromRange
    }

    if (form.toRange) {
      form.toRange = +form.toRange
    }

    if (form.percentage) {
      form.percentage = +form.percentage
    }

    return form
  }

  toDto (): CreateFeeDto {

    if ( this.type === 'ranged' ) {
      const dto = new CreateRangedFeeDto ()
      dto.maxRange = this.toRange
      dto.minRange = this.fromRange
      return this.fillCommon(dto)
    }
    return this.fillCommon(new CreateFixedFeeDto())
  }

  private fillCommon ( dto: CreateFeeDto ): CreateFeeDto {

    dto.code = this.code

    dto.channel = this.channel
    dto.service = this.service
    dto.jurisdiction1 = this.jurisdiction1
    dto.jurisdiction2 = this.jurisdiction2
    dto.event = this.event
    dto.direction = this.direction
    dto.memoLine = this.memoLine

    dto.naturalAccountCode = this.naturalAccountCode
    dto.statutoryInstrument = this.statutoryInstrument
    dto.siRefId = this.siRefId
    dto.feeOrderName = this.feeOrderName

    dto.version = new FeeVersionDto()
    dto.version.description = this.description

    if (this.fromDate) {
      dto.version.validFrom = this.fromDate
    }

    if (this.toDate) {
      dto.version.validTo = this.toDate
    }

    if (this.amountType === 'flat') {
      dto.version.flatAmount = new FlatAmountDto()
      dto.version.flatAmount.amount = this.amount
    } else if (this.amountType === 'percentage') {
      dto.version.percentageAmount = new PercentageAmountDto()
      dto.version.percentageAmount.percentage = this.percentage
    }

    return dto
  }

}
