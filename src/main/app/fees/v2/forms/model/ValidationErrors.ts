export class ValidationErrors {

  static readonly CODE_REQUIRED: string = 'Enter code'
  static readonly CODE_TOO_LONG: string = 'Enter code no longer than $constraint1 characters'
  static readonly CODE_INVALID_CHARACTERS: string = 'Enter code containing on alphanumeric characters, underscore or dash'
  static readonly CODE_EXISTS: string = 'Enter code that does not exist'

  static readonly DESCRIPTION_REQUIRED: string = 'Enter description'
  static readonly DESCRIPTION_TOO_LONG: string = 'Enter description no longer than $constraint1 characters'

  static readonly TYPE_REQUIRED: string = 'Enter type'

  static readonly AMOUNT_REQUIRED: string = 'Enter amount'
  static readonly AMOUNT_NOT_NEGATIVE: string = 'Enter amount equal or greater than zero'
  static readonly AMOUNT_TOO_BIG: string = 'Enter amount lower than 10,000,000'
  static readonly AMOUNT_INVALID_DECIMALS: string = 'Enter amount with maximum two decimal places'

  static readonly PERCENTAGE_REQUIRED: string = 'Enter percentage'
  static readonly PERCENTAGE_GREATER_THAN_0: string = 'Enter percentage greater than 0'
  static readonly PERCENTAGE_LOWER_THAN_100: string = 'Enter percentage equal or lower than 100'
  static readonly PERCENTAGE_INVALID_DECIMALS: string = 'Enter percentage with maximum two decimal places'

  static readonly JURISDICTION1_REQUIRED: string = 'Select a jurisdiction1'
  static readonly JURISDICTION2_REQUIRED: string = 'Select a jurisdiction2'
  static readonly CHANNEL_REQUIRED: string = 'Select a channel'
  static readonly EVENT_REQUIRED: string = 'Select a event'
  static readonly SERVICE_REQUIRED: string = 'Select a service'

}
