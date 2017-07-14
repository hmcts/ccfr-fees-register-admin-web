import * as config from 'config'

import request from 'client/request'
import FeeCategory from 'app/fees/feeCategory'
import FeeRange from 'app/fees/feeRange'
import FlatFee from 'app/fees/flatFee'
const feesUrl = config.get('fees.url')

export default class FeesClient {

  static retrieveCategories (): Promise<Array<FeeCategory>> {
    return request.get({
      uri: `${feesUrl}/fees-register/categories`
    }).then((response: Array<any>) => {
      return response.map(categoryObject => new FeeCategory(
        categoryObject.id,
        FeesClient.toFeeRanges(categoryObject.ranges || []),
        FeesClient.toFlatFees(categoryObject.flatFees || [])
      ))
    })
  }

  static retrieveCategory (id: string): Promise<FeeCategory> {
    return request.get({
      uri: `${feesUrl}/fees-register/categories/${id}`
    }).then((categoryObject: any) => {
      return new FeeCategory(
        categoryObject.id,
        FeesClient.toFeeRanges(categoryObject.ranges || []),
        FeesClient.toFlatFees(categoryObject.flatFees || [])
      )
    })
  }

  private static toFeeRanges (feeRangesObject: Array<any>): Array<FeeRange> {
    return feeRangesObject.map(feeRangeObject => new FeeRange(
      feeRangeObject.start,
      feeRangeObject.upto,
      FeesClient.toFlatFee(feeRangeObject.fee)
    ))
  }

  private static toFlatFees (flatFeesObject: Array<any>): Array<FlatFee> {
    return flatFeesObject.map(this.toFlatFee)
  }

  private static toFlatFee (flatFeeObject: any): FlatFee {
    return new FlatFee(
      flatFeeObject.id,
      flatFeeObject.type,
      flatFeeObject.description,
      flatFeeObject.amount
    )
  }
}
