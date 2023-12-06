import { plainToInstance } from 'class-transformer';
import { RequestHandler } from 'express';

export const transformationMiddleware = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: any,
  value: 'body' | 'query' | 'params' = 'body',
): RequestHandler => {
  return (req, _res, next) => {
    req[value] = plainToInstance(type, req[value]);
    next();
  };
};
