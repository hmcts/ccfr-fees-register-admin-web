import FlatFee from 'app/fees/flatFee'

export default class FeeRange {
  start: number
  upto: number
  fee: FlatFee

  constructor (start: number, upto: number, fee: FlatFee) {
    this.start = start
    this.upto = upto
    this.fee = fee
  }
}
