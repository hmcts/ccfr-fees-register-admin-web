import {
  CreateFeeDto, CreateFixedFeeDto, FeeVersionDto,
  FeeVersionStatus, FlatAmountDto
} from 'fees/v2/model/fees-register-api-contract'

export class CreateBulkFixedFee {

  code?: string

  // Flat amount
  amount?: number
  // Fee version
  version?: number
  validFrom?: Date
  validTo?: Date
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
  unspecifiedAmount?: boolean
  statutoryInstrument?: string
  siRefId?: string

  createFixedFeeDto (dto): CreateFeeDto {
    const flatAmount = new FlatAmountDto()
    flatAmount.amount = Number(dto.feeAmount)

    const feeVersionDto = new FeeVersionDto()
    feeVersionDto.version = Number(dto.feeVersion)
    feeVersionDto.valid_from = new Date(dto.validFrom)
    feeVersionDto.valid_to = new Date(dto.validTo)
    feeVersionDto.description = dto.feeDescription
    feeVersionDto.status = dto.feeStatus as FeeVersionStatus
    feeVersionDto.flat_amount = flatAmount
    feeVersionDto.direction = dto.direction
    feeVersionDto.memo_line = dto.memoLine
    feeVersionDto.fee_order_name = dto.feeOrderName
    feeVersionDto.natural_account_code = dto.naturalAccountCode
    feeVersionDto.statutory_instrument = dto.statutoryInstrument
    feeVersionDto.si_ref_id = dto.siRefId

    const createFeeDto = new CreateFixedFeeDto()
    createFeeDto.code = dto.feeCode
    createFeeDto.version = feeVersionDto
    createFeeDto.jurisdiction1 = dto.jurisdiction1
    createFeeDto.jurisdiction2 = dto.jurisdiction2
    createFeeDto.service = dto.service
    createFeeDto.channel = dto.channel
    createFeeDto.event = dto.event
    createFeeDto.applicant_type = dto.applicant_type
    createFeeDto.unspecified_claim_amount = false

    return createFeeDto
  }
}
