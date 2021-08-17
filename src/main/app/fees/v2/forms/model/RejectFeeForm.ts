import { IsDefined, MaxLength } from 'class-validator'
import { IsNotBlank } from 'app/forms/validation/validators/isBlank'
import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'
import { ReasonDto } from 'app/fees/v2/model/fees-register-api-contract'

export class RejectFeeForm {
  code?: string

  @IsDefined({ message: ValidationErrors.REASON_FOR_REJECTION_REQUIRED })
  @IsNotBlank({ message: ValidationErrors.REASON_FOR_REJECTION_REQUIRED })
  @MaxLength(1000, { message: ValidationErrors.REASON_FOR_REJECTION_TOO_LONG })

	reasonForReject?: string

  constructor () {
    this.code = null
    this.reasonForReject = ''
  }

  static fromObject (value?: any): RejectFeeForm {

    if (!value) {
      return new RejectFeeForm()
    }

    const form: RejectFeeForm = new RejectFeeForm()
    Object.keys(value).forEach(key => form[key] = value[key])
    return form

  }

  toDto (): ReasonDto {

    const dto = new ReasonDto()
    dto.reasonForReject = this.reasonForReject

    return this.fillCommon(dto)

  }

  private fillCommon (dto: ReasonDto): ReasonDto {

    dto.reasonForReject = this.reasonForReject

    return dto
  }
}
