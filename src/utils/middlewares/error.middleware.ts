import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../http-exception';
import { logger } from '../logger';

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const message: string = error.message || 'Internal Server Error';
    const status: number = error.status || 500;

    logger.error(
      `[${req.method}] ${req.path} status:: ${status} message:: ${message}`,
    );

    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};
