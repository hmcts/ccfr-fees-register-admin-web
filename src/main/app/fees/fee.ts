export default class Fee {
  id: number
  code: string
  type: string
  description: string
  amount: number
  percentage: number

  constructor (id: number, code: string, type: string, description: string, amount: number, percentage: number) {
    this.id = id
    this.code = code
    this.type = type
    this.description = description
    this.amount = amount
    this.percentage = percentage
  }
}
