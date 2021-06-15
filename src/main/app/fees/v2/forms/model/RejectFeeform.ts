import { IsOptional, Matches, MaxLength } from 'class-validator'
import { ValidationErrors } from 'fees/v2/forms/model/ValidationErrors'

export class RejectFeeForm {
    code?: string

    @IsOptional()
    @MaxLength(1000, { message: ValidationErrors.REASON_FOR_REJECTION_TOO_LONG })
    @Matches(/^([a-zA-Z0-9]*)$/, {
        message: ValidationErrors.ALPHA_NUMERIC
      })
    reasonForReject?: string

    constructor() {
        this.code = null
        this.reasonForReject = ''
    }

    static fromObject(value?: any): RejectFeeForm {

        if (!value) {
            return new RejectFeeForm()
        }

        const form: RejectFeeForm = new RejectFeeForm()
        Object.keys(value).forEach(key => form[key] = value[key])


        return form
    }
}