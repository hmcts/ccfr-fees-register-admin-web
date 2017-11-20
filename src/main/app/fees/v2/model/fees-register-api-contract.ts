/* tslint:disable */
// Generated using typescript-generator version 1.29.355 on 2017-11-14 13:44:26.
// Manually modified as well, be careful!
export class ChannelTypeDto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class ChannelTypeDtoBuilder {
}

export class DirectionTypeDto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class DirectionTypeDtoBuilder {
}

export class EventTypeDto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class EventTypeDtoBuilder {
}

export class Fee2Dto {
  code: string;
  feeType: String;
  memoLine: string;
  channelTypeDto: ChannelType;
  directionTypeDto: DirectionType;
  eventTypeDto: EventType;
  jurisdiction1Dto: Jurisdiction1;
  jurisdiction2Dto: Jurisdiction2;
  serviceTypeDto: ServiceType;
  naturalAccountCode: string;
  feeOrderName: string;
  feeVersionDtos: FeeVersionDto[];
  currentVersion: FeeVersionDto;
  minRange: number;
  maxRange: number;
  unspecifiedClaimAmount: boolean;
}

export class FeeTypeDto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class FeeVersionDto {
  version: number;
  validFrom: Date;
  validTo: Date;
  description: string;
  status: FeeVersionStatus;
  flatAmount: FlatAmountDto;
  percentageAmount: PercentageAmountDto;

  public getValidFrom(){
    return new Date(this.validFrom).toDateString;
  }

  public getValidTo(){
    return new Date(this.validTo).toDateString;
  }

}

export class Jurisdiction1Dto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class Jurisdiction2Dto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class ReferenceDataErrorDto {
  message: string;
}

export class ServiceTypeDto {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class FlatAmountDto {
  amount: number;
}

export class PercentageAmountDto {
  percentage: number;
}

export class ApproveFeeDto {
  feeCode: string;
  feeVersion: number;
}

export class CreateFeeDto {
  code: string;
  version: FeeVersionDto;
  jurisdiction1: string;
  jurisdiction2: string;
  service: string;
  channel: string;
  direction: string;
  event: string;
  memoLine: string;
  feeOrderName: string;
  naturalAccountCode: string;
  unspecifiedClaimAmount: boolean;
}

export class CreateFixedFeeDto extends CreateFeeDto {
}

export class CreateRangedFeeDto extends CreateFeeDto {
  minRange: number;
  maxRange: number;
}

export class ChannelType {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class DirectionType {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class EventType {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class Jurisdiction1 {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class Jurisdiction2 {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export class ServiceType {
  name: string;
  creationTime: Date;
  lastUpdated: Date;
}

export type FeeVersionStatus = "draft" | "approved";
