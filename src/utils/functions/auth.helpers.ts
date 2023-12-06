import { Request } from 'express';
import bcrypt from 'bcrypt';
import { JWT_ACCESS_SECRET, NODE_ENV } from '../env';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';
import { UserInfo } from '../interfaces/auth.interface';

export const generateAccessToken = (userId: string, userRole: UserRole) => {
  const user: UserInfo = {
    id: userId,
    role: userRole,
  };
  return jwt.sign({ user }, JWT_ACCESS_SECRET, {
    expiresIn: NODE_ENV === 'development' ? '7d' : '24h',
  });
};

export const getTokenFromRequest = (req: Request) => {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader?.split(' ')?.[1];
  return token;
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
};
