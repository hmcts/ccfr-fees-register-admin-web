import * as express from 'express'
import * as multer from 'multer'
import * as csv from 'csv-string'
import * as fastCsv from 'fast-csv'

import { Paths } from 'admin/paths'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'
import { CreateFixedFee } from 'fees/v2/forms/model/CreateFixedFee'
import { FeesClient } from 'fees/v2/feesClient'
import { CreateRangedFee } from 'fees/v2/forms/model/CreateRangedFee'

const upload = multer ( { inMemory: true } ).single ( 'csvdata' )

function getCsvData ( arr ) {
  return new Promise ( function ( resolve, reject ) {
    const records = []

    fastCsv.fromString ( arr, { headers: true } )
      .on ( 'data', function ( data ) {
        records.push ( data )
      } )
      .on ( 'end', function () {
        resolve ( records )
      } )
  } )
}

export default express.Router ()
  .get ( Paths.csvUploadPage.uri, ( req: express.Request, res: express.Response ) => {
    res.render ( Paths.csvUploadPage.associatedView )
  } )

  .get ( Paths.createBulkFeesPage.uri, ( req: express.Request, res: express.Response ) => {
    res.render ( Paths.createBulkFeesPage.associatedView )
  } )

  .get ( Paths.csvToJsonPage.uri, ( req: express.Request, res: express.Response ) => {
    res.render ( Paths.csvToJsonPage.associatedView, { jsonData: 'No data found.' } )
  } )

  .post ( Paths.csvImportFeePage.uri, upload, ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
    if ( !req.file ) {

      res.render ( Paths.csvUploadPage.associatedView, { UPLOAD_ERR_MSG: 'No file was uploaded.', UPLOAD_ERR: true } )
    } else {

      const index = req.file.originalname.indexOf ( '.' )
      if ( index > 0 && req.file.originalname.substr ( index + 1 ) !== 'csv' ) {
        res.render ( Paths.csvUploadPage.associatedView, {
          UPLOAD_ERR_MSG: req.file.originalname.substr ( index + 1 ) + ' extension file upload not supported.',
          UPLOAD_ERR: true
        } )
      }

      const arr = csv.parse ( req.file.buffer.toString () )
      const csvStr = csv.stringify ( arr )
      getCsvData ( csvStr ).then ( function ( records ) {
        const data = JSON.stringify ( records )
        let CsvFeeDtos = JSON.parse ( data ) as CsvFeeDto
        res.render ( Paths.csvImportFeePage.associatedView, {
          csvFeeDtos: CsvFeeDtos,
          resObj: JSON.stringify ( CsvFeeDtos ),
          env: process.env.NODE_ENV
        } )
      } )
    }
  } )

  .post ( Paths.createBulkFeesPage.uri, async ( req: express.Request, res: express.Response ) => {
    const csvFees: Object[] = JSON.parse(req.body.csvFees)

    for (let i = 0; i < csvFees.length; i++) {
      const csvFee: any = csvFees[i]
      try {
        if (csvFee.feeType === 'fixed') {
          const fixedFee = new CreateFixedFee()
          await FeesClient.createFixedFee(res.locals.user, fixedFee.createFixedFeeDto(csvFee))
        } else if (csvFee.feeType === 'ranged') {
          const rangedFee = new CreateRangedFee()
          await FeesClient.createRangedFee(res.locals.user, rangedFee.createRangedFeeDto(csvFee))
        }
      } catch (err) {
        return res.render(Paths.createBulkFeesPage.associatedView, {errCause: err.message, bulkFeeError: true})
      }
    }

    return res.render(Paths.createBulkFeesPage.associatedView, {
      msg: 'Successfully saved the csv fees.',
      success: true
    })
  } )

  .post ( Paths.csvToJsonPage.uri, ( req: express.Request, res: express.Response ) => {
    res.render ( Paths.csvToJsonPage.associatedView, { jsonData: req.body.csvFees } )
  } )
