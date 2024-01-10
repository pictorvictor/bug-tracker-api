import { findUserByEmail, findUserById } from '../user/user.service';
import { LoginReqDto } from './dtos/login.dto';
import { HttpException } from '../../utils/http-exception';
import bcrypt from 'bcrypt';
import {
  generateAccessToken,
  hashPassword,
} from '../../utils/functions/auth.helpers';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { CUSTOM_ERROR_MESSAGES } from '../../utils/constants';
import { RegisterReqDto } from './dtos/register.dto';
import { prisma } from '../../prisma';

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
  const user = await findUserById(reqUser.id);

  const repos: any = await prisma.project.findMany({
    where: {
      OR: [
        {
          projectTeam: {
            some: {
              id: reqUser.id,
            },
          },
        },
        {
          testerTeam: {
            some: {
              id: reqUser.id,
            },
          },
        },
      ],
    },
    select: {
      id: true,
      projectTeam: {
        select: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
      testerTeam: {
        select: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
      projectName: true,
      repositoryName: true,
      owner: {
        select: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  });

  const projects = repos.map((repo: any) => {
    return {
      id: repo.id,
      name: repo.projectName,
      link: repo.repositoryName,
      teamMembers: repo.projectTeam,
      testers: repo.testerTeam,
      owner: repo.owner,
    };
  });

  return {
    id: user?.id,
    role: user?.role,
    email: user?.email,
    projects,
  };
};

const register = async (registerReqDto: RegisterReqDto) => {
  const { identifier, role, password } = registerReqDto;
  const foundUser = await findUserByEmail(identifier);
  if (foundUser)
    throw new HttpException(CUSTOM_ERROR_MESSAGES.USER_ALREADY_TAKEN, 400);

  const teamMemberInfo = role == 'MP' ? { create: {} } : undefined;
  const testerInfo = role == 'TST' ? { create: {} } : undefined;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email: identifier,
      password: hashedPassword,
      role,
      teamMemberInfo,
      testerInfo,
    },
  });

  const accessToken = generateAccessToken(user.id, user.role);

  return { accessToken };
};
export { loginUser, getMyProfile, register };
