// tslint:disable
export class ChannelTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class DirectionTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class ApplicantTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class EventTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class Fee2Dto {
  code: string
  fee_type: String
  channel_type: ChannelType
  event_type: EventType
  jurisdiction1: Jurisdiction1
  jurisdiction2: Jurisdiction2
  service_type: ServiceType
  keyword: string
  applicant_type: ApplicantType
  fee_versions: FeeVersionDto[]
  current_version: FeeVersionDto
  min_range: number
  max_range: number
  unspecified_claim_amount: boolean
  range_unit: string
}

export class FeeTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class FeeVersionDto {
  version: number
  valid_from: Date
  valid_to: Date
  description: string
  reason_for_update: string
  reason_for_reject: string
  status: FeeVersionStatus
  flat_amount: FlatAmountDto
  percentage_amount: PercentageAmountDto
  amount_type: string
  volume_amount: VolumeAmountDto
  author: string
  /* READ ONLY */
  approvedBy: string
  /* READ ONLY */
  memo_line: string
  last_amending_si: string
  consolidated_fee_order_name: string
  natural_account_code: string
  statutory_instrument: string
  si_ref_id: string
  direction: string

  public getValidFrom () {
    return new Date(this.valid_from).toDateString
  }

  public getValidTo () {
    return new Date(this.valid_to).toDateString
  }

}

export class Jurisdiction1Dto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class Jurisdiction2Dto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class ReferenceDataErrorDto {
  message: string
}

export class ServiceTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class FlatAmountDto {
  amount: number
}

export class PercentageAmountDto {
  percentage: number
}

export class VolumeAmountDto {
  amount: number
}

export class FeeDto {
  code: string
  version: FeeVersionDto
  jurisdiction1: string
  jurisdiction2: string
  service: string
  channel: string
  event: string
  keyword: string
  fee_type: string
  applicant_type: string
  unspecified_claim_amount: boolean
}

export class FixedFeeDto extends FeeDto {
}

export class ReasonDto{
  reasonForReject: string
}

export class BandedFeeDto extends FixedFeeDto {

}

export class RelationalFeeDto extends FixedFeeDto {

}

export class RateableFeeDto extends FixedFeeDto {

}


export class RangedFeeDto extends FeeDto {
  min_range: number
  max_range: number
  range_unit: string
}

export class ChannelType {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class DirectionType {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class EventType {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class Jurisdiction1 {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class RangeUnit {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class Jurisdiction2 {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class ServiceType {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class ApplicantType {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class AllReferenceDataDto {
  channelTypes: ChannelTypeDto[]

  directionTypes: DirectionTypeDto[]

  eventTypes: EventTypeDto[]

  serviceTypes: ServiceTypeDto[]

  jurisdictions1: Jurisdiction1Dto[]

  jurisdictions2: Jurisdiction2Dto[]

  rangeUnits: RangeUnit[]

  applicantTypes: ApplicantTypeDto[]
}

export type FeeVersionStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected'
