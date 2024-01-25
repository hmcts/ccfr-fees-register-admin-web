import { expect } from 'chai'
import * as config from 'config'
import * as request from 'supertest'
import * as mock from 'nock'
import * as path from 'path'

import '../../../../routes/expectations'

import { Paths as AdminPaths } from 'admin/paths'

import { app } from '../../../../../main/app'

import * as feesServiceMock from '../../../../http-mocks/v2/fees'
import * as idamServiceMock from '../../../../http-mocks/idam'

const cookieName: string = config.get<string>('session.cookieName')

describe('Csv fees upload', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render csv upload page', async () => {
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .get(AdminPaths.csvUploadPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .expect(res => (expect(res).to.be as any).successful.withText('CSV upload'))
    })
  })

  describe('on POST render the CSV import fees', () => {
    it('should render the CSV import fees after upload', async () => {
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.csvImportFeePage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .attach('csvdata', path.join(__dirname, 'feeimport.csv'))
        .expect(res => (expect(res).to.be as any).successful.withText('X0033', 'xxxRecovery of Land - High Court'))
    })
  })

  describe('on POST save CSV fixed fees', () => {
    it('should render the save CSV fees confirmation page', async () => {
      feesServiceMock.createFixedFee()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.createBulkFeesPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX',
            'keyword': 'testKeyword1'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Create csv fees confirmation'))
    })
  })

  describe('on POST save CSV fixed fees', () => {
    it('should render the save CSV fees confirmation page', async () => {
      feesServiceMock.createBandedFee()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.createBulkFeesPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'banded',
            'amountType': 'volume',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Create csv fees confirmation')
        )
    })
  })

  describe('on POST save CSV fixed fees', () => {
    it('should render the save CSV fees confirmation page', async () => {
      feesServiceMock.createRateableFee()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.createBulkFeesPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'rateable',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Create csv fees confirmation')
        )
    })
  })

  describe('on POST save CSV fixed fees', () => {
    it('should render the save CSV fees confirmation page', async () => {
      feesServiceMock.createRelationalFee()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.createBulkFeesPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'relational',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Create csv fees confirmation')
        )
    })
  })

  describe('on POST save CSV ranged fees', () => {
    it('should render the save CSV fees confirmation page', async () => {
      feesServiceMock.createRangedFee()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.createBulkFeesPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'rangeFrom': '0',
            'rangeTo': '100',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'ranged',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX',
            'keyword': 'testKeyword1'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'rangeFrom': '101',
            'rangeTo': '200',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'ranged',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX',
            'keyword': 'testKeyword2'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Create csv fees confirmation')
        )
    })
  })

  describe('on POST render CSV data to JSON', () => {
    it('should render csv data into json', async () => {
      feesServiceMock.renderCsvToJsonPage()
      await idamServiceMock.resolveRetrieveUserFor(1, 'admin', 'admin')

      await request(app)
        .post(AdminPaths.csvToJsonPage.uri)
        .set('Cookie', `${cookieName}=JWT`)
        .send({
          csvFees: JSON.stringify([{
            'feeCode': 'X0033',
            'feeDescription': 'xxxRecovery of Land - High Court',
            'feeAmount': '480',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': '2014 No  874(L17)',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'high court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX',
            'keyword': 'testKeyword1'
          }, {
            'feeCode': 'X0034',
            'feeDescription': 'xxxRecovery of Land - County Court',
            'feeAmount': '355',
            'feeVersion': '1',
            'feeStatus': 'approved',
            'validFrom': 'xxx',
            'validTo': 'xxx',
            'statutoryInstrument': 'XXX',
            'jurisdiction1': 'civil',
            'jurisdiction2': 'county court',
            'service': 'civil money claims',
            'event': 'issue',
            'channel': 'default',
            'direction': 'enhanced',
            'feeType': 'fixed',
            'amountType': 'flat',
            'lastAmendingSi': 'XXX',
            'consolidatedFeeOrderName': 'XXX',
            'naturalAccountCode': 'XXX',
            'memoLine': 'XXX',
            'siRefId': 'XXX'
          }])
        })
        .expect(res => (expect(res).to.be as any).successful.withText('Fee loader json')
        )
    })
  })
})
