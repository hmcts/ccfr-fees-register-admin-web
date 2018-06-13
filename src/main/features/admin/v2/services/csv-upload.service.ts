import { FeeMapper } from 'fees/v2/model/fee-mapper'
import { FeesClient } from 'fees/v2/feesClient'
import * as express from 'express'

export class CSVUploadService {

  /**
   * Returns a promise with status of upload
   * @param {Object[]} fees
   * @param {e.Response} res
   * @returns {Promise<any>}
   */
  importFees (fees: Object[], res: express.Response) {
    return new Promise( async (resolve, reject) => {

      // loop through all fees
      for (let i = 0; i < fees.length; i++) {
        const csvFee: any = fees[i]
        const feeMapper = new FeeMapper()

        // try and upload, if not catch and return "reject"
        try {
          if (csvFee.feeType === 'fixed') {
            await FeesClient.createFixedFee(res.locals.user, feeMapper.toFixedFeeDto(csvFee))
          } else if (csvFee.feeType === 'ranged') {
            await FeesClient.createRangedFee(res.locals.user, feeMapper.toRangedFeeDto(csvFee))
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
