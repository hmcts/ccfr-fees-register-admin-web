import { FixedFeeDto, FeeVersionDto,
  FeeVersionStatus, FlatAmountDto, RangedFeeDto, PercentageAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class CreateFeeFromCsv {

  code?: string

  // Flat amount
  amount?: number
  // Fee version
  version?: number
  validFrom?: Date
  validTo?: Date
  rangeFrom?: number
  rangeTo?: number
  description?: string
  status?: FeeVersionStatus
  applicantType?: string
  channel?: string
  direction?: string
  event?: string
  jurisdiction1?: string
  jurisdiction2?: string
  service?: string
  memoLine?: string
  feeOrderName?: string
  naturalAccountCode?: string
  feeType?: string
  unspecifiedAmount?: boolean
  statutoryInstrument?: string
  siRefId?: string

  createFeeVersionDto (dto): FeeVersionDto {
    let flatAmount = new FlatAmountDto()
    let percentageAmount = new PercentageAmountDto()
    if (dto.amountType === 'flat') {
      flatAmount.amount = Number(dto.feeAmount)
      percentageAmount = null
    } else if (dto.amountType === '%' || dto.amountType === 'percentage') {
      percentageAmount.percentage = Number(dto.feeAmount)
      flatAmount = null
    }

    const feeVersionDto = new FeeVersionDto()
    feeVersionDto.version = Number(dto.feeVersion)
    feeVersionDto.valid_from = new Date(dto.validFrom)
    feeVersionDto.valid_to = new Date(dto.validTo)
    feeVersionDto.description = dto.feeDescription
    feeVersionDto.status = dto.feeStatus as FeeVersionStatus
    feeVersionDto.flat_amount = flatAmount
    feeVersionDto.percentage_amount = percentageAmount
    feeVersionDto.amount_type = dto.amountType
    feeVersionDto.direction = dto.direction
    feeVersionDto.memo_line = dto.memoLine
    feeVersionDto.fee_order_name = dto.feeOrderName
    feeVersionDto.natural_account_code = dto.naturalAccountCode
    feeVersionDto.statutory_instrument = dto.statutoryInstrument
    feeVersionDto.si_ref_id = dto.siRefId

    return feeVersionDto

  }

  createFixedFeeDto (dto): FixedFeeDto {

    const createFixedFeeDto = new FixedFeeDto()
    createFixedFeeDto.code = dto.feeCode
    createFixedFeeDto.version = this.createFeeVersionDto(dto)
    createFixedFeeDto.jurisdiction1 = dto.jurisdiction1
    createFixedFeeDto.jurisdiction2 = dto.jurisdiction2
    createFixedFeeDto.service = dto.service
    createFixedFeeDto.channel = dto.channel
    createFixedFeeDto.event = dto.event
    createFixedFeeDto.fee_type = dto.feeType
    createFixedFeeDto.applicant_type = dto.applicant_type
    createFixedFeeDto.unspecified_claim_amount = false

    return createFixedFeeDto
  }

  createRangedFeeDto (dto): RangedFeeDto {

    const createRangedFeeDto = new RangedFeeDto()
    createRangedFeeDto.code = dto.feeCode
    createRangedFeeDto.version = this.createFeeVersionDto(dto)
    createRangedFeeDto.jurisdiction1 = dto.jurisdiction1
    createRangedFeeDto.jurisdiction2 = dto.jurisdiction2
    createRangedFeeDto.service = dto.service
    createRangedFeeDto.channel = dto.channel
    createRangedFeeDto.event = dto.event
    createRangedFeeDto.applicant_type = dto.applicant_type
    createRangedFeeDto.fee_type = dto.feeType
    createRangedFeeDto.unspecified_claim_amount = false
    createRangedFeeDto.min_range = Number(dto.rangeFrom)
    createRangedFeeDto.max_range = Number(dto.rangeTo)

    return createRangedFeeDto
  }

}
