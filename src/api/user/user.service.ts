import { UserRole } from '@prisma/client';
import { prisma } from '../../prisma';
import { SUCCESS_MESSAGE } from '../../utils/constants';
import { CreateTeamMemberReqDto } from './dtos/create-team-member.dto';
import { hashPassword } from '../../utils/functions/auth-helpers';

const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

const findUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};

const createTeamMember = async (
  createTeamMemberReqDto: CreateTeamMemberReqDto,
) => {
  const { email, password } = createTeamMemberReqDto;

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: UserRole.MP,
    },
  });

  return { message: SUCCESS_MESSAGE };
};

export { findUserByEmail, findUserById, createTeamMember };
