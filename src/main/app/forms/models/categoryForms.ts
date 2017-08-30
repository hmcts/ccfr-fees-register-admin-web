import {IsDefined, Matches, MaxLength} from 'class-validator'
import {IsNotBlank} from 'app/forms/validation/validators/isBlank'
import {IsUnique} from 'app/forms/validation/validators/isUnique'
import {FeesClient} from 'fees/feesClient'
import Category from 'app/fees/category'
import RangeGroup from 'app/fees/rangeGroup'
import Fee from 'app/fees/fee'

export class ValidationErrors {
  static readonly CODE_REQUIRED: string = 'Enter code'
  static readonly CODE_TOO_LONG: string = 'Enter code no longer than $constraint1 characters'
  static readonly CODE_INVALID_CHARACTERS: string = 'Enter code containing on alphanumeric characters, underscore or dash'
  static readonly CODE_EXISTS: string = 'Enter code that does not exist'

  static readonly DESCRIPTION_REQUIRED: string = 'Enter description'
  static readonly DESCRIPTION_TOO_LONG: string = 'Enter description no longer than $constraint1 characters'

}

export class FeeForm {
  @IsDefined({message: ValidationErrors.CODE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.CODE_REQUIRED})
  @MaxLength(50, {message: ValidationErrors.CODE_TOO_LONG})
  @Matches(/^[A-Za-z0-9_-]+$/, {message: ValidationErrors.CODE_INVALID_CHARACTERS})
  feeCode?: string

  constructor (feeCode?: string) {
    this.feeCode = feeCode
  }

  static fromObject (value?: any): FeeForm {
    if (!value) {
      return value
    }

    const feeCode = value.feeCode ? value.feeCode : undefined

    return new FeeForm(feeCode)
  }
}

export class EditCategoryForm {
  @IsDefined({message: ValidationErrors.CODE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.CODE_REQUIRED})
  @MaxLength(50, {message: ValidationErrors.CODE_TOO_LONG})
  @Matches(/[A-Za-z0-9_-]/, {message: ValidationErrors.CODE_INVALID_CHARACTERS})
  code?: string

  @IsDefined({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @IsNotBlank({message: ValidationErrors.DESCRIPTION_REQUIRED})
  @MaxLength(2000, {message: ValidationErrors.DESCRIPTION_TOO_LONG})
  description?: string

  rangeGroupCode?: string

  feeCodes?: FeeForm[]

  constructor (code?: string, description?: string, rangeGroupCode?: string, feeCodes?: FeeForm[]) {
    this.code = code
    this.description = description
    this.rangeGroupCode = rangeGroupCode
    this.feeCodes = feeCodes
  }

  static fromObject (value?: any): EditCategoryForm {
    if (!value) {
      return value
    }

    const code = value.code ? value.code : undefined
    const description = value.description ? value.description : undefined
    const rangeGroupCode = value.rangeGroupCode ? value.rangeGroupCode : undefined
    const feeCodes = value.feeCodes ? value.feeCodes.map(FeeForm.fromObject) : []

    return new EditCategoryForm(code,description, rangeGroupCode, feeCodes)
  }

  addFee (): EditCategoryForm {
    this.feeCodes.push(new FeeForm())
    return this
  }

  deleteLastFee (): EditCategoryForm {
    this.feeCodes.splice(-1)
    return this
  }

  toCategory (): Category {

    let deDuplicatedFees = Array.from(this.feeCodes.reduce((m, t) => m.set(t.feeCode, t), new Map()).values())

    return new Category(this.code, this.description, new RangeGroup(this.rangeGroupCode,null,null), deDuplicatedFees.map(fee => new Fee(
        fee.feeCode, null, null, null, null))

      )

  }

}

export class CreateCategoryForm {
  @IsDefined({message: ValidationErrors.CODE_REQUIRED})
  @IsNotBlank({message: ValidationErrors.CODE_REQUIRED})
  @MaxLength(50, {message: ValidationErrors.CODE_TOO_LONG})
  @Matches(/[A-Za-z0-9_-]+/, {message: ValidationErrors.CODE_INVALID_CHARACTERS})
  @IsUnique((value) => FeesClient.checkCategoryExists(value).then((exists) => !exists), {message: ValidationErrors.CODE_EXISTS})
  code?: string

  constructor (code?: string) {
    this.code = code
  }

  static fromObject (value?: any): CreateCategoryForm {
    if (!value) {
      return value
    }

    const code = value.code ? value.code : undefined

    return new CreateCategoryForm(code)
  }
}
