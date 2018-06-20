import { expect } from 'chai'
import { FeeMapper } from 'fees/v2/model/fee-mapper'

let feeMapper = new FeeMapper()

let fixedFlatFeeCsv = {
  feeVersion : '1',
  feeDescription : 'xxx',
  feeCode : 'xxx',
  feeStatus : 'pending',
  feeAmount : '100',
  amountType : 'flat',
  validFrom : '',
  validTo : '',
  rangeFrom : null,
  rangeTo : null,
  applicantType : 'xxx',
  jurisdiction1 : 'xxx',
  service : 'CMC',
  channel : 'online',
  jurisdiction2 : 'xxx',
  naturalAccountCode : 'xxx',
  event : 'xxx',
  direction : 'xxx',
  statutoryInstrument : 'xxx',
  memoLine : 'xxx',
  feeOrderName : 'xxx',
  siRefId : 'xxx',
  feeType : 'fixed'
}

let rangedPercentageFeeCsv = {
  feeVersion : '1',
  feeDescription : 'xxx',
  memoLine : 'xxx',
  feeCode : 'xxx',
  service : 'CMC',
  event : 'xxx',
  naturalAccountCode : 'xxx',
  channel : 'online',
  siRefId : 'xxx',
  feeOrderName : 'xxx',
  direction : 'xxx',
  jurisdiction1 : 'xxx',
  jurisdiction2 : 'xxx',
  feeStatus : 'pending',
  feeAmount : '10',
  applicantType : 'xxx',
  statutoryInstrument : 'xxx',
  validFrom : '',
  validTo : '',
  amountType : '%',
  feeType : 'ranged',
  rangeFrom : '1',
  rangeTo : '100'
}
describe ( 'fee-mapper', () => {

  describe ( 'toFixedFeeDto', () => {

    it ( 'should convert to fixed fee dto with the a flat fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(fixedFlatFeeCsv)

      expect(dto.fee_type).to.equal('fixed')
      expect(dto.version.flat_amount.amount).to.equal(100)

    } )

  })

  describe ( 'toRangedFeeDto', () => {

    it ( 'should convert to ranged fee dto with the a percentage fee amount', function () {

      let dto = feeMapper.toRangedFeeDto(rangedPercentageFeeCsv)

      expect(dto.fee_type).to.equal('ranged')
      expect(dto.version.percentage_amount.percentage).to.equal(10)
      expect(dto.min_range).to.equal(1)
      expect(dto.max_range).to.equal(100)
    } )

  })

})
