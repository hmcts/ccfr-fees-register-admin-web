export default class FlatFee {
  id: string
  type: string
  description: string
  amount: number
  percentage: number

  constructor (id: string, type: string, description: string, amount: number, percentage: number) {
    this.id = id
    this.type = type
    this.description = description
    this.amount = amount
    this.percentage = percentage
  }
}
