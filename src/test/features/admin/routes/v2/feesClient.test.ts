import { expect } from 'chai'

import * as mock from 'nock'

import '../../../../routes/expectations'

import * as feesServiceMock from '../../../../http-mocks/fees'
import { FeesClient } from 'fees/v2/feesClient'

describe('Fees client', () => {
  beforeEach(() => {
    mock.cleanAll()
  })

  describe('on GET', () => {
    it('should render the dashboard when fees-register returns data', async () => {
      feesServiceMock.resolveGetFees()

      expect(FeesClient.searchFees('draft', null, null)).to.not.equal(null)

    })
  })
})
