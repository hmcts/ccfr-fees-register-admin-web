import * as config from 'config'
import * as mock from 'nock'
import * as HttpStatus from 'http-status-codes'

const serviceBaseURL: string = config.get<string>('fees.url')

export function retrieveCsvFee () {
  mock(`/admin/v2`)
    .post(new RegExp(`/upload`))
    .reply(HttpStatus.OK, { 'csvFees' : JSON.stringify([{'feeCode': 'X0033','feeDescription': 'xxxRecovery of Land - High Court','feeAmount': '480','feeVersion': '1','feeStatus': 'approved','validFrom': 'xxx','validTo': 'xxx','statutoryInstrument': '2014 No','jurisdiction1': 'civil','jurisdiction2': 'high court','service': 'civil money claims','event': 'issue','channel': 'default','direction': 'enhanced','feeType': 'fixed','amountType': 'flat','feeOrderName': 'XXX','naturalAccountCode': 'XXX','memoLine': 'XXX','siRefId': 'XXX'}])})
}

export function createBulkFixedFee () {
  mock(`${serviceBaseURL}/fees-register`)
    .post(new RegExp(`/bulkfixedfees`))
    .reply(HttpStatus.CREATED, [{
      msg: 'Successfully saved the csv fixed fees.',
      success: true
    }])
}
