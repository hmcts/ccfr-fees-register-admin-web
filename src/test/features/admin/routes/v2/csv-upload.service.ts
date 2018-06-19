import { CsvUploadService } from 'features/admin/v2/services/csv-upload.service'

import { instance, mock, verify } from 'ts-mockito'
import { FeesClient } from 'fees/v2/feesClient'
import { FeeMapper } from 'fees/v2/model/fee-mapper'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'

let mockedFeeMapper: FeeMapper
let feeMapper: FeeMapper
let csvUploadService: CsvUploadService
let idamUser
let mockedCsvUploadService
let mockedFeesClient: FeesClient
let feesClient: FeesClient
let mockedCsvFee: CsvFeeDto
let csvFeeFixed: CsvFeeDto
let csvFeeRanged: CsvFeeDto

describe('CSV Upload Class Test', () => {
// Getting instance from mock
  beforeEach(() => {
    mockedCsvUploadService = mock(CsvUploadService)
    mockedFeesClient = mock(FeesClient)
    mockedCsvFee = mock(CsvFeeDto)
    mockedFeeMapper = mock(FeeMapper)
    csvFeeFixed = instance(mockedCsvFee)
    csvFeeFixed.feeType = 'fixed'
    csvFeeRanged = instance(mockedCsvFee)
    csvFeeRanged.feeType = 'ranged'
    feeMapper = instance(mockedFeeMapper)
    csvUploadService = instance(mockedCsvUploadService)
    feesClient = instance(mockedFeesClient)

    idamUser = {
      userInfo: ['freg'],
      bearerToken: 'aFakeToken',
      allInfo: {
        forename: 'John',
        surname: 'Doe'
      }

    }
  })

  it('should return true', async () => {
    const fees: CsvFeeDto[] = [csvFeeFixed, csvFeeRanged]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees,mockExpressResponse)).called()
  })
})
