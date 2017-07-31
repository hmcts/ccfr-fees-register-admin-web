import Fee from 'app/fees/fee'

export default class FeeRange {
  from: number
  to: number
  fee: Fee

  constructor (from: number, to: number, fee: Fee) {
    this.from = from
    this.to = to
    this.fee = fee
  }
}
