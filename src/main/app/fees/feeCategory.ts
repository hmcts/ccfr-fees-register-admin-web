import FeeRange from 'app/fees/feeRange'
import FlatFee from 'app/fees/flatFee'

export default class FeeCategory {
  id: string
  ranges: Array<FeeRange>
  flatFees: Array<FlatFee>

  constructor (id: string, ranges: Array<FeeRange>, flatFees: Array<FlatFee>) {
    this.id = id
    this.ranges = ranges
    this.flatFees = flatFees
  }
}
