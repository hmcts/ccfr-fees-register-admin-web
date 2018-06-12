import { expect } from 'chai'
import { FeeMapper } from 'fees/v2/model/fee-mapper'

let feeMapper = new FeeMapper()

let fixedFlatFeeCsv = {
  feeVersion : 1,
  feeAmount : 100,
  amountType : 'flat',
  feeType : 'fixed'

}

let rangedPercentageFeeCsv = {
  feeVersion : 1,
  feeAmount : 10,
  amountType : '%',
  feeType : 'ranged',
  rangeFrom : 1,
  rangeTo : 100,
}
describe ( 'fee-mapper', () => {

  describe ( 'toFixedFeeDto', () => {

    it ( 'should convert to fixed fee dto with the a flat fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(fixedFlatFeeCsv)

      expect(dto.fee_type).to.equal('fixed')
      expect(dto.version.flat_amount.amount).to.equal(fixedFlatFeeCsv.feeAmount)

    } )

  })

  describe ( 'toRangedFeeDto', () => {

    it ( 'should convert to ranged fee dto with the a percentage fee amount', function () {

      let dto = feeMapper.toRangedFeeDto(rangedPercentageFeeCsv)

      expect(dto.fee_type).to.equal('ranged')
      expect(dto.version.percentage_amount.percentage).to.equal(rangedPercentageFeeCsv.feeAmount)
      expect(dto.min_range).to.equal(rangedPercentageFeeCsv.rangeFrom)
      expect(dto.max_range).to.equal(rangedPercentageFeeCsv.rangeTo)
    } )

  })

})
