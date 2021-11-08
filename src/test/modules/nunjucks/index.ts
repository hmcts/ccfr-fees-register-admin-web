import { expect } from 'chai'

import { nunjucksEnv } from '../../../main/app'
import { Fee2Dto, FeeVersionDto } from 'fees/v2/model/fees-register-api-contract'

describe('Nunjucks', () => {

  describe('globals', () => {
    it('getLastFeeVersion should get latest approved fee version', async () => {
      let getLastFeeVersion: (Fee2Dto) => FeeVersionDto = (nunjucksEnv as any).getGlobal('getLastFeeVersion')
      let fee: Fee2Dto = new Fee2Dto()
      let fv1: FeeVersionDto = new FeeVersionDto()
      let fv2: FeeVersionDto = new FeeVersionDto()
      fv1.version = 1
      fv2.version = 2
      fv1.status = fv2.status = 'approved'
      fee.fee_versions = [fv1, fv2]

      expect(getLastFeeVersion(fee).version).to.equal(2)
    })
  })
})
//
