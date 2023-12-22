import { UserRole } from '@prisma/client';
import { prisma } from '../../prisma';

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

const getAllUsers = async (role: UserRole) => {
  const users = await prisma.user.findMany({
    where: {
      role: {
        equals: role,
      },
    },
    select: {
      id: true,
      email: true,
      role: true,
      teamMemberInfo:
        role == 'MP'
          ? {
              select: {
                projects: true,
              },
            }
          : false,
      testerInfo:
        role == 'TST'
          ? {
              select: {
                projects: true,
              },
            }
          : false,
    },
  });

  return users.map((user: any) => {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      projects: user.teamMemberInfo?.projects || user.testerInfo?.projects,
    };
  });
};

export { findUserByEmail, findUserById, getAllUsers };
