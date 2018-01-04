import * as express from 'express'
import * as multer from 'multer'
import * as csv from 'csv-string'
import * as fastCsv from 'fast-csv'

import { Paths } from 'admin/paths'
import { CsvFeeDto } from 'fees/v2/model/csv-contract'
import { CreateFixedFeeDto } from 'fees/v2/model/fees-register-api-contract'
import { FeesClient } from 'fees/v2/feesClient'
import { CreateBulkFixedFee } from 'fees/v2/forms/model/CreateBulkFixedFee'

const upload = multer({ inMemory: true }).single('csvdata')

function getCsvData (arr) {
  return new Promise(function (resolve, reject) {
    const records = []

    fastCsv.fromString(arr, {headers: true})
      .on('data', function (data) {
        records.push(data)
      })
      .on('end', function () {
        resolve(records)
      })
  })
}

export default express.Router()
  .get(Paths.csvUploadPage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.csvUploadPage.associatedView)
  })

  .get(Paths.createBulkFeesPage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.createBulkFeesPage.associatedView)
  })

  .get(Paths.csvToJsonPage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.csvToJsonPage.associatedView, {jsonData: 'No data found.'})
  })

  .post(Paths.csvImportFeePage.uri, upload, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.file) {
      console.log('No upload file received')
      res.render(Paths.csvUploadPage.associatedView, { UPLOAD_ERR_MSG: 'No file was uploaded.', UPLOAD_ERR: true})
    } else {
      console.log('Upload file received:' + req.file.size)
      console.log('Uploaded file name:' + req.file.originalname)

      const index = req.file.originalname.indexOf('.')
      if (index > 0 && req.file.originalname.substr(index + 1) !== 'csv') {
        res.render(Paths.csvUploadPage.associatedView, { UPLOAD_ERR_MSG: req.file.originalname.substr(index + 1) + ' extension file upload not supported.', UPLOAD_ERR: true})
      }

      const arr = csv.parse(req.file.buffer.toString())
      const csvStr = csv.stringify(arr)
      getCsvData(csvStr).then(function (records) {
        const data = JSON.stringify(records)
        console.log('import fee json: ' + data)

        let CsvFeeDtos = JSON.parse(data) as CsvFeeDto
        res.render(Paths.csvImportFeePage.associatedView, {csvFeeDtos: CsvFeeDtos, resObj: JSON.stringify(CsvFeeDtos), env: process.env.NODE_ENV})
      })
    }
  })

  .post(Paths.createBulkFeesPage.uri, (req: express.Request, res: express.Response) => {
    const csvFees: Object[] = JSON.parse(req.body.csvFees)
    const fixedFees = []

    csvFees.forEach((csvFee: CsvFeeDto) => {
      console.log('Fee code: ' + csvFee.feeCode)

      const fixedFee = new CreateBulkFixedFee()
      fixedFees.push(fixedFee.createFixedFeeDto(csvFee))
    })

    FeesClient.createBulkFixedFee(res.locals.user, fixedFees as CreateFixedFeeDto[])
      .then(() => res.render(Paths.createBulkFeesPage.associatedView, {msg: 'Successfully saved the csv fixed fees.', success: true}))
      .catch(
        (err: Error) => {
          res.render(Paths.createBulkFeesPage.associatedView, {errCause: err.message, bulkFeeError: true})
        }
      )
  })

  .post(Paths.csvToJsonPage.uri, (req: express.Request, res: express.Response) => {
    res.render(Paths.csvToJsonPage.associatedView, {jsonData: req.body.csvFees})
  })
