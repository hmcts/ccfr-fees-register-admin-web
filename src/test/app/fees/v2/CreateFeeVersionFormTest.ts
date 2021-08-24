import { expect } from 'chai'
import { CreateFeeVersionForm } from 'fees/v2/forms/model/CreateFeeVersionForm'

let feeVersion = {

  amountType: 'flat',
  description: 'fantastic',
  memoLine: 'ironic',
  amount: 100,
  direction: 'nowhere',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx'
}

let feeVersionVolume = {

  amountType: 'volume',
  description: 'fantastic',
  memoLine: 'ironic',
  amount: 100,
  direction: 'nowhere',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx'

}

let feeVersionPercentage = {

  amountType: 'percentage',
  description: 'fantastic',
  memoLine: 'ironic',
  percentage: 10,
  direction: 'nowhere',
  lastAmendingSi: 'xxx',
  consolidatedFeeOrderName: 'xxx'
}

describe('CreateFeeVersionForm',
  () => {

    describe('toDto', () => {

      it('should convert a form with flat amount to dto', () => {

        let feeVersionForm = CreateFeeVersionForm.fromObject(feeVersion)

        let dto = feeVersionForm.toDto()

        expect(dto.flat_amount.amount).to.equal(feeVersionForm.amount)

      })

      it('should convert a form with volume amount to dto', () => {

        let feeVersionForm = CreateFeeVersionForm.fromObject(feeVersionVolume)

        let dto = feeVersionForm.toDto()

        expect(dto.volume_amount.amount).to.equal(feeVersionForm.amount)

      })

      it('should convert a form with percentage amount to dto', () => {

        let feeVersionForm = CreateFeeVersionForm.fromObject(feeVersionPercentage)

        let dto = feeVersionForm.toDto()

        expect(dto.percentage_amount.percentage).to.equal(feeVersionForm.percentage)

      })

    })

    describe('fromObject',
      () => {

        it('should convert any to form', () => {

          let feeVersionForm = CreateFeeVersionForm.fromObject(feeVersion)

          expect(feeVersionForm.amount).to.equal(feeVersion.amount)
          expect(feeVersionForm.amountType).to.equal(feeVersion.amountType)
          expect(feeVersionForm.description).to.equal(feeVersion.description)

        })

      })
  }
)
