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

    const createFeeDto = new CreateFixedFeeDto()
    createFeeDto.code = dto.feeCode
    createFeeDto.version = feeVersionDto
    createFeeDto.jurisdiction1 = dto.jurisdiction1
    createFeeDto.jurisdiction2 = dto.jurisdiction2
    createFeeDto.service = dto.service
    createFeeDto.channel = dto.channel
    createFeeDto.direction = dto.direction
    createFeeDto.event = dto.event
    createFeeDto.memo_line = dto.memoLine
    createFeeDto.fee_order_name = dto.feeOrderName
    createFeeDto.natural_account_code = dto.naturalAccountCode
    createFeeDto.unspecified_claim_amount = false
    createFeeDto.statutory_instrument = dto.statutoryInstrument
    createFeeDto.si_ref_id = dto.siRefId

    return createFeeDto
  }
}
