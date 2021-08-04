import { expect } from 'chai'
import { FeeMapper } from 'fees/v2/model/fee-mapper'

let feeMapper = new FeeMapper()

let fixedFlatFeeCsv = {
  feeVersion: '1',
  feeDescription: 'xxx',
  reasonForUpdate: 'xxx',
  feeCode: 'xxx',
  feeStatus: 'pending',
  feeAmount: '100',
  amountType: 'flat',
  validFrom: '',
  validTo: '',
  rangeFrom: null,
  rangeTo: null,
  applicantType: 'xxx',
  jurisdiction1: 'xxx',
  service: 'CMC',
  channel: 'online',
  jurisdiction2: 'xxx',
  naturalAccountCode: 'xxx',
  event: 'xxx',
  direction: 'xxx',
  statutoryInstrument: 'xxx',
  memoLine: 'xxx',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx',
  siRefId: 'xxx',
  feeType: 'fixed',
  keyword: 'keyword1'
}

let rangedPercentageFeeCsv = {
  feeVersion: '1',
  feeDescription: 'xxx',
  reasonForUpdate: 'xxx',
  memoLine: 'xxx',
  feeCode: 'xxx',
  service: 'CMC',
  event: 'xxx',
  naturalAccountCode: 'xxx',
  channel: 'online',
  siRefId: 'xxx',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx',
  direction: 'xxx',
  jurisdiction1: 'xxx',
  jurisdiction2: 'xxx',
  feeStatus: 'pending',
  feeAmount: '10',
  applicantType: 'xxx',
  statutoryInstrument: 'xxx',
  validFrom: '',
  validTo: '',
  amountType: '%',
  feeType: 'ranged',
  rangeFrom: '1',
  rangeTo: '100',
  keyword: 'keyword1'
}

let bandedVolumeFeeCsv = {
  feeVersion: '1',
  feeDescription: 'xxx',
  reasonForUpdate: 'xxx',
  feeCode: 'xxx',
  feeStatus: 'pending',
  feeAmount: '100',
  amountType: 'volume',
  validFrom: '',
  validTo: '',
  rangeFrom: null,
  rangeTo: null,
  applicantType: 'xxx',
  jurisdiction1: 'xxx',
  service: 'CMC',
  channel: 'online',
  jurisdiction2: 'xxx',
  naturalAccountCode: 'xxx',
  event: 'xxx',
  direction: 'xxx',
  statutoryInstrument: 'xxx',
  memoLine: 'xxx',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx',
  siRefId: 'xxx',
  feeType: 'banded',
  keyword: ''
}
let rateableFlatFeeCsv = {
  feeVersion: '1',
  feeDescription: 'xxx',
  reasonForUpdate: 'xxx',
  feeCode: 'xxx',
  feeStatus: 'pending',
  feeAmount: '100',
  amountType: 'flat',
  validFrom: '',
  validTo: '',
  rangeFrom: null,
  rangeTo: null,
  applicantType: 'xxx',
  jurisdiction1: 'xxx',
  service: 'CMC',
  channel: 'online',
  jurisdiction2: 'xxx',
  naturalAccountCode: 'xxx',
  event: 'xxx',
  direction: 'xxx',
  statutoryInstrument: 'xxx',
  memoLine: 'xxx',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx',
  siRefId: 'xxx',
  feeType: 'rateable',
  keyword: ''
}
let relationalFlatFeeCsv = {
  feeVersion: '1',
  feeDescription: 'xxx',
  reasonForUpdate: 'xxx',
  feeCode: 'xxx',
  feeStatus: 'pending',
  feeAmount: '100',
  amountType: 'flat',
  validFrom: '',
  validTo: '',
  rangeFrom: null,
  rangeTo: null,
  applicantType: 'xxx',
  jurisdiction1: 'xxx',
  service: 'CMC',
  channel: 'online',
  jurisdiction2: 'xxx',
  naturalAccountCode: 'xxx',
  event: 'xxx',
  direction: 'xxx',
  statutoryInstrument: 'xxx',
  memoLine: 'xxx',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx',
  siRefId: 'xxx',
  feeType: 'relational',
  keyword: ''
}

describe('fee-mapper', () => {

  describe('toFixedFeeDto', () => {

    it('should convert to fixed fee dto with the a flat fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(fixedFlatFeeCsv)

      expect(dto.fee_type).to.equal('fixed')
      expect(dto.version.flat_amount.amount).to.equal(100)

    })

  })

  describe('toFixedFeeDto', () => {

    it('should convert to banded fee dto with the a volume fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(bandedVolumeFeeCsv)

      expect(dto.fee_type).to.equal('banded')
      expect(dto.version.volume_amount.amount).to.equal(100)

    })

  })

  describe('toFixedFeeDto', () => {

    it('should convert to rateable fee dto with the a flat fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(rateableFlatFeeCsv)

      expect(dto.fee_type).to.equal('rateable')
      expect(dto.version.flat_amount.amount).to.equal(100)

    })

  })
  describe('toFixedFeeDto', () => {

    it('should convert to relational fee dto with the a flat fee amount', function () {

      let dto = feeMapper.toFixedFeeDto(relationalFlatFeeCsv)

      expect(dto.fee_type).to.equal('relational')
      expect(dto.version.flat_amount.amount).to.equal(100)

    })

  })

  describe('toRangedFeeDto', () => {

    it('should convert to ranged fee dto with the a percentage fee amount', function () {

      let dto = feeMapper.toRangedFeeDto(rangedPercentageFeeCsv)

      expect(dto.fee_type).to.equal('ranged')
      expect(dto.version.percentage_amount.percentage).to.equal(10)
      expect(dto.min_range).to.equal(1)
      expect(dto.max_range).to.equal(100)
    })

  })

})
