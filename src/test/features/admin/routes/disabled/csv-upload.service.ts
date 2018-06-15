import { expect } from 'chai'
import { CSVUploadService } from 'admin/v2/services/csv-upload.service'
import { FeeVersionDto, FixedFeeDto, FlatAmountDto , RangedFeeDto } from 'fees/v2/model/fees-register-api-contract'

describe('CSV Upload Class Test', () => {

  let service
  let idamUser
  let feeVersion
  let fixedFee
  let rangedFee

  beforeEach(() => {
    service = new CSVUploadService()
    idamUser = {
      userInfo: ['freg'],
      bearerToken: 'aFakeToken',
      allInfo: {
        forename: 'John',
        surname: 'Doe'
      }
    }

    feeVersion = new FeeVersionDto()
    feeVersion.amount_type = 'flat'
    feeVersion.flat_amount = new FlatAmountDto()
    feeVersion.direction = 'enhanced'
    feeVersion.fee_order_name = 'xxx'
    feeVersion.memo_line = 'xxx'
    feeVersion.natural_account_code = 'xxx'
    feeVersion.si_ref_id = 'xxx'
    feeVersion.status = 'draft'
    feeVersion.valid_from = 'xxx'
    feeVersion.valid_to = 'xxx'

    fixedFee = new FixedFeeDto()
    fixedFee.channel = 'default'
    fixedFee.code = 'X0033'
    fixedFee.event = 'issue'
    fixedFee.jurisdiction1 = 23456
    fixedFee.jurisdiction2 = 'high court'
    fixedFee.fee_type = 'fixed'
    fixedFee.service = 0
    fixedFee.version = feeVersion

    rangedFee = new RangedFeeDto()
    rangedFee.range_unit = 'GBP'
    rangedFee.min_range = 0
    rangedFee.max_range = 200
    rangedFee.fee_type = 'ranged'
    rangedFee.jurisdiction1 = 'civil'
    rangedFee.jurisdiction2 = 'high court'
    rangedFee.code = 'X0034'
    rangedFee.event = 'issue'
    rangedFee.channel = 'default'
    rangedFee.service = 'civil monet claims'
    rangedFee.version = feeVersion

  })

  it('should return true', async () => {
    const fees: Object[] = [fixedFee, rangedFee]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    const importFees = await service.importFees(fees, mockExpressResponse)

    expect(importFees).to.have.property('success')
    expect(importFees.success).to.equal(true)
  })
})
