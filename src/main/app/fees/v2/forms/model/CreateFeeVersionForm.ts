import { IsDefined, Max, MaxLength, Min, ValidateIf } from 'class-validator'

import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { Fractions } from 'app/forms/validation/validators/fractions'

const moment = require('moment')

import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'
import {
  FeeVersionDto, FlatAmountDto, PercentageAmountDto, VolumeAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class CreateFeeVersionForm {
  @IsDefined({ message: ValidationErrors.TYPE_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.TYPE_REQUIRED })
  amountType?: string

  @IsDefined({ message: ValidationErrors.DESCRIPTION_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.DESCRIPTION_REQUIRED })
  @MaxLength(2000, { message: ValidationErrors.DESCRIPTION_TOO_LONG })
  description?: string

  @MaxLength(2000, { message: ValidationErrors.MEMO_LINE_TOO_LONG })
  @IsDefined({ message: ValidationErrors.MEMO_LINE_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.MEMO_LINE_REQUIRED })
  memoLine?: string

  @ValidateIf(o => o.amountType === 'flat')
  @Min(0, { message: ValidationErrors.AMOUNT_NOT_NEGATIVE })
  @Max(9999999.99, { message: ValidationErrors.AMOUNT_TOO_BIG })
  @Fractions(0, 2, { message: ValidationErrors.AMOUNT_INVALID_DECIMALS })
  amount?: number

  @ValidateIf(o => o.amountType === 'percentage')
  @Min(0.01, { message: ValidationErrors.PERCENTAGE_GREATER_THAN_0 })
  @Max(100, { message: ValidationErrors.PERCENTAGE_LOWER_THAN_100 })
  @Fractions(0, 2, { message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS })
  percentage?: number

  @IsDefined({ message: ValidationErrors.DIRECTION_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.DIRECTION_REQUIRED })
  direction?: string

  @IsDefined({ message: ValidationErrors.NAC_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.NAC_REQUIRED })
  naturalAccountCode?: string

  @IsDefined({ message: ValidationErrors.FROM_DATE_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.FROM_DATE_REQUIRED })
  fromDate?: Date

  toDate?: Date

  statutoryInstrument?: string

  siRefId?: string

  @IsDefined({ message: ValidationErrors.FEE_ORDER_NAME_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.FEE_ORDER_NAME_REQUIRED })
  feeOrderName?: string

  constructor () {
    this.amountType = 'flat'
    this.description = ''
    this.memoLine = ''
    this.direction = ''
  }

  static fromObject (value?: any): CreateFeeVersionForm {

    if (!value) {
      return new CreateFeeVersionForm()
    }

    const form: CreateFeeVersionForm = new CreateFeeVersionForm()
    Object.keys(value).forEach(key => form[key] = value[key])

    if (form.amount) {
      form.amount = +form.amount
    }

    if (value.flat_amount) {
      form.amount = value.flat_amount.amount
      form.amountType = 'flat'
    }
    if (value.volume_amount) {
      form.amount = value.volume_amount.amount
      form.amountType = 'volume'
    }
    if (value.percentage_amount) {
      form.percentage = value.percentage_amount.percentage
      form.amountType = 'percentage'
    }
    if (value.memo_line) {
      form.memoLine = value.memo_line
    }
    if (value.natural_account_code) {
      form.naturalAccountCode = value.natural_account_code
    }
    if (value.fee_order_name) {
      form.feeOrderName = value.fee_order_name
    }
    if (value.statutory_instrument) {
      form.statutoryInstrument = value.statutory_instrument
    }
    if (value.si_ref_id) {
      form.siRefId = value.si_ref_id
    }
    if (value.valid_from) {
      form.fromDate = moment(value.valid_from).format('YYYY-MM-DD')
    }
    if (value.valid_to) {
      form.toDate = moment(value.valid_to).format('YYYY-MM-DD')
    }

    return form
  }

  toDto (): FeeVersionDto {
    return this.fillCommon(new FeeVersionDto())
  }

  private fillCommon (dto: FeeVersionDto): FeeVersionDto {

    dto = new FeeVersionDto()
    dto.version = null
    dto.status = 'draft'
    dto.direction = this.direction
    dto.memo_line = this.memoLine

    dto.natural_account_code = this.naturalAccountCode
    dto.statutory_instrument = this.statutoryInstrument
    dto.si_ref_id = this.siRefId
    dto.fee_order_name = this.feeOrderName
    dto.description = this.description

    if (this.fromDate) {
      dto.valid_from = this.fromDate
    }

    if (this.toDate) {
      dto.valid_to = this.toDate
    }

    switch (this.amountType) {

      case 'flat' :
        dto.flat_amount = new FlatAmountDto()
        dto.flat_amount.amount = this.amount
        break
      case 'percentage' :
        dto.percentage_amount = new PercentageAmountDto()
        dto.percentage_amount.percentage = this.percentage
        break
      case 'volume' :
        dto.volume_amount = new VolumeAmountDto()
        dto.volume_amount.amount = this.amount
        break
    }

    return dto
  }

}
