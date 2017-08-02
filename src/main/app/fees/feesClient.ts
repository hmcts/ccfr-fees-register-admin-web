import * as config from 'config'

import request from 'client/request'
import Category from 'app/fees/category'
import Range from 'app/fees/range'
import Fee from 'app/fees/fee'

const feesUrl = config.get('fees.url')

export default class FeesClient {

  static retrieveCategories (): Promise<Array<Category>> {
    return request.get({
      uri: `${feesUrl}/categories`
    }).then((response: Array<any>) => {
      return response.map(categoryObject => new Category(
        categoryObject.id,
        categoryObject.code,
        categoryObject.description,
        FeesClient.toRanges(categoryObject.rangeGroup || {ranges: []}),
        FeesClient.toFees(categoryObject.fees || [])
      ))
    })
  }

  static retrieveCategory (id: string): Promise<Category> {
    return request.get({
      uri: `${feesUrl}/categories/${id}`
    }).then((categoryObject: any) => {
      return new Category(
        categoryObject.id,
        categoryObject.code,
        categoryObject.description,
        FeesClient.toRanges(categoryObject.rangeGroup || {ranges: []}),
        FeesClient.toFees(categoryObject.fees || [])
      )
    })
  }

  private static toRanges (rangeGroupObject: any): Array<Range> {
    return rangeGroupObject.ranges.map(feeRangeObject => new Range(
      feeRangeObject.from,
      feeRangeObject.to,
      FeesClient.toFee(feeRangeObject.fee)
    ))
  }

  private static toFees (flatFeesObject: Array<any>): Array<Fee> {
    return flatFeesObject.map(this.toFee)
  }

  private static toFee (flatFeeObject: any): Fee {
    return new Fee(
      flatFeeObject.id,
      flatFeeObject.code,
      flatFeeObject.type,
      flatFeeObject.description,
      flatFeeObject.amount,
      flatFeeObject.percentage
    )
  }
}
