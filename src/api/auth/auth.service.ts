import { findUserByEmail, findUserById } from '../user/user.service';
import { LoginReqDto } from './dtos/login.dto';
import { HttpException } from '../../utils/http-exception';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../../utils/functions/auth-helpers';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { UserRole } from '@prisma/client';
import { CUSTOM_ERROR_MESSAGES } from '../../utils/constants';

const loginUser = async (loginDto: LoginReqDto) => {
  const { identifier, password } = loginDto;

  const user = await findUserByEmail(identifier);

  if (!user) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.INVALID_LOGIN, 400);
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.INVALID_LOGIN, 400);
  }

  const accessToken = generateAccessToken(user.id, user.role);

  return { accessToken };
};

const getMyProfile = async (reqUser: UserInfo) => {
  if (reqUser.role === UserRole.ADMIN) return reqUser;

  const teamMemberUser = await findUserById(reqUser.id);

  return {
    id: teamMemberUser?.id,
    role: teamMemberUser?.role,
    email: teamMemberUser?.email,
  };
};

export { loginUser, getMyProfile };
