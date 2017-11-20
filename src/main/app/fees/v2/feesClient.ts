import * as config from 'config'

import request from 'client/request'
import * as model from 'app/fees/v2/model/fees-register-api-contract'
import { StatusCodeError } from 'request-promise-native/errors'

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

  static searchFees (): Promise<Array<model.Fee2Dto>> {
    return request
      .get(`${feesUrl}/fees-register/fees`)
      .then(response => {

        /* Hack dates */

        if ( response.validFrom ) {
          response.validFrom = new Date(response.validFrom)
        }

        if ( response.validTo ) {
          response.validTo = new Date(response.validTo)
        }

        return response as Array<model.Fee2Dto>
      }).catch(FeesClientErrorMapper)

  }

  static retrieveServices (): Promise<Array<model.ServiceType>> {
    return request
      .get(`${feesUrl}/fees-register/servicetypes`)
      .then(response => {

        console.log(response)

        return response as Array<model.ServiceTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveDirections (): Promise<Array<model.DirectionTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/directiontypes`)
      .then(response => {

        console.log(response)

        return response as Array<model.DirectionTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveChannels (): Promise<Array<model.ChannelTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/channeltypes`)
      .then(response => {

        console.log(response)

        return response as Array<model.ChannelTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction1 (): Promise<Array<model.Jurisdiction1Dto>> {
    return request
      .get(`${feesUrl}/fees-register/jurisdictions1`)
      .then(response => {

        console.log(response)

        return response as Array<model.Jurisdiction1Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveJurisdiction2 (): Promise<Array<model.Jurisdiction2Dto>> {
    return request
      .get(`${feesUrl}/fees-register/jurisdictions2`)
      .then(response => {

        console.log(response)

        return response as Array<model.Jurisdiction2Dto>
      })
      .catch(FeesClientErrorMapper)
  }

  static retrieveEvents (): Promise<Array<model.EventTypeDto>> {
    return request
      .get(`${feesUrl}/fees-register/eventtypes`)
      .then(response => {

        console.log(response)

        return response as Array<model.EventTypeDto>
      })
      .catch(FeesClientErrorMapper)
  }
}
