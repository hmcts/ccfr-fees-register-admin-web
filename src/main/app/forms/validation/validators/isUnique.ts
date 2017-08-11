import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

/**
 * Verify a valid value with minimum and maxumim digits allowed after decimal point.
 */
export function IsUnique (uniquenessCheck: (value: any) => Promise<boolean>, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate (value: any, args: ValidationArguments) {
          return uniquenessCheck(value)
        }
      }
    })
  }
}
