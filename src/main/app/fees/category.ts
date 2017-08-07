import Range from 'app/fees/range'
import Fee from 'app/fees/fee'

export default class Category {
  code: string
  description: string
  ranges: Array<Range>
  fees: Array<Fee>

  constructor (code: string, description: string, ranges: Array<Range>, fees: Array<Fee>) {
    this.code = code
    this.description = description
    this.ranges = ranges
    this.fees = fees
  }
}
