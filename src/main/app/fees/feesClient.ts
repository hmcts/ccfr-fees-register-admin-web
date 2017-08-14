import * as config from 'config'

import request from 'client/request'
import Category from 'app/fees/category'
import Range from 'app/fees/range'
import Fee from 'app/fees/fee'
import User from 'app/idam/user'
import RangeGroup from 'fees/rangeGroup'

const feesUrl = config.get('fees.url')

export default class FeesClient {

  static retrieveCategories (): Promise<Array<Category>> {
    return request.get({
      uri: `${feesUrl}/categories`
    }).then((response: Array<any>) => {
      return response.map(FeesClient.toCategory)
    })
  }

  static retrieveCategory (id: string): Promise<Category> {
    return request.get({
      uri: `${feesUrl}/categories/${id}`
    }).then(FeesClient.toCategory)
  }

  static retrieveRangeGroups (): Promise<Array<RangeGroup>> {
    return request.get({
      uri: `${feesUrl}/range-groups`
    }).then((response: Array<any>) => {
      return response.map(FeesClient.toRangeGroup)
    })
  }

  static retrieveFees (): Promise<Array<Fee>> {
    return request.get({
      uri: `${feesUrl}/fees`
    }).then((response: Array<any>) => {
      return response.map(FeesClient.toFee)
    })
  }

  static checkFeeExists (code: string): Promise<boolean> {
    return FeesClient.retrieveFee(code).then(() => true).catch(() => false)
  }

  static retrieveFee (code: string): Promise<Fee> {
    return request.get({
      uri: `${feesUrl}/fees/${code}`
    }).then(FeesClient.toFee)
  }

  static updateFee (user: User, fee: Fee): Promise<Fee> {
    return request.put({
      uri: `${feesUrl}/fees/${fee.code}`,
      json: true,
      headers: {
        Authorization: `Bearer ${user.bearerToken}`
      },
      body: fee
    }).then(FeesClient.toFee)
  }

  private static toCategory (categoryObject: any): Category {
    return new Category(
      categoryObject.code,
      categoryObject.description,
      categoryObject.rangeGroup ? FeesClient.toRangeGroup(categoryObject.rangeGroup) : null,
      FeesClient.toFees(categoryObject.fees || [])
    )
  }

  private static toRangeGroup (rangeGroupObject: any): RangeGroup {
    return new RangeGroup(
      rangeGroupObject.code,
      rangeGroupObject.description,
      FeesClient.toRanges(rangeGroupObject.ranges)
    )
  }

  private static toRanges (rangesObject: Array<any>): Array<Range> {
    return rangesObject.map(feeRangeObject => new Range(
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
