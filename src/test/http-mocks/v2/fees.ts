import * as config from 'config'
import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

const serviceBaseURL: string = config.get<string>('fees.url')

const csvJSONStr = JSON.stringify([{
  'feeCode': 'X0033',
  'feeDescription': 'xxxRecovery of Land - High Court',
  'feeAmount': '480',
  'feeVersion': '1',
  'feeStatus': 'approved',
  'validFrom': 'xxx',
  'validTo': 'xxx',
  'statutoryInstrument': '2014 No',
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
  'siRefId': 'XXX'
}])

export function retrieveCsvFee () {
  mock(`/admin/v2`)
    .post(new RegExp(`/upload`))
    .reply(HttpStatus.OK, { 'csvFees': csvJSONStr })
}

export function createFixedFee () {
  mock(`${serviceBaseURL}`)
    .post(new RegExp(`/fixed-fees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv fixed fees.',
      success: true
    }])
}

export function createBandedFee () {
  mock(`${serviceBaseURL}`)
    .post(new RegExp(`/banded-fees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv fixed fees.',
      success: true
    }])
}

export function createRateableFee () {
  mock(`${serviceBaseURL}`)
    .post(new RegExp(`/rateable-fees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv fixed fees.',
      success: true
    }])
}

export function createRelationalFee () {
  mock(`${serviceBaseURL}`)
    .post(new RegExp(`/relational-fees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv fixed fees.',
      success: true
    }])
}

export function createRangedFee () {
  mock(`${serviceBaseURL}`)
    .post(new RegExp(`/ranged-fees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv ranged fees.',
      success: true
    }])
}

export function renderCsvImportFee () {
  mock(`/admin/v2`)
    .post(new RegExp(`/upload`))
    .reply(HttpStatus.OK, {
      csvFeeDtos: csvJSONStr,
      resObj: csvJSONStr,
      env: 'production'
    })
}

export function renderCsvToJsonPage () {
  mock(`/admin/v2`)
    .post(new RegExp(`/tojson`))
    .reply(HttpStatus.OK, {
      resObj: csvJSONStr
    })
}
