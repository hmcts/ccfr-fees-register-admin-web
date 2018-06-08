import { FixedFeeDto, FeeVersionDto,
  FeeVersionStatus, FlatAmountDto, RangedFeeDto, PercentageAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class FeeMapper {

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

  toFeeVersionDto (dto): FeeVersionDto {
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

  toFixedFeeDto (dto): FixedFeeDto {

    const fixedFeeDto = new FixedFeeDto()
    fixedFeeDto.code = dto.feeCode
    fixedFeeDto.version = this.toFeeVersionDto(dto)
    fixedFeeDto.jurisdiction1 = dto.jurisdiction1
    fixedFeeDto.jurisdiction2 = dto.jurisdiction2
    fixedFeeDto.service = dto.service
    fixedFeeDto.channel = dto.channel
    fixedFeeDto.event = dto.event
    fixedFeeDto.fee_type = dto.feeType
    fixedFeeDto.applicant_type = dto.applicant_type
    fixedFeeDto.unspecified_claim_amount = false

    return fixedFeeDto
  }

  toRangedFeeDto (dto): RangedFeeDto {

    const rangedFeeDto = new RangedFeeDto()
    rangedFeeDto.code = dto.feeCode
    rangedFeeDto.version = this.toFeeVersionDto(dto)
    rangedFeeDto.jurisdiction1 = dto.jurisdiction1
    rangedFeeDto.jurisdiction2 = dto.jurisdiction2
    rangedFeeDto.service = dto.service
    rangedFeeDto.channel = dto.channel
    rangedFeeDto.event = dto.event
    rangedFeeDto.applicant_type = dto.applicant_type
    rangedFeeDto.fee_type = dto.feeType
    rangedFeeDto.unspecified_claim_amount = false
    rangedFeeDto.min_range = Number(dto.rangeFrom)
    rangedFeeDto.max_range = Number(dto.rangeTo)

    return rangedFeeDto
  }

}
