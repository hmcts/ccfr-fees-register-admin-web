import { expect } from 'chai'

import '../../../../routes/expectations'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { FeesClient } from 'fees/v2/feesClient'

describe('Fees client', () => {

  describe('on GET draft fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()

      expect(FeesClient.searchFees('draft', null, null, null, null)).to.not.equal(null)

    })
  })

  describe('on GET pending fees', () => {
    it('should return the data when the server replies', async () => {
      feesServiceMock.resolveGetFees()

      console.log(FeesClient.searchFees('pending_approval', null, null))

      expect(FeesClient.searchFees('pending_approval', null, null)).to.not.equal(null)

    })
  })

})
