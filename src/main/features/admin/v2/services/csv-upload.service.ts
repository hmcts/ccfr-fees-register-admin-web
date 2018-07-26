import { FeeMapper } from 'fees/v2/model/fee-mapper'
import { FeesClient } from 'fees/v2/feesClient'
import * as express from 'express'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'

export class CsvUploadService {

  /**
   * Returns a promise with status of upload
   * @param {Object[]} fees
   * @param {e.Response} res
   * @returns {Promise<any>}
   */
  importFees (fees: CsvFeeDto[], res: express.Response) {
    return new Promise( async (resolve, reject) => {

      // loop through all fees
      for (let i = 0; i < fees.length; i++) {
        const csvFee: CsvFeeDto = fees[i]
        const feeMapper = new FeeMapper()

        // try and upload, if not catch and return "reject"
        try {
          if (csvFee.feeType.toLowerCase() === 'fixed') {
            await FeesClient.createFixedFee(res.locals.user, feeMapper.toFixedFeeDto(csvFee))
          } else if (csvFee.feeType.toLowerCase() === 'ranged') {
            await FeesClient.createRangedFee(res.locals.user, feeMapper.toRangedFeeDto(csvFee))
          } else if (csvFee.feeType.toLowerCase() === 'banded') {
            await FeesClient.createBandedFee(res.locals.user, feeMapper.toFixedFeeDto(csvFee))
          } else if (csvFee.feeType.toLowerCase() === 'rateable') {
            await FeesClient.createRateableFee(res.locals.user, feeMapper.toFixedFeeDto(csvFee))
          } else if (csvFee.feeType.toLowerCase() === 'relational') {
            await FeesClient.createRelationalFee(res.locals.user, feeMapper.toFixedFeeDto(csvFee))
          }
        } catch (err) {
          reject({ success: false, message: err.message })
        }
      }

      // otherwise resolve...
      resolve({ success: true })
    })
  }

}
