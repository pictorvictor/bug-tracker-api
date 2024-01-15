import { prisma } from '../../prisma';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { CreateProjectReqDto } from './dtos/create-project.dto';
import { CUSTOM_ERROR_MESSAGES, SUCCESS_MESSAGE } from '../../utils/constants';
import { HttpException } from '../../utils/http-exception';

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

    const projects = await prisma.project.findMany({
      include: {
        owner: {include: {user: {select: {email: true}}}},
        bugs: {
          include: {
            assignedTo: {
              include: {
                user: {
                  select: {
                    email: true,
                  }
                },
              },
            },
            reporter: {
              include: {
                user: {
                  select: {
                    email: true,
                  }
                },
              },
            }
          }
        },
        testerTeam: {
          include: {
            user: {
              select: {
                email: true,
              }
            },
          }
        },
        projectTeam: {
          include: {
            user: {
              select: {
                email: true,
              }
            }
          }
        },
      },
    });

    return projects;
};

const enrollInProject = async (reqUser: UserInfo, projectId: string) => {
  const { id, role} = reqUser;
  if (role === 'TST') {
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
  } else {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        projectTeam: {
          connect: {
            id,
          },
        },
      },
    });
  }

  return { message: SUCCESS_MESSAGE };
};

const updateProject = async (reqUser: UserInfo, projectId: string, body: any) => {
  const { id } = reqUser;
  const { projectName, repositoryName } = body;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    include: {
      projectTeam: true,
      testerTeam: true,
    },
  });

  if(!project?.projectTeam.some((teamMember) => teamMember?.id === id))
    throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      projectName,
      repositoryName,
    },
  });

  return { message: SUCCESS_MESSAGE };
}

export { createProject, getAllProjects, enrollInProject, updateProject };
