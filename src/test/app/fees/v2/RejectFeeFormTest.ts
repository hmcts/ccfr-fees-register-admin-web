import { expect } from 'chai'
import { RejectFeeForm } from 'app/fees/v2/forms/model/RejectFeeForm'

let reasonForReject = {

  reason_for_reject: 'xxx'
  
  }

let feeForm = RejectFeeForm.fromObject(reasonForReject)

describe('RejectFeeForm',
  () => {
    describe('toDto', () => {

      it('should convert a form with reason for reject to dto', () => {

        let dto = feeForm.toDto()

        expect(dto.reasonForReject).to.equal(feeForm.reasonForReject)

      })

    })

    describe('fromObject',
      () => {

        it('should convert any to form',
          () => {

            let feeForm2 = RejectFeeForm.fromObject(feeForm)

            expect(feeForm2.reasonForReject).to.equal(feeForm.reasonForReject)
            expect(feeForm2.code).to.equal(feeForm2.code)

          })

      })
  }
)
