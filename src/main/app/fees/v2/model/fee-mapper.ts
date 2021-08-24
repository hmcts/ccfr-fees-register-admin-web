import {
  FixedFeeDto, FeeVersionDto,
  FeeVersionStatus, FlatAmountDto, RangedFeeDto, PercentageAmountDto, VolumeAmountDto
} from 'fees/v2/model/fees-register-api-contract'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'

export class FeeMapper {

  toFeeVersionDto (dto: CsvFeeDto): FeeVersionDto {
    let flatAmount = new FlatAmountDto()
    let percentageAmount = new PercentageAmountDto()
    let volumeAmount = new VolumeAmountDto()
    if (dto.amountType === 'flat') {
      flatAmount.amount = Number(dto.feeAmount)
      percentageAmount = null
      volumeAmount = null
    } else if (dto.amountType === '%' || dto.amountType === 'percentage') {
      percentageAmount.percentage = Number(dto.feeAmount)
      flatAmount = null
      volumeAmount = null
    } else if (dto.amountType === 'volume') {
      volumeAmount.amount = Number(dto.feeAmount)
      flatAmount = null
      percentageAmount = null
    }

    const feeVersionDto = new FeeVersionDto()
    feeVersionDto.version = Number(dto.feeVersion)
    feeVersionDto.valid_from = new Date(dto.validFrom)
    feeVersionDto.valid_to = new Date(dto.validTo)
    feeVersionDto.description = dto.feeDescription
    feeVersionDto.status = dto.feeStatus as FeeVersionStatus
    feeVersionDto.flat_amount = flatAmount
    feeVersionDto.percentage_amount = percentageAmount
    feeVersionDto.volume_amount = volumeAmount
    feeVersionDto.amount_type = dto.amountType
    feeVersionDto.direction = dto.direction
    feeVersionDto.memo_line = dto.memoLine
    feeVersionDto.reason_for_update = dto.reasonForUpdate
    feeVersionDto.last_amending_si = dto.lastAmendingSi
    feeVersionDto.consolidated_fee_order_name = dto.consolidatedFeeOrderName
    feeVersionDto.natural_account_code = dto.naturalAccountCode
    feeVersionDto.statutory_instrument = dto.statutoryInstrument
    feeVersionDto.si_ref_id = dto.siRefId

    return feeVersionDto

  }

  toFixedFeeDto (dto: CsvFeeDto): FixedFeeDto {

    const fixedFeeDto = new FixedFeeDto()
    fixedFeeDto.code = dto.feeCode
    fixedFeeDto.version = this.toFeeVersionDto(dto)
    fixedFeeDto.jurisdiction1 = dto.jurisdiction1
    fixedFeeDto.jurisdiction2 = dto.jurisdiction2
    fixedFeeDto.service = dto.service
    fixedFeeDto.channel = dto.channel
    fixedFeeDto.event = dto.event
    fixedFeeDto.keyword = dto.keyword !== '' ? dto.keyword : null
    fixedFeeDto.fee_type = dto.feeType
    fixedFeeDto.applicant_type = dto.applicantType
    fixedFeeDto.unspecified_claim_amount = false

    return fixedFeeDto
  }

  toRangedFeeDto (dto: CsvFeeDto): RangedFeeDto {

    const rangedFeeDto = new RangedFeeDto()
    rangedFeeDto.code = dto.feeCode
    rangedFeeDto.version = this.toFeeVersionDto(dto)
    rangedFeeDto.jurisdiction1 = dto.jurisdiction1
    rangedFeeDto.jurisdiction2 = dto.jurisdiction2
    rangedFeeDto.service = dto.service
    rangedFeeDto.channel = dto.channel
    rangedFeeDto.event = dto.event
    rangedFeeDto.keyword = dto.keyword !== '' ? dto.keyword : null
    rangedFeeDto.applicant_type = dto.applicantType
    rangedFeeDto.fee_type = dto.feeType
    rangedFeeDto.unspecified_claim_amount = false
    rangedFeeDto.min_range = Number(dto.rangeFrom)
    rangedFeeDto.max_range = Number(dto.rangeTo)

    return rangedFeeDto
  }

}
