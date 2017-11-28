import * as config from 'config'

import request from 'client/request'
import * as model from 'app/fees/v2/model/fees-register-api-contract'
import { StatusCodeError } from 'request-promise-native/errors'
import { AllReferenceDataDto } from 'fees/v2/model/fees-register-api-contract'

const feesUrl = config.get('fees.url')

export class FeesClientError extends Error {
  constructor (public message: string) {
    super(message)
    Object.setPrototypeOf(this, FeesClientError.prototype)
  }
}

function FeesClientErrorMapper (reason: Error) {
  if (reason instanceof StatusCodeError) {
    throw new FeesClientError((reason as any).response.body.message)
  } else {
    throw reason
  }
}

export class FeesClient {

  static checkFeeExists (code: string ): Promise<boolean> {

    return request.head(`${feesUrl}/fees-register/fees/${code}`)
      .then(() => true).catch(() => false)

  }

  static searchFees (): Promise<Array<model.Fee2Dto>> {
    return request
      .get(`${feesUrl}/fees-register/fees`)
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
      .get(`${feesUrl}/fees-register/referenceData`)
      .then(response => {
        return response as AllReferenceDataDto
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveServices (): Promise<Array<model.ServiceType>> {
    return request
      .get(`${feesUrl}/fees-register/servicetypes`)
      .then(response => {
        return response as Array<model.ServiceTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveDirections (): Promise<Array<model.DirectionTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/directiontypes`)
      .then(response => {
        return response as Array<model.DirectionTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveChannels (): Promise<Array<model.ChannelTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/channeltypes`)
      .then(response => {
        return response as Array<model.ChannelTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction1 (): Promise<Array<model.Jurisdiction1Dto>> {
    return request
      .get(`${feesUrl}/fees-register/jurisdictions1`)
      .then(response => {
        return response as Array<model.Jurisdiction1Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction2 (): Promise<Array<model.Jurisdiction2Dto>> {
    return request
      .get(`${feesUrl}/fees-register/jurisdictions2`)
      .then(response => {
        return response as Array<model.Jurisdiction2Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveEvents (): Promise<Array<model.EventTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/eventtypes`)
      .then(response => {
        return response as Array<model.EventTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }
}
