import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import moment from 'moment';
import { findUserByEmail } from '../../api/user/user.service';

@ValidatorConstraint({ async: false })
class IsDateOnlyConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    if (typeof value !== 'string') {
      return false;
    }
    const date = moment(value, 'YYYY-MM-DD');
    return date.isValid();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid date. Use the format: YYYY-MM-DD`;
  }
}

function IsDateOnly(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateOnlyConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
export class IsIdentifierNotRegistered implements ValidatorConstraintInterface {
  async validate(identifier: unknown, args: ValidationArguments) {
    if (typeof identifier !== 'string') return false;
    const identifierType = args.constraints;
    if (identifierType[0] === 'email') {
      const user = await findUserByEmail(identifier);
      return !user;
    } else return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an available identifier.`;
  }
}

function IsIdentifierAvailable(identifier: string) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      constraints: [identifier],
      validator: IsIdentifierNotRegistered,
    });
  };
}

export { IsDateOnly, IsIdentifierAvailable };
