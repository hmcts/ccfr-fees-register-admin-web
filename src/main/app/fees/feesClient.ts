import * as config from 'config'

import request from 'client/request'
import Category from 'app/fees/category'
import Range from 'app/fees/range'
import Fee from 'app/fees/fee'
import User from 'app/idam/user'

const feesUrl = config.get('fees.url')

export default class FeesClient {

  static retrieveCategories (): Promise<Array<Category>> {
    return request.get({
      uri: `${feesUrl}/categories`
    }).then((response: Array<any>) => {
      return response.map(categoryObject => new Category(
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
        categoryObject.code,
        categoryObject.description,
        FeesClient.toRanges(categoryObject.rangeGroup || {ranges: []}),
        FeesClient.toFees(categoryObject.fees || [])
      )
    })
  }

  static retrieveFees (): Promise<Array<Fee>> {
    return request.get({
      uri: `${feesUrl}/fees`
    }).then((response: Array<any>) => {
      return response.map(feeObject => FeesClient.toFee(feeObject))
    })
  }

  static retrieveFee (code: string): Promise<Fee> {
    return request.get({
      uri: `${feesUrl}/fees/${code}`
    }).then((feeObject: any) => {
      return FeesClient.toFee(feeObject)
    })
  }

  static updateFee (user: User, fee: Fee): Promise<Fee> {
    return request
      .put({
        uri: `${feesUrl}/fees/${fee.code}`,
        json: true,
        headers: {
          Authorization: `Bearer ${user.bearerToken}`
        },
        body: fee
      }).then((feeObject: any) => {
        return FeesClient.toFee(feeObject)
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
      flatFeeObject.code,
      flatFeeObject.type,
      flatFeeObject.description,
      flatFeeObject.amount,
      flatFeeObject.percentage
    )
  }
}
