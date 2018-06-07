import * as express from 'express'
import * as mock from 'mock-require'
import Category from 'app/fees/category'
import Range from 'app/fees/range'
import Fee from 'app/fees/fee'
import RangeGroup from 'fees/rangeGroup'
import {
  AllReferenceDataDto,
  ChannelType, FeeDto , DirectionType, EventType, Fee2Dto, FeeVersionDto, Jurisdiction1,
  ServiceType
} from 'fees/v2/model/fees-register-api-contract'

let someRangeGroup = function () {
  return new RangeGroup(
    'range-group-code',
    'Range Group Description',
    [new Range(1, 100, new Fee('X001', 'fixed', 'Some description', 100, null))]
  )
}

function someCategory () {
  return new Category(
    'online-fees',
    'Online Fees',
    someRangeGroup(),
    [new Fee('X002', 'fixed', 'Other description', 200, null)]
  )
}

function someFee () {
  return new Fee('X003', 'fixed', 'Some description', 200, null)
}

function someChannelTypes () {
  const channelTypes = []
  const channelType = new ChannelType()
  channelType.name = 'online'
  channelTypes.push(channelType)
  channelType.name = 'default'
  channelTypes.push(channelType)
  return channelTypes
}

function someDirectionTypes () {
  const directionTypes = []
  const directionType = new DirectionType()
  directionType.name = 'enhanced'
  directionTypes.push(directionType)
  directionType.name = 'license'
  directionTypes.push(directionType)
  return directionTypes
}

function someEventTypes () {
  const eventTypes = []
  const eventType = new EventType()
  eventType.name = 'issue'
  eventTypes.push(eventType)
  eventType.name = 'search'
  eventTypes.push(eventType)
  return eventTypes
}

function someJurisdictions1 () {
  const jurisdictions1 = []
  const jurisdiction1 = new Jurisdiction1()
  jurisdiction1.name = 'civil'
  jurisdictions1.push(jurisdiction1)
  jurisdiction1.name = 'family'
  jurisdictions1.push(jurisdiction1)
  return jurisdictions1
}

function someJurisdictions2 () {
  const jurisdictions2 = []
  const jurisdiction2 = new Jurisdiction1()
  jurisdiction2.name = 'civil court'
  jurisdictions2.push(jurisdiction2)
  jurisdiction2.name = 'family court'
  jurisdictions2.push(jurisdiction2)
  return jurisdictions2
}

function someServiceTypes () {
  const serviceTypes = []
  const serviceType = new ServiceType()
  serviceType.name = 'divorce'
  serviceTypes.push(serviceType)
  serviceType.name = 'probate'
  serviceTypes.push(serviceType)
  return serviceTypes
}

function someFee2Dto () {
  const fee2Dtos = []
  const fee2Dto = new Fee2Dto()
  fee2Dto.code = 'X0001'
  fee2Dto.unspecified_claim_amount = false
  fee2Dtos.push(fee2Dto)
  return fee2Dtos
}

function mockFetchFeesPendingApproval () {
  return new Fee2Dto()
}

function mockFixedFee () {
  return new FeeDto()
}

function mockRangedFee () {
  return new FeeDto()
}

function mockFeeVersionDto () {
  return new FeeVersionDto()
}

function mockCheckFeeExists () {
  return 'true'
}

function mockRetrieveFeeByCode () {
  return new Fee2Dto()
}

function mockUser () {
  return {id: 123, roles: ['admin', 'admin']}
}

function mockAllReferenceData () {
  return new AllReferenceDataDto()
}

mock('app/fees/feesClient', {
  'FeesClient': {
    retrieveCategory: (categoryCode) => Promise.resolve(someCategory()),
    retrieveCategories: () => Promise.resolve([someCategory(), someCategory(), someCategory()]),
    retrieveRangeGroups: () => Promise.resolve([someRangeGroup(), someRangeGroup()]),
    retrieveRangeGroup: (rangeGroupCode) => Promise.resolve(someRangeGroup()),
    retrieveFee: (feeCode) => Promise.resolve(someFee()),
    retrieveFees: () => Promise.resolve([someFee(), someFee(), someFee()])
  }
})

mock('app/fees/v2/feesClient', {
  'FeesClient': {
    retrieveChannels: () => Promise.resolve([someChannelTypes()]),
    retrieveDirections: () => Promise.resolve([someDirectionTypes()]),
    retrieveEvents: () => Promise.resolve([someEventTypes()]),
    retrieveJurisdiction1: () => Promise.resolve([someJurisdictions1()]),
    retrieveJurisdiction2: () => Promise.resolve([someJurisdictions2()]),
    retrieveServices: () => Promise.resolve([someServiceTypes()]),
    searchFees: () => Promise.resolve([someFee2Dto()]),
    createRangedFee: () => Promise.resolve([mockRangedFee()]),
    createFixedFee: () => Promise.resolve([mockFixedFee()]),
    checkFeeExists: () => Promise.resolve([mockCheckFeeExists()]),
    fetchFeesPendingApproval: () => Promise.resolve([mockFetchFeesPendingApproval()]),
    retrieveReferenceData: () => Promise.resolve(mockAllReferenceData)
  }
})

mock('app/fees/v2/feesClient', {
  'FeesClient': {
    retrieveChannels: () => Promise.resolve([someChannelTypes()]),
    retrieveDirections: () => Promise.resolve([someDirectionTypes()]),
    retrieveEvents: () => Promise.resolve([someEventTypes()]),
    retrieveJurisdiction1: () => Promise.resolve([someJurisdictions1()]),
    retrieveJurisdiction2: () => Promise.resolve([someJurisdictions2()]),
    retrieveServices: () => Promise.resolve([someServiceTypes()]),
    searchFees: () => Promise.resolve([someFee2Dto()]),
    createRangedFee: () => Promise.resolve([mockRangedFee()]),
    createFixedFee: () => Promise.resolve([mockFixedFee()]),
    checkFeeExists: () => Promise.resolve([mockCheckFeeExists()]),
    fetchFeesPendingApproval: () => Promise.resolve([mockFetchFeesPendingApproval()]),
    retrieveReferenceData: () => Promise.resolve(mockAllReferenceData),
    createFeeVersion: () => Promise.resolve(mockFeeVersionDto),
    retrieveFeeByCode: () => Promise.resolve(mockRetrieveFeeByCode)
  }
})

mock('idam/authorizationMiddleware', {
  AuthorizationMiddleware: {
    requestHandler: () => {
      return (req: express.Request, res: express.Response, next: express.NextFunction): void => {
        res.locals.user = mockUser()
        next()
      }
    }
  }
})

mock('idam/idamClient', {
  'default': {
    retrieveUserFor: (jwtToken) => mockUser()
  }
})
