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
          id: requestUser?.id,
        },
      },
      projectTeam: {
        connect: [
          ...(memberUsers?.map((user) => ({ id: user?.id })) ?? []),
          { id: requestUser?.id },
        ],
      },
      testerTeam: {
        connect: testerUsers?.map((user) => ({ id: user?.id })),
      },
    },
  });

  return { message: SUCCESS_MESSAGE };
};

const getAllProjects = async (reqUser: UserInfo) => {
  const { id: userId, role } = reqUser;
  const requestUser = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      teamMemberInfo: true,
      testerInfo: true,
    },
  });
  if (role === 'TST') {
    const projects = await prisma.project.findMany({
      include: {
        owner: true,
        bugs: true,
        testerTeam: true,
      },
    });

    const filteredProjects = projects.map((project) => {
      const testerTeam = project?.testerTeam?.map((tester) => tester?.id);
      if (testerTeam?.includes(requestUser?.testerInfo?.id as string)) {
        return project;
      } else {
        return {
          ...project,
          bugs: undefined,
        };
      }
    });

    return filteredProjects;
  }
  const projects = await prisma.project.findMany({
    where: {
      OR: [
        {
          ownerId: requestUser?.teamMemberInfo?.id,
        },
        {
          projectTeam: {
            some: {
              id: requestUser?.teamMemberInfo?.id,
            },
          },
        },
      ],
    },
    include: {
      owner: true,
      testerTeam: true,
      projectTeam: true,
      bugs: true,
    },
  });
  return projects;
};

const enrollInProject = async (reqUser: UserInfo, projectId: string) => {
  const { id } = reqUser;
  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      testerTeam: {
        connect: {
          id,
        },
      },
    },
  });

  return { message: SUCCESS_MESSAGE };
};

export { createProject, getAllProjects, enrollInProject };
