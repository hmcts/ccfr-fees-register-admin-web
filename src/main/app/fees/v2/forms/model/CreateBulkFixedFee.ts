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
    feeVersionDto.validFrom = new Date(dto.validFrom)
    feeVersionDto.validTo = new Date(dto.validTo)
    feeVersionDto.description = dto.feeDescription
    feeVersionDto.status = dto.feeStatus as FeeVersionStatus
    feeVersionDto.flatAmount = flatAmount

    const createFeeDto = new CreateFixedFeeDto()
    createFeeDto.code = dto.feeCode
    createFeeDto.version = feeVersionDto
    createFeeDto.jurisdiction1 = dto.jurisdiction1
    createFeeDto.jurisdiction2 = dto.jurisdiction2
    createFeeDto.service = dto.service
    createFeeDto.channel = dto.channel
    createFeeDto.direction = dto.direction
    createFeeDto.event = dto.event
    createFeeDto.memoLine = dto.memoLine
    createFeeDto.feeOrderName = dto.feeOrderName
    createFeeDto.naturalAccountCode = dto.naturalAccountCode
    createFeeDto.unspecifiedClaimAmount = false
    createFeeDto.statutoryInstrument = dto.statutoryInstrument
    createFeeDto.siRefId = dto.siRefId

    return createFeeDto
  }
}
