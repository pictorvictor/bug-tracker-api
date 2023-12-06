import { UserRole } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  user?: UserInfo;
}

export interface UserInfo {
  id: string;
  role: UserRole;
}

export interface JwtPayloadWithUser extends JwtPayload {
  user?: UserInfo;
}
