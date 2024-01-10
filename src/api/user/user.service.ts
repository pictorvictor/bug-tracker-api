import { UserRole } from '@prisma/client';
import { prisma } from '../../prisma';
import { AvailableForRegisterUserRoles } from '../../utils/constants';

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

const getAllUsers = async () => {
  const roles = Object.values(AvailableForRegisterUserRoles);
  const users: any[] = [];

  for (const role of roles) {
    users.push(await getUsersByRole(role as UserRole));
  }

  return users.flat();
};

const getUsersByRole = async (role: UserRole) => {
  const users = await prisma.user.findMany({
    where: {
      role,
    },
    select: {
      id: true,
      email: true,
      role: true,
      teamMemberInfo: {
        select: {
          projects: true,
          id: true,
        },
      },
      testerInfo: {
        select: {
          projects: true,
          id: true,
        },
      },
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

export { findUserByEmail, findUserById, getAllUsers, getUsersByRole };
