import { IsDefined, IsDate, Max, MaxLength, Min, ValidateIf, IsOptional, Matches } from 'class-validator'
import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { Fractions } from 'app/forms/validation/validators/fractions'
import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'
import {
  FeeDto, FixedFeeDto, RangedFeeDto,
  FeeVersionDto, FlatAmountDto, PercentageAmountDto, VolumeAmountDto
} from 'fees/v2/model/fees-register-api-contract'

const moment = require('moment')
const serviceMsg = { message: ValidationErrors.SERVICE_REQUIRED }
const jurisdictionOneMsg = { message: ValidationErrors.JURISDICTION1_REQUIRED }
const typeMsg = { message: ValidationErrors.TYPE_REQUIRED }
const jurisdictionTwoMsg = { message: ValidationErrors.JURISDICTION2_REQUIRED }
const eventMsg = { message: ValidationErrors.EVENT_REQUIRED }
const chennalMsg = { message: ValidationErrors.CHANNEL_REQUIRED }
const applicationTypeMsg = { message: ValidationErrors.APPLICATION_TYPE_REQUIRED }
const directionMsg = { message: ValidationErrors.DIRECTION_REQUIRED }
const fromDateMsg = { message: ValidationErrors.FROM_DATE_REQUIRED }
const reasonForUpdateMsg = { message: ValidationErrors.REASON_FOR_UPDATE_REQUIRED }
const descriptionMsg = { message: ValidationErrors.DESCRIPTION_REQUIRED }
const amountNotNegMsg = { message: ValidationErrors.AMOUNT_NOT_NEGATIVE }
const amountTooBigMsg = { message: ValidationErrors.AMOUNT_TOO_BIG }
const amountInvalidMsg = { message: ValidationErrors.AMOUNT_INVALID_DECIMALS }
export class CreateFeeForm {
  code?: string
  reasonForReject?: string
  approvedBy?: string

  @IsDefined(reasonForUpdateMsg)
  @IsNotBlank(reasonForUpdateMsg)
  reasonForUpdate?: string

  @IsDefined(descriptionMsg)
  @IsNotBlank(descriptionMsg)
  @MaxLength(2000, { message: ValidationErrors.DESCRIPTION_TOO_LONG })
  description?: string

  statutoryInstrument?: string

  siRefId?: string

  @IsDefined({ message: ValidationErrors.LAST_AMENDING_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.LAST_AMENDING_REQUIRED })
  @MaxLength(255, { message: ValidationErrors.LAST_AMENDING_TOO_LONG })
  lastAmendingSi?: string

  @IsDefined({ message: ValidationErrors.CONSOLIDATE_ORIGINAL_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.CONSOLIDATE_ORIGINAL_REQUIRED })
  @MaxLength(1000, { message: ValidationErrors.CONSOLIDATE_ORIGINAL_TOO_LONG })
  consolidatedFeeOrderName?: string

  @IsDefined(serviceMsg)
  @IsNotBlank(serviceMsg)
  service?: string

  @IsDefined(jurisdictionOneMsg)
  @IsNotBlank(jurisdictionOneMsg)
  jurisdiction1?: string

  @IsDefined(jurisdictionTwoMsg)
  @IsNotBlank(jurisdictionTwoMsg)
  jurisdiction2?: string

  @IsDefined(typeMsg)
  @IsNotBlank(typeMsg)
  type?: string

  @IsDefined(typeMsg)
  @IsNotBlank(typeMsg)
  amountType?: string

  @IsDefined(eventMsg)
  @IsNotBlank(eventMsg)
  event?: string

  @IsDefined(chennalMsg)
  @IsNotBlank(chennalMsg)
  channel?: string

  @IsOptional()
  @Matches(/^([a-zA-Z0-9-]*)$/, {
    message: ValidationErrors.ALPHA_NUMERIC_WITH_HYPHEN
  })
  keyword?: string

  @IsDefined(applicationTypeMsg)
  @IsNotBlank(applicationTypeMsg)
  applicantType?: string

  @IsDefined(directionMsg)
  @IsNotBlank(directionMsg)
  direction?: string

  @MaxLength(2000, { message: ValidationErrors.MEMO_LINE_TOO_LONG })
  @IsDefined({ message: ValidationErrors.MEMO_LINE_REQUIRED })
  memoLine?: string

  @IsDefined(fromDateMsg)
  @IsNotBlank(fromDateMsg)
  @IsDate({ message: ValidationErrors.DATE_INVALID_REQUIRED })
  fromDate?: Date
  
  @ValidateIf(o => o.toDate !== '')
  @IsDate({ message: ValidationErrors.DATE_INVALID_REQUIRED })
  toDate?: Date

  @IsDefined({ message: ValidationErrors.NAC_REQUIRED })
  naturalAccountCode?: string

  @ValidateIf(o => o.type === 'ranged')
  @Min(0, amountNotNegMsg)
  @Max(9999999.99, amountTooBigMsg)
  @Fractions(0, 2, amountInvalidMsg)
  fromRange?: number

  @ValidateIf(o => o.type === 'ranged' && o.toRange)
  @Min(0, amountNotNegMsg)
  @Max(9999999.99, amountTooBigMsg)
  @Fractions(0, 2, amountInvalidMsg)
  toRange?: number

  @ValidateIf(o => o.type === 'ranged')
  @IsDefined({ message: ValidationErrors.RANGE_UNIT_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.RANGE_UNIT_REQUIRED })
  rangeUnit?: string

  @ValidateIf(o => o.amountType === 'flat')
  @Min(0, amountNotNegMsg)
  @Max(9999999.99, amountTooBigMsg)
  @Fractions(0, 2, amountInvalidMsg)
  amount?: number

  @ValidateIf(o => o.amountType === 'percentage')
  @Min(0.01, { message: ValidationErrors.PERCENTAGE_GREATER_THAN_0 })
  @Max(100, { message: ValidationErrors.PERCENTAGE_LOWER_THAN_100 })
  @Fractions(0, 2, { message: ValidationErrors.PERCENTAGE_INVALID_DECIMALS })
  percentage?: number

  @ValidateIf(o => o.amountType === 'volume')
  @Min(0, amountNotNegMsg)
  @Max(9999999.99, amountTooBigMsg)
  @Fractions(0, 2, amountInvalidMsg)
  volAmount?: number

  edit: boolean

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
    this.reasonForUpdate = ''
    this.jurisdiction1 = ''
    this.jurisdiction2 = ''
    this.rangeUnit = ''
    this.applicantType = ''
    this.edit = false
    this.keyword = null
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
    form.reasonForReject = (form as any).reason_for_reject
    form.approvedBy = (form as any).approvedBy

    form.service = (form as any).service_type.name
    form.jurisdiction1 = (form as any).jurisdiction1.name
    form.jurisdiction2 = (form as any).jurisdiction2.name
    form.memoLine = (form as any).memo_line
    form.reasonForUpdate = (form as any).reason_for_update
    form.naturalAccountCode = (form as any).natural_account_code
    form.siRefId = (form as any).si_ref_id
    form.keyword = (form as any).keyword
    form.lastAmendingSi = (form as any).last_amending_si
    form.consolidatedFeeOrderName = (form as any).consolidated_fee_order_name
    form.statutoryInstrument = (form as any).statutory_instrument
    form.fromRange = (form as any).min_range
    form.toRange = (form as any).max_range
    form.type = (form as any).fee_type
    if (form.type === 'ranged') {
      form.rangeUnit = (form as any).range_unit
    }
    if(feeVersionInfo.valid_to !== undefined) {
      form.toDate = moment((form as any).valid_to).format('YYYY-MM-DD')
    }
    if(feeVersionInfo.valid_from !== undefined) {
      form.fromDate = moment((form as any).valid_from).format('YYYY-MM-DD')
    }
 

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

    if (form.volAmount) {
      form.amount = +form.volAmount
      form.volAmount = +form.volAmount
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
    dto.keyword = this.keyword !== '' ? this.keyword : null
    dto.applicant_type = this.applicantType

    dto.version = new FeeVersionDto()
    dto.version.direction = this.direction
    dto.version.memo_line = this.memoLine

    dto.version.natural_account_code = this.naturalAccountCode
    dto.version.statutory_instrument = this.statutoryInstrument
    dto.version.reason_for_update = this.reasonForUpdate !== '' ? this.reasonForUpdate : null

    dto.version.si_ref_id = this.siRefId
    dto.version.reason_for_reject = this.reasonForReject
    dto.version.approvedBy = this.approvedBy
    dto.version.last_amending_si = this.lastAmendingSi
    dto.version.consolidated_fee_order_name = this.consolidatedFeeOrderName

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
