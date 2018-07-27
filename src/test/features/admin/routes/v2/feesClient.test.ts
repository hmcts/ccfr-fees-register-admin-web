import { expect } from 'chai'

import '../../../../routes/expectations'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { FeesClient } from 'fees/v2/feesClient'

describe('Fees client', () => {

  describe('on GET draft fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()
      expect(FeesClient.searchFees('draft', 'author', 'approver', null, null)).to.not.equal(null)

    })
  })

  describe('on GET pending fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()
      expect(FeesClient.searchFees('pending_approval', 'author', 'approver')).to.not.equal(null)

    })
  })

  describe('on GET fee', () => {
    it('should return the data of the fee', async () => {
      feesServiceMock.resolveGetFee()

      expect(FeesClient.getFee('X0001')).to.not.equal(null)

    })
  })

  describe('on DELETE fee', () => {
    it('should return OK', async () => {
      feesServiceMock.resolveDeleteFee()

      let user = { bearerToken: 'xxx' }

      expect(FeesClient.deleteFee(user, 'X0001')).to.not.equal(null)

    })
  })

})
