import { IsDefined, Max, MaxLength, Min, ValidateIf } from 'class-validator'

import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { Fractions } from 'app/forms/validation/validators/fractions'

const moment = require('moment')

import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'
import {
  FeeDto, FixedFeeDto, RangedFeeDto,
  FeeVersionDto, FlatAmountDto, PercentageAmountDto, VolumeAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class CreateFeeForm {
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

  @MaxLength(2000, {message: ValidationErrors.MEMO_LINE_TOO_LONG})
  @IsDefined({message: ValidationErrors.MEMO_LINE_REQUIRED})
  memoLine?: string

  @ValidateIf(o => o.amountType === 'flat')
  @Min(0, {message: ValidationErrors.AMOUNT_NOT_NEGATIVE})
  @Max(9999999.99, {message: ValidationErrors.AMOUNT_TOO_BIG})
  @Fractions(0, 2, {message: ValidationErrors.AMOUNT_INVALID_DECIMALS})
  amount?: number

  @ValidateIf(o => o.type === 'ranged')
  @Min(0, {message: ValidationErrors.AMOUNT_NOT_NEGATIVE})
  @Max(9999999.99, {message: ValidationErrors.AMOUNT_TOO_BIG})
  @Fractions(0, 2, {message: ValidationErrors.AMOUNT_INVALID_DECIMALS})
  fromRange?: number

  @ValidateIf(o => o.type === 'ranged' && o.toRange)
  @Min(0, {message: ValidationErrors.AMOUNT_NOT_NEGATIVE})
  @Max(9999999.99, {message: ValidationErrors.AMOUNT_TOO_BIG})
  @Fractions(0, 2, {message: ValidationErrors.AMOUNT_INVALID_DECIMALS})
  toRange?: number

  @ValidateIf(o => o.type === 'ranged')
  @IsDefined({message: ValidationErrors.RANGE_UNIT_REQUIRED})
  @IsNotBlank({message: ValidationErrors.RANGE_UNIT_REQUIRED})
  rangeUnit?: string

  @ValidateIf(o => o.amountType === 'percentage')
  @Min(0.01, {message: ValidationErrors.PERCENTAGE_GREATER_THAN_0})
  @Max(100, {message: ValidationErrors.PERCENTAGE_LOWER_THAN_100})
  @Fractions(0, 2, {message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS})
  percentage?: number

  @IsDefined({message: ValidationErrors.CHANNEL_REQUIRED})
  @IsNotBlank({message: ValidationErrors.CHANNEL_REQUIRED})
  channel?: string

  @IsDefined({message: ValidationErrors.EVENT_REQUIRED})
  @IsNotBlank({message: ValidationErrors.EVENT_REQUIRED})
  event?: string

  @IsDefined({message: ValidationErrors.DIRECTION_REQUIRED})
  @IsNotBlank({message: ValidationErrors.DIRECTION_REQUIRED})
  direction?: string

  @IsDefined({message: ValidationErrors.APPLICATION_TYPE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.APPLICATION_TYPE_REQUIRED})
  applicantType?: string

  @IsDefined({message: ValidationErrors.SERVICE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.SERVICE_REQUIRED})
  service?: string

  @IsDefined({message: ValidationErrors.JURISDICTION1_REQUIRED})
  @IsNotBlank({message: ValidationErrors.JURISDICTION1_REQUIRED})
  jurisdiction1?: string

  @IsDefined({message: ValidationErrors.JURISDICTION2_REQUIRED})
  @IsNotBlank({message: ValidationErrors.JURISDICTION2_REQUIRED})
  jurisdiction2?: string

  @IsDefined({message: ValidationErrors.NAC_REQUIRED})
  naturalAccountCode?: string

  @IsDefined({message: ValidationErrors.FROM_DATE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.FROM_DATE_REQUIRED})
  fromDate?: Date

  toDate?: Date

  edit: boolean

  statutoryInstrument?: string

  siRefId?: string

  @IsDefined({message: ValidationErrors.FEE_ORDER_NAME_REQUIRED})
  feeOrderName?: string

  constructor () {
    this.code = null
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
    this.rangeUnit = ''
    this.applicantType = ''
    this.edit = false
  }

  static fromGivenVersion (fee: any, version: any, isEdit: boolean): CreateFeeForm {
    const form: CreateFeeForm = new CreateFeeForm()
    form.edit = isEdit
    const feeVersionInfo: any = fee.fee_versions.find(ver => ver.version === +version)
    Object.keys(fee).forEach(key => form[key] = fee[key])
    Object.keys(feeVersionInfo).forEach(key => form[key] = feeVersionInfo[key])

    form.applicantType = (form as any).applicant_type.name
    form.channel = (form as any).channel_type.name
    form.event = (form as any).event_type.name
    if (feeVersionInfo.flat_amount) {
      form.amount = feeVersionInfo.flat_amount.amount
      form.amountType = 'flat'
    }
    if (feeVersionInfo.volume_amount) {
      form.amount = feeVersionInfo.volume_amount.amount
      form.amountType = 'volume'
    }
    if ((form as any).percentage_amount) {
      form.percentage = (form as any).percentage_amount.percentage
      form.amountType = 'percentage'
    }
    form.service = (form as any).service_type.name
    form.jurisdiction1 = (form as any).jurisdiction1.name
    form.jurisdiction2 = (form as any).jurisdiction2.name
    form.memoLine = (form as any).memo_line
    form.naturalAccountCode = (form as any).natural_account_code
    form.siRefId = (form as any).si_ref_id
    form.feeOrderName = (form as any).fee_order_name
    form.statutoryInstrument = (form as any).statutory_instrument
    form.fromRange = (form as any).min_range
    form.toRange = (form as any).max_range
    form.type = (form as any).fee_type
    if (form.type === 'ranged') {
      form.rangeUnit = (form as any).range_unit
    }
    form.fromDate = moment((form as any).valid_from).format('YYYY-MM-DD')
    form.toDate = moment((form as any).valid_to).format('YYYY-MM-DD')

    return form
  }

  static fromObject (value?: any): CreateFeeForm {

    if (!value) {
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

    if (form.edit) {
      form.edit = (form.edit as any) === 'true'
    }

    return form
  }

  toDto (): FeeDto {

    if (this.type === 'ranged') {
      const dto = new RangedFeeDto()
      dto.max_range = this.toRange
      dto.min_range = this.fromRange
      dto.range_unit = this.rangeUnit

      return this.fillCommon(dto)
    }
    return this.fillCommon(new FixedFeeDto())
  }

  private fillCommon (dto: FeeDto): FeeDto {

    dto.code = this.code !== '' ? this.code : null

    dto.channel = this.channel
    dto.service = this.service
    dto.jurisdiction1 = this.jurisdiction1
    dto.jurisdiction2 = this.jurisdiction2
    dto.event = this.event
    dto.applicant_type = this.applicantType

    dto.version = new FeeVersionDto()
    dto.version.direction = this.direction
    dto.version.memo_line = this.memoLine

    dto.version.natural_account_code = this.naturalAccountCode
    dto.version.statutory_instrument = this.statutoryInstrument
    dto.version.si_ref_id = this.siRefId
    dto.version.fee_order_name = this.feeOrderName
    dto.version.description = this.description

    if (this.fromDate) {
      dto.version.valid_from = this.fromDate
    }

    if (this.toDate) {
      dto.version.valid_to = this.toDate
    }

    switch (this.amountType) {

      case 'flat' :
        dto.version.flat_amount = new FlatAmountDto()
        dto.version.flat_amount.amount = this.amount
        break
      case 'percentage' :
        dto.version.percentage_amount = new PercentageAmountDto()
        dto.version.percentage_amount.percentage = this.percentage
        break
      case 'volume' :
        dto.version.volume_amount = new VolumeAmountDto()
        dto.version.volume_amount.amount = this.amount
        break
    }

    return dto
  }

}
