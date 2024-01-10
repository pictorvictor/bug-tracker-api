import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import { HttpException } from '../http-exception';

function processErrors(
  errors: ValidationError[] | undefined,
  messages: Set<string> = new Set<string>(),
  parentProperty = '',
): Set<string> {
  if (!errors) {
    return messages;
  }
  errors.forEach((childError: ValidationError) => {
    if (childError?.children?.length === 0) {
      Object.values(childError.constraints || {}).forEach((errorMessage) =>
        messages.add(`${parentProperty}${errorMessage}`),
      );
    } else {
      const property = childError.property;
      const propertyWithDot = parentProperty
        ? `${parentProperty}.${property}`
        : property;
      processErrors(childError.children, messages, `${propertyWithDot}.`);
    }
  });
  return messages;
}

const validationMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = false,
): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessages = processErrors(errors);
        const message = [...errorMessages].join(', ');
        next(new HttpException(message, 400));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
