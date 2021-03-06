import { CsvUploadService } from 'features/admin/v2/services/csv-upload.service'

import { instance, mock, verify } from 'ts-mockito'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'

let csvUploadService: CsvUploadService
let idamUser
let mockedCsvUploadService
let mockedCsvFee: CsvFeeDto
let csvFeeFixed: CsvFeeDto
let csvFeeRanged: CsvFeeDto
let csvFeeBanded: CsvFeeDto
let csvFeeRateable: CsvFeeDto
let csvFeeRelational: CsvFeeDto

describe('CSV Upload Class Test', () => {
// Getting instance from mock
  beforeEach(() => {
    mockedCsvUploadService = mock(CsvUploadService)

    mockedCsvFee = mock(CsvFeeDto)

    csvFeeFixed = instance(mockedCsvFee)
    csvFeeFixed.feeType = 'fixed'
    csvFeeBanded = instance(mockedCsvFee)
    csvFeeBanded.feeType = 'banded'
    csvFeeRelational = instance(mockedCsvFee)
    csvFeeRelational.feeType = 'relational'
    csvFeeRateable = instance(mockedCsvFee)
    csvFeeRateable.feeType = 'rateable'
    csvFeeRanged = instance(mockedCsvFee)
    csvFeeRanged.feeType = 'ranged'
    csvUploadService = instance(mockedCsvUploadService)

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
    const fees: CsvFeeDto[] = [csvFeeFixed]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees, mockExpressResponse)).called()
  })
  it('should return true', async () => {
    const fees: CsvFeeDto[] = [csvFeeRanged]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees, mockExpressResponse)).called()
  })
  it('should return true', async () => {
    const fees: CsvFeeDto[] = [csvFeeBanded]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees, mockExpressResponse)).called()
  })
  it('should return true', async () => {
    const fees: CsvFeeDto[] = [csvFeeRateable]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees, mockExpressResponse)).called()
  })
  it('should return true', async () => {
    const fees: CsvFeeDto[] = [csvFeeRelational]
    const mockExpressResponse = require('node-mocks-http/lib/express/mock-express').response
    mockExpressResponse.locals = { user: idamUser }
    csvUploadService.importFees(fees, mockExpressResponse)
    verify(mockedCsvUploadService.importFees(fees, mockExpressResponse)).called()
  })
})
