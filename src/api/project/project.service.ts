import { prisma } from '../../prisma';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { CreateProjectReqDto } from './dtos/create-project.dto';
import { CUSTOM_ERROR_MESSAGES, SUCCESS_MESSAGE } from '../../utils/constants';

const createProject = async (reqUser: UserInfo, body: CreateProjectReqDto) => {
  const { repositoryName, projectName, projectMembers, testers } = body;
  const { id: userId } = reqUser;
  let memberUsers: any[] = [];
  if (projectMembers)
    memberUsers = await prisma.user.findMany({
      where: {
        id: {
          in: projectMembers,
        },
      },
      include: {
        teamMemberInfo: true,
      },
    });

  let testerUsers: any[] = [];
  if (testers)
    testerUsers = await prisma.user.findMany({
      where: {
        id: {
          in: testers,
        },
      },
      include: {
        testerInfo: true,
      },
    });

  const requestUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      teamMemberInfo: true,
    },
  });

  await prisma.project.create({
    data: {
      projectName,
      repositoryName,
      owner: {
        connect: {
          id: requestUser?.teamMemberInfo?.id,
        },
      },
      projectTeam: {
        connect: [
          ...(memberUsers?.map((user) => ({ id: user?.teamMemberInfo?.id })) ??
            []),
          { id: requestUser?.teamMemberInfo?.id },
        ],
      },
      testerTeam: {
        connect: testerUsers?.map((user) => ({ id: user?.testerInfo?.id })),
      },
    },
  });

  return { message: SUCCESS_MESSAGE };
};

export { createProject };
