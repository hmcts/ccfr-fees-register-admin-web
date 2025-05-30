import * as config from 'config'

import makeRequest from 'client/request'
import * as model from 'app/fees/v2/model/fees-register-api-contract'
import {
  AllReferenceDataDto, FixedFeeDto, Fee2Dto, FeeVersionDto, RangedFeeDto, RateableFeeDto, RelationalFeeDto, BandedFeeDto
} from 'fees/v2/model/fees-register-api-contract'

const feesUrl = config.get('fees.url')


export class FeesClient {

  static approveFee (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/approve`, user)
  }

  static rejectFee (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/reject`, user)
  }

  static reasonForRejectFee (user, feeCode: string, version: number, dto: model.ReasonDto): Promise<boolean> {
    return FeesClient.invokePatchDto(`${feesUrl}/fees/${feeCode}/versions/${version}/reject`, user, dto)
  }

  static submitForReview (user, feeCode: string, version: number): Promise<boolean> {
    return FeesClient.invokePatch(`${feesUrl}/fees/${feeCode}/versions/${version}/submit-for-review`, user)
  }

  static async delete(url: string, token: string): Promise<boolean> {
    const response = await makeRequest(url, 'DELETE', token);
    return response.ok;
  }

  static async update(url: string, method: string, token: string, body: object): Promise<boolean> {
    const response = await makeRequest(url, method, token, body);
    return response.ok;
  }

  static deleteFee (user, feeCode: string): Promise<boolean> {
    return this.delete(`${feesUrl}/fees-register/fees/${feeCode}`, user.bearerToken);
  }

  static createFeeVersion (user, feeCode: string, dto: FeeVersionDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees/${feeCode}/versions`, 'POST', user.bearerToken, dto);
  }

  static updateFeeVersion (user, feeCode: string, feeVersion: number, dto: FeeVersionDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees/${feeCode}/versions/${feeVersion}`, 'PUT', user.bearerToken, dto);
  }

  static deleteFeeVersion (user, feeCode: string, version: number): Promise<boolean> {
    return this.delete(`${feesUrl}/fees/${feeCode}/versions/${version}`, user.bearerToken);
  }

  static createFixedFee (user, dto: FixedFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/fixed-fees`, 'POST', user.bearerToken, dto);
  }

  static updateFixedFee (user, dto: FixedFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/fixed-fees/${dto.code}`, 'PUT', user.bearerToken, dto);
  }

  static createRangedFee (user, dto: RangedFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/ranged-fees`, 'POST', user.bearerToken, dto);
  }

  static updateRangedFee (user, dto: RangedFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/ranged-fees/${dto.code}`, 'PUT', user.bearerToken, dto);
  }

  static createBandedFee (user, dto: BandedFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/banded-fees`, 'POST', user.bearerToken, dto);
  }

  static createRateableFee (user, dto: RateableFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/rateable-fees`, 'POST', user.bearerToken, dto);
  }

  static createRelationalFee (user, dto: RelationalFeeDto): Promise<boolean> {
    return this.update(`${feesUrl}/fees-register/relational-fees`, 'POST', user.bearerToken, dto);
  }

  static async checkFeeExists (code: string): Promise<boolean> {
      const response = await makeRequest(`${feesUrl}/fees-register/fees/${code}`, 'HEAD');
      return response.ok;
  }

  static async getFee (user, feeCode: string): Promise<Fee2Dto> {
    const resp = await makeRequest(`${feesUrl}/fees-register/fees/${feeCode}`, 'GET', user.bearerToken);
    return await resp.json() as Fee2Dto;
  }

  static async getAnonUserFee (feeCode: string): Promise<Fee2Dto> {
    const resp = await makeRequest(`${feesUrl}/fees-register/fees/${feeCode}`, 'GET')
    return await resp.json() as Fee2Dto;
  }

  static async prevalidate (user, event: string, service: string, channel: string, jurisdiction1: string, jurisdiction2: string, keyword: string, rangeFrom: string, rangeTo: string): Promise<boolean> {
    let url: string = `${feesUrl}/fees-register/fees/prevalidate?event=${event}&channel=${channel}&service=${service}&jurisdiction1=${jurisdiction1}&jurisdiction2=${jurisdiction2}&keyword=${keyword}`

    if (rangeFrom) {
      url += `&rangeFrom=${rangeFrom}`
    }

    if (rangeTo) {
      url += `&rangeTo=${rangeTo}`
    }

    const resp = await makeRequest(encodeURI(url), 'GET', user.bearerToken);
    return resp.ok;
  }

  static async checkFeeVersionExists (code: string, version: number): Promise<boolean> {
    const resp = await makeRequest(`${feesUrl}/fees/${code}/versions/${version}`, 'HEAD');
    return resp.ok;
  }

  static async searchFees (versionStatus: string, author?: string, approvedBy?: string, isActive?: boolean, isExpired?: boolean, isDraft?: boolean): Promise<Array<model.Fee2Dto>> {

    const params = new URLSearchParams();
    if (versionStatus != null) { params.append('feeVersionStatus', versionStatus); }
    if (author != null) { params.append('author', author); }
    if (approvedBy != null) { params.append('approvedBy', approvedBy); }
    if (isActive != null) { params.append('isActive', isActive.toString()); }
    if (isExpired != null) { params.append('isExpired', isExpired.toString()); }
    if (isDraft != null) { params.append('isDraft', isDraft.toString()); }

    const uri = `${feesUrl}/fees-register/fees?${params.toString()}`;
    const resp = await makeRequest(uri, 'GET');
    const payload = await resp.json();

    return payload as Array<model.Fee2Dto>
  }

  static async retrieveReferenceData (): Promise<AllReferenceDataDto> {
    const resp = await makeRequest(`${feesUrl}/referenceData`, 'GET');
    return await resp.json() as AllReferenceDataDto;
  }

  static async retrieveServices (): Promise<Array<model.ServiceType>> {
    const resp = await makeRequest(`${feesUrl}/service-types`, 'GET');
    return await resp.json() as Array<model.ServiceTypeDto>;
  }

  static async retrieveDirections (): Promise<Array<model.DirectionTypeDto>> {
    const resp = await makeRequest(`${feesUrl}/direction-types`, 'GET');
    return await resp.json() as Array<model.DirectionTypeDto>;
  }

  static async retrieveChannels (): Promise<Array<model.ChannelTypeDto>> {
    const resp = await makeRequest(`${feesUrl}/channel-types`, 'GET');
    return await resp.json() as Array<model.ChannelTypeDto>;
  }

  static async retrieveApplicants (): Promise<Array<model.ApplicantTypeDto>> {
    const resp = await makeRequest(`${feesUrl}/applicant-types`, 'GET');
    return await resp.json() as Array<model.ApplicantTypeDto>;
  }

  static async retrieveJurisdiction1 (): Promise<Array<model.Jurisdiction1Dto>> {
    const resp = await makeRequest(`${feesUrl}/jurisdictions1`, 'GET');
    return await resp.json() as Array<model.Jurisdiction1Dto>;
  }

  static async retrieveJurisdiction2 (): Promise<Array<model.Jurisdiction2Dto>> {
    const resp = await makeRequest(`${feesUrl}/jurisdictions2`, 'GET');
    return await resp.json() as Array<model.Jurisdiction2Dto>;
  }

  static async retrieveEvents (): Promise<Array<model.EventTypeDto>> {
    const resp = await makeRequest(`${feesUrl}/event-types`, 'GET');
    return await resp.json() as Array<model.EventTypeDto>;
  }

  private static async invokePatch (url: string, user): Promise<boolean> {
    const resp = await makeRequest(url, 'PATCH', user.bearerToken);
    return resp.ok;
  }

  private static async invokePatchDto (url: string, user, dto: model.ReasonDto): Promise<boolean> {
    const resp = await makeRequest(url, 'PATCH', user.bearerToken, dto);
    return resp.ok;
  }
}
