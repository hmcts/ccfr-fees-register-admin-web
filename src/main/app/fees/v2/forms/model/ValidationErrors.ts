export class ValidationErrors {

  static readonly CODE_REQUIRED: string = 'Enter code'
  static readonly CODE_TOO_LONG: string = 'Enter code no longer than $constraint1 characters'
  static readonly CODE_INVALID_CHARACTERS: string = 'Enter code containing on alphanumeric characters, underscore or dash'
  static readonly CODE_EXISTS: string = 'Enter code that does not exist'

  static readonly DESCRIPTION_REQUIRED: string = 'Enter description'
  static readonly DESCRIPTION_TOO_LONG: string = 'Enter description no longer than $constraint1 characters'

  static readonly VERSION_EXISTS: string = 'Enter version that does not exist'
  static readonly VERSION_REQUIRED: string = 'Enter the version number'

  static readonly MEMO_LINE_REQUIRED: string = 'Enter memo line'
  static readonly MEMO_LINE_TOO_LONG: string = 'Enter a memo line no longer than $constraint1 characters'

  static readonly TYPE_REQUIRED: string = 'Enter type'

  static readonly NAC_REQUIRED: string = 'Enter natural account code'

  static readonly FROM_DATE_REQUIRED: string = 'Enter From Date'

  static readonly TO_DATE_REQUIRED: string = 'Enter To Date'

  static readonly STATUTORY_INSTRUMENT_REQUIRED: string = 'Enter Statutory Instrument'

  static readonly SI_REF_ID_REQUIRED: string = 'Enter SI Ref ID'

  static readonly FEE_ORDER_NAME_REQUIRED: string = 'Enter Fee Order Name'

  static readonly ALPHA_NUMERIC_WITH_HYPHEN: string = 'Keyword should not have special characters except hyphen'

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
  static readonly DIRECTION_REQUIRED: string = 'Select a direction'
  static readonly REASON_FOR_UPDATE_REQUIRED: string = 'Enter reason for update'
  static readonly APPLICATION_TYPE_REQUIRED: string = 'Select an applicant type'
  static readonly RANGE_UNIT_REQUIRED: string = 'Select a unit for the range'

}
