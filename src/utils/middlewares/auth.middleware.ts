import { NextFunction, Response } from 'express';
import { CUSTOM_ERROR_MESSAGES } from '../constants';
import { HttpException } from '../http-exception';
import { getTokenFromRequest } from '../functions/auth.helpers';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../env';
import {
  JwtPayloadWithUser,
  RequestWithUser,
} from '../interfaces/auth.interface';

export const authMiddleware = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
) => {
  const token = getTokenFromRequest(req) as string;
  if (!token) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.UNAUTHORIZED, 401));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_ACCESS_SECRET) as JwtPayloadWithUser;
  } catch (e) {
    return next(new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403));
  }

  const { user } = payload;
  req.user = user;

  return next();
};
