import * as config from 'config'

import request from 'client/request'
import * as model from 'app/fees/v2/model/fees-register-api-contract'
import { StatusCodeError } from 'request-promise-native/errors'
import {
  AllReferenceDataDto, FixedFeeDto, Fee2Dto, FeeVersionDto, RangedFeeDto, RateableFeeDto, RelationalFeeDto, BandedFeeDto
} from 'fees/v2/model/fees-register-api-contract'

const feesUrl = config.get('fees.url')

export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}

function FeesClientErrorMapper (reason: Error) {
  if (reason instanceof StatusCodeError) {
    throw new FeesClientError((reason as any).response.body.cause)
  } else {
    throw reason
  }
}

export class FeesClient {

  static approveFee (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/approve`, user)
  }

  static rejectFee (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/reject`, user)
  }

  static submitForReview (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/submit-for-review`, user)
  }

  static deleteFee (user, feeCode: string): Promise<boolean> {
    return request
      .delete({
        uri: `${feesUrl}/fees-register/fees/${feeCode}`,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        }
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static createFeeVersion (user, feeCode: string, dto: FeeVersionDto): Promise<boolean> {
    return request
      .post({
        uri: `${feesUrl}/fees/${feeCode}/versions`,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      }).then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static updateFeeVersion (user, feeCode: string, feeVersion: number, dto: FeeVersionDto): Promise<boolean> {
    return request
      .put({
        uri: `${feesUrl}/fees/${feeCode}/versions/${feeVersion}`,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      }).then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static deleteFeeVersion (user, feeCode: string, version: number): Promise<boolean> {

    return request
      .delete({
        uri: `${feesUrl}/fees/${feeCode}/versions/${version}`,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        }
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static createFixedFee (user, dto: FixedFeeDto): Promise<boolean> {

    return request
      .post({
        uri: `${feesUrl}/fees-register/fixed-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)

  }

  static updateFixedFee (user, dto: FixedFeeDto): Promise<boolean> {
    return request
      .put({
        uri: `${feesUrl}/fees-register/fixed-fees/${dto.code}`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static createRangedFee (user, dto: RangedFeeDto): Promise<boolean> {

    return request
      .post({
        uri: `${feesUrl}/fees-register/ranged-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)

  }

  static updateRangedFee (user, dto: RangedFeeDto): Promise<boolean> {
    return request
      .put({
        uri: `${feesUrl}/fees-register/ranged-fees/${dto.code}`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)
  }

  static createBandedFee (user, dto: BandedFeeDto): Promise<boolean> {

    return request
      .post({
        uri: `${feesUrl}/fees-register/banded-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)

  }

  static createRateableFee (user, dto: RateableFeeDto): Promise<boolean> {

    return request
      .post({
        uri: `${feesUrl}/fees-register/rateable-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)

  }

  static createRelationalFee (user, dto: RelationalFeeDto): Promise<boolean> {

    return request
      .post({
        uri: `${feesUrl}/fees-register/relational-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)

  }

  static checkFeeExists (code: string): Promise<boolean> {

    return request.head(`${feesUrl}/fees-register/fees/${code}`)
      .then(() => true).catch(() => false)

  }

  static getFee (feeCode: string): Promise<Fee2Dto> {
    let uri: string = `${feesUrl}/fees-register/fees/${feeCode}`

    return request
      .get(uri)
      .then(response => {
        return response as Fee2Dto
      })
      .catch(FeesClientErrorMapper)
  }

  static prevalidate (user, event: string, service: string, channel: string, jurisdiction1: string, jurisdiction2: string, keyword: string, rangeFrom: string, rangeTo: string): Promise<boolean> {

    let url: string = `${feesUrl}/fees-register/fees/prevalidate?event=${event}&channel=${channel}&service=${service}&jurisdiction1=${jurisdiction1}&jurisdiction2=${jurisdiction2}&keyword=${keyword}`

    if (rangeFrom) {
      url += `&rangeFrom=${rangeFrom}`
    }

    if (rangeTo) {
      url += `&rangeTo=${rangeTo}`
    }

    return request.get({

      headers: {
        Authorization: `Bearer ${user.bearerToken}`
      },
      uri: encodeURI(url)
    })
      .then(() => true).catch(() => false)
  }

  static checkFeeVersionExists (code: string, version: number): Promise<boolean> {
    return request.head(`${feesUrl}/fees/${code}/versions/${version}`)
      .then(() => false).catch(() => true)
  }

  static searchFees (versionStatus: string, author?: string, approvedBy?: string, isActive?: boolean, isExpired?: boolean, isDraft?: boolean): Promise<Array<model.Fee2Dto>> {

    let uri: string = `${feesUrl}/fees-register/fees?`

    if (versionStatus != null) {
      uri = uri + `&feeVersionStatus=${versionStatus}`
    }

    if (author != null) {
      uri = uri + `&author=${author}`
    }

    if (approvedBy != null) {
      uri = uri + `&approvedBy=${approvedBy}`
    }

    if (isActive != null) {
      uri = uri + `&isActive=${isActive}`
    }

    if (isExpired != null) {
      uri = uri + `&isExpired=${isExpired}`
    }

    if (isDraft != null) {
      uri = uri + `&isDraft=${isDraft}`
    }

    return request
      .get(uri)
      .then(response => {

        /* Hack dates */

        if (response.validFrom) {
          response.validFrom = new Date(response.validFrom)
        }

        if (response.validTo) {
          response.validTo = new Date(response.validTo)
        }

        return response as Array<model.Fee2Dto>
      }).catch(FeesClientErrorMapper)

  }

  static retrieveReferenceData (): Promise<AllReferenceDataDto> {
    return request
      .get(`${feesUrl}/referenceData`)
      .then(response => {
        return response as AllReferenceDataDto
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveServices (): Promise<Array<model.ServiceType>> {
    return request
      .get(`${feesUrl}/service-types`)
      .then(response => {
        return response as Array<model.ServiceTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveDirections (): Promise<Array<model.DirectionTypeDto>> {
    return request
      .get(`${feesUrl}/direction-types`)
      .then(response => {
        return response as Array<model.DirectionTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveChannels (): Promise<Array<model.ChannelTypeDto>> {
    return request
      .get(`${feesUrl}/channel-types`)
      .then(response => {
        return response as Array<model.ChannelTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveApplicants (): Promise<Array<model.ApplicantTypeDto>> {
    return request
      .get(`${feesUrl}/applicant-types`)
      .then(response => {
        return response as Array<model.ApplicantTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction1 (): Promise<Array<model.Jurisdiction1Dto>> {
    return request
      .get(`${feesUrl}/jurisdictions1`)
      .then(response => {
        return response as Array<model.Jurisdiction1Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction2 (): Promise<Array<model.Jurisdiction2Dto>> {
    return request
      .get(`${feesUrl}/jurisdictions2`)
      .then(response => {
        return response as Array<model.Jurisdiction2Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveEvents (): Promise<Array<model.EventTypeDto>> {
    return request
      .get(`${feesUrl}/event-types`)
      .then(response => {
        return response as Array<model.EventTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  private static invokePatch (url: string, user): Promise<boolean> {
    return request
      .patch({
        uri: `${url}`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        }
      })
      .then(() => true)
      .catch(FeesClientErrorMapper)
  }
}
