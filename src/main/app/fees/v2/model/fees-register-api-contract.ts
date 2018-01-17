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

export class EventTypeDto {
  name: string
  creationTime: Date
  lastUpdated: Date
}

export class Fee2Dto {
  code: string
  fee_type: String
  memo_line: string
  channel_type: ChannelType
  direction_type: DirectionType
  event_type: EventType
  jurisdiction1: Jurisdiction1
  jurisdiction2: Jurisdiction2
  service_type: ServiceType
  natural_account_code: string
  fee_order_name: string
  fee_versions: FeeVersionDto[]
  current_version: FeeVersionDto
  min_range: number
  max_range: number
  unspecified_claim_amount: boolean
  range_unit: string
  statutory_instrument: String
  si_ref_id: string
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
  status: FeeVersionStatus
  flat_amount: FlatAmountDto
  percentage_amount: PercentageAmountDto
  volume_amount: VolumeAmountDto
  author: string /* READ ONLY */
  approvedBy: string /* READ ONLY */

  public getValidFrom() {
    return new Date(this.valid_from).toDateString
  }

  public getValidTo() {
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

export class CreateFeeDto {
  code: string
  version: FeeVersionDto
  jurisdiction1: string
  jurisdiction2: string
  service: string
  channel: string
  direction: string
  event: string
  memo_line: string
  fee_order_name: string
  natural_account_code: string
  unspecified_claim_amount: boolean
  statutory_instrument: string
  si_ref_id: string
}

export class CreateFixedFeeDto extends CreateFeeDto {
}

export class CreateRangedFeeDto extends CreateFeeDto {
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

export class AllReferenceDataDto {
  channelTypes: ChannelTypeDto[]

  directionTypes: DirectionTypeDto[]

  eventTypes: EventTypeDto[]

  serviceTypes: ServiceTypeDto[]

  jurisdictions1: Jurisdiction1Dto[]

  jurisdictions2: Jurisdiction2Dto[]

  rangeUnits: RangeUnit[]
}

export type FeeVersionStatus = 'draft' | 'pending_approval' | 'approved'
