import * as config from 'config'

import request from 'client/request'
import * as model from 'app/fees/v2/model/fees-register-api-contract'
import { StatusCodeError } from 'request-promise-native/errors'
import {
  AllReferenceDataDto, CreateFixedFeeDto,
  FeeVersionStatus
} from 'fees/v2/model/fees-register-api-contract'

const feesUrl = config.get ( 'fees.url' )

export class FeesClientError extends Error {
  constructor ( public message: string ) {
    super ( message )
    Object.setPrototypeOf ( this, FeesClientError.prototype )
  }
}

function FeesClientErrorMapper ( reason: Error ) {
  if ( reason instanceof StatusCodeError ) {
    throw new FeesClientError ( (reason as any).response.body.cause )
  } else {
    throw reason
  }
}

export class FeesClient {

  static changeFeeStatus ( user, feeCode: string, version: number, status: FeeVersionStatus ): Promise<boolean> {

    return request
      .patch ( {
        uri: `${feesUrl}/fees-register/fees/${feeCode}/versions/${version}/status/${status}`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        }
      } )
      .then ( () => true )
      .catch ( FeesClientErrorMapper )
  }

  static deleteFeeVersion ( user, feeCode: string, version: number ): Promise<boolean> {

    return request
      .delete ( {
        uri: `${feesUrl}/fees-register/fees/${feeCode}/version/${version}`,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        }
      } )
      .then ( () => true )
      .catch ( FeesClientErrorMapper )
  }

  static createBulkFixedFee ( user, dtos: CreateFixedFeeDto[] ): Promise<boolean> {

    return request
      .post ( {
        uri: `${feesUrl}/fees-register/bulk-fixed-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dtos
      } )
      .then ( () => true )
      .catch ( FeesClientErrorMapper )

  }

  static createFixedFee ( user, dto: CreateFixedFeeDto ): Promise<boolean> {

    return request
      .post ( {
        uri: `${feesUrl}/fees-register/fixed-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      } )
      .then ( () => true )
      .catch ( FeesClientErrorMapper )

  }

  static createRangedFee ( user, dto: CreateFixedFeeDto ): Promise<boolean> {

    return request
      .post ( {
        uri: `${feesUrl}/fees-register/ranged-fees/`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: dto
      } )
      .then ( () => true )
      .catch ( FeesClientErrorMapper )

  }

  static checkFeeExists ( code: string ): Promise<boolean> {

    return request.head ( `${feesUrl}/fees-register/fees/${code}` )
      .then ( () => true ).catch ( () => false )

  }

  static searchFees ( versionStatus: String, author: String ): Promise<Array<model.Fee2Dto>> {

    let uri: string = `${feesUrl}/fees-register/fees?feeVersionStatus=${versionStatus}`

    if ( author ) {
      uri = uri + `&author=${author}`
    }

    return request
      .get ( uri )
      .then ( response => {

        /* Hack dates */

        if ( response.validFrom ) {
          response.validFrom = new Date ( response.validFrom )
        }

        if ( response.validTo ) {
          response.validTo = new Date ( response.validTo )
        }

        return response as Array<model.Fee2Dto>
      } ).catch ( FeesClientErrorMapper )

  }

  static retrieveReferenceData (): Promise<AllReferenceDataDto> {
    return request
      .get ( `${feesUrl}/referenceData` )
      .then ( response => {
        return response as AllReferenceDataDto
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveServices (): Promise<Array<model.ServiceType>> {
    return request
      .get ( `${feesUrl}/service-types` )
      .then ( response => {
        return response as Array<model.ServiceTypeDto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveDirections (): Promise<Array<model.DirectionTypeDto>> {
    return request
      .get ( `${feesUrl}/direction-types` )
      .then ( response => {
        return response as Array<model.DirectionTypeDto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveChannels (): Promise<Array<model.ChannelTypeDto>> {
    return request
      .get ( `${feesUrl}/channel-types` )
      .then ( response => {
        return response as Array<model.ChannelTypeDto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveApplicants (): Promise<Array<model.ApplicantTypeDto>> {
    return request
      .get ( `${feesUrl}/applicant-types` )
      .then ( response => {
        return response as Array<model.ApplicantTypeDto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveJurisdiction1 (): Promise<Array<model.Jurisdiction1Dto>> {
    return request
      .get ( `${feesUrl}/jurisdictions1` )
      .then ( response => {
        return response as Array<model.Jurisdiction1Dto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveJurisdiction2 (): Promise<Array<model.Jurisdiction2Dto>> {
    return request
      .get ( `${feesUrl}/jurisdictions2` )
      .then ( response => {
        return response as Array<model.Jurisdiction2Dto>
      } )
      .catch ( FeesClientErrorMapper )
  }

  static retrieveEvents (): Promise<Array<model.EventTypeDto>> {
    return request
      .get ( `${feesUrl}/event-types` )
      .then ( response => {
        return response as Array<model.EventTypeDto>
      } )
      .catch ( FeesClientErrorMapper )
  }
}
