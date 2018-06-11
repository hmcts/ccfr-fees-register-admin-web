import { expect } from 'chai'
import { CreateFeeForm } from 'app/fees/v2/forms/model/CreateFeeForm'

let version = 1

let fee = {

  applicant_type: {
    name: 'xxx'
  },

  channel_type: {
    name: 'xxx'
  },

  event_type: {
    name: 'event_xxx'
  },

  service_type: {
    name: 'xxx'
  },

  jurisdiction1: {
    name: 'xxx'
  },

  jurisdiction2: {
    name: 'xxx'
  },

  fee_type: 'ranged',

  min_range: 1,
  max_range: 100,

  fee_versions: [
    {
      version: 1,
      flat_amount: {
        amount: 100
      }
    }
  ]

}

let feeVolume = {

  applicant_type: {
    name: 'xxx'
  },

  channel_type: {
    name: 'xxx'
  },

  event_type: {
    name: 'event_xxx'
  },

  service_type: {
    name: 'xxx'
  },

  jurisdiction1: {
    name: 'xxx'
  },

  jurisdiction2: {
    name: 'xxx'
  },

  fee_versions: [
    {
      version: 1,
      volume_amount: {
        amount: 99
      }
    }
  ]

}

let feePercentage = {

  applicant_type: {
    name: 'xxx'
  },

  channel_type: {
    name: 'xxx'
  },

  event_type: {
    name: 'event_xxx'
  },

  service_type: {
    name: 'xxx'
  },

  jurisdiction1: {
    name: 'xxx'
  },

  jurisdiction2: {
    name: 'xxx'
  },

  fee_versions: [
    {
      version: 1,
      percentage_amount: {
        percentage: 98
      }
    }
  ]

}

let feeForm = CreateFeeForm.fromGivenVersion ( fee, version, true )

describe ( 'CreateFeeForm', () => {

  describe ( 'toDto', () => {

    it ( 'should convert a form with flat amount to dto', () => {

      let dto = feeForm.toDto ()

      expect ( dto.version.flat_amount.amount ).to.equal ( feeForm.amount )

    } )

    it ( 'should convert a form with volume amount to dto', () => {

      let feeForm = CreateFeeForm.fromGivenVersion(feeVolume,1,true)

      let dto = feeForm.toDto ()

      expect ( dto.version.volume_amount.amount ).to.equal ( feeForm.amount )

    } )

    it ( 'should convert a form with percentage amount to dto', () => {

      let feeForm = CreateFeeForm.fromGivenVersion(feePercentage,1,true)

      let dto = feeForm.toDto ()

      expect ( dto.version.percentage_amount.percentage ).to.equal ( feeForm.percentage )

    } )

  } )

  describe ( 'fromObject', () => {

    it ( 'should convert any to form', () => {

      let feeForm2 = CreateFeeForm.fromObject ( feeForm )

      expect ( feeForm2.amount ).to.equal ( feeForm.amount )
      expect ( feeForm2.amountType ).to.equal ( feeForm2.amountType )
      expect ( feeForm2.fromRange ).to.equal ( feeForm.fromRange )
      expect ( feeForm2.toRange ).to.equal ( feeForm.toRange )

    } )

    it ( 'should convert any to form', () => {

      let feeForm = CreateFeeForm.fromGivenVersion ( feePercentage, 1, true )

      let feeForm2 = CreateFeeForm.fromObject ( feeForm )

      expect ( feeForm2.percentage ).to.equal ( feeForm.percentage )
      expect ( feeForm2.amountType ).to.equal ( feeForm2.amountType )
      expect ( feeForm2.fromRange ).to.equal ( feeForm.fromRange )
      expect ( feeForm2.toRange ).to.equal ( feeForm.toRange )

    } )

  } )

  describe ( 'fromGivenVersion', () => {
    it ( 'should convert a fee with flat amount into the form data', () => {

      let feeForm = CreateFeeForm.fromGivenVersion ( fee, version, false )

      expect ( feeForm.amount ).to.equal ( 100 )
      expect ( feeForm.amountType ).to.equal ( 'flat' )
    } )

    it ( 'should convert a fee with volume amount into the form data', () => {

      let feeForm = CreateFeeForm.fromGivenVersion ( feeVolume, version, false )

      expect ( feeForm.amount ).to.equal ( 99 )
      expect ( feeForm.amountType ).to.equal ( 'volume' )
    } )

    it ( 'should convert a fee with percentage amount into the form data', () => {

      let feeForm = CreateFeeForm.fromGivenVersion ( feePercentage, version, false )

      expect ( feeForm.percentage ).to.equal ( 98 )
      expect ( feeForm.amountType ).to.equal ( 'percentage' )
    } )

    it ( 'should convert a ranged fee into the form data', () => {

      let feeForm = CreateFeeForm.fromGivenVersion ( fee, version, false )

      expect ( feeForm.fromRange ).to.equal ( fee.min_range )
      expect ( feeForm.toRange ).to.equal ( fee.max_range )
    } )

  } )
}
)
