import * as config from 'config'

import makeRequest from 'client/request'
import Category from 'app/fees/category'
import Range from 'app/fees/range'
import Fee from 'app/fees/fee'
import User from 'app/idam/user'
import RangeGroup from 'fees/rangeGroup'

const feesUrl = config.get('fees.url')

export class FeesClient {

  static async retrieveCategories (): Promise<Array<Category>> {
    const resp = await makeRequest(`${feesUrl}/categories`, 'GET');
    const payload: Array<any> = await resp.json();
    return payload.map(FeesClient.toCategory);
  }

  static checkCategoryExists (code: string): Promise<boolean> {
    return FeesClient.retrieveCategory(code).then(() => true).catch(() => false)
  }

  static async retrieveCategory (code: string): Promise<Category> {
    const resp = await makeRequest(`${feesUrl}/categories/${code}`, 'GET');
    const payload: any = await resp.json();
    return FeesClient.toCategory(payload);
  }

  static async updateCategory (user: User, category: Category): Promise<Category> {
    const body = {
      description: category.description,
        rangeGroupCode: category.rangeGroup.code,
        feeCodes: category.fees.map(fee => fee.code)
    };

    const resp = await makeRequest(`${feesUrl}/categories/${category.code}`, 'PUT', user.bearerToken, body);
    return FeesClient.toCategory(await resp.json());
  }

  static async retrieveRangeGroups (): Promise<Array<RangeGroup>> {
    const resp = await makeRequest(`${feesUrl}/range-groups`, 'GET');
    const payload: Array<any> = await resp.json();
    return payload.map(FeesClient.toRangeGroup);
  }

  static checkRangeGroupExists (code: string): Promise<boolean> {
    return FeesClient.retrieveRangeGroup(code).then(() => true).catch(() => false)
  }

  static async retrieveRangeGroup (code: string): Promise<RangeGroup> {
    const resp = await makeRequest(`${feesUrl}/range-groups/${code}`, 'GET');
    return FeesClient.toRangeGroup(await resp.json());
  }

  static async updateRangeGroup (user: User, rangeGroup: RangeGroup): Promise<RangeGroup> {
    const body = {
      description: rangeGroup.description,
        ranges: rangeGroup.ranges.map(range => ({
        from: range.from,
        to: range.to,
        feeCode: range.fee.code
      }))
    };

    const resp = await makeRequest(`${feesUrl}/range-groups/${rangeGroup.code}`, 'PUT', user.bearerToken, body);
    return FeesClient.toRangeGroup(await resp.json());
  }

  static async retrieveFees (): Promise<Array<Fee>> {
    const resp = await makeRequest(`${feesUrl}/fees`, 'GET');
    const payload: Array<any> = await resp.json();
    return payload.map(FeesClient.toFee);
  }

  static checkFeeExists (code: string): Promise<boolean> {
    return FeesClient.retrieveFee(code).then(() => true).catch(() => false)
  }

  static async retrieveFee (code: string): Promise<Fee> {
    const resp = await makeRequest(`${feesUrl}/fees/${code}`, 'GET');
    return FeesClient.toFee(await resp.json());
  }

  static async updateFee (user: User, fee: Fee): Promise<Fee> {
    const resp = await makeRequest(`${feesUrl}/fees/${fee.code}`, 'PUT', user.bearerToken, fee);
    return FeesClient.toFee(await resp.json());
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
