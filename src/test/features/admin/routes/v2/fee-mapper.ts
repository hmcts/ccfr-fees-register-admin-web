import { instance, mock, verify } from 'ts-mockito'
import { FeeMapper } from 'fees/v2/model/fee-mapper'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'

let mockedFeeMapper: FeeMapper
let mockedCsvFeeDto: CsvFeeDto

// Getting instance from mock
let feeMapper: FeeMapper
let csvFeeDto: CsvFeeDto

describe('CSV FeeMapper mapping fees', () => {

  beforeEach(() => {
    mockedFeeMapper = mock(FeeMapper)
    mockedCsvFeeDto = mock(CsvFeeDto)
    feeMapper = instance(mockedFeeMapper)
    csvFeeDto = instance(mockedCsvFeeDto)
  })

  it('should return FixedFeeDto', () => {
    feeMapper.toFixedFeeDto(csvFeeDto)
    verify(mockedFeeMapper.toFixedFeeDto(csvFeeDto)).once()
  })

  it('should return RangedFeeDto', () => {
    feeMapper.toRangedFeeDto(csvFeeDto)
    verify(mockedFeeMapper.toRangedFeeDto(csvFeeDto)).once()
  })

})
