import { BugStatus } from '@prisma/client';
import { prisma } from '../../prisma';
import { CUSTOM_ERROR_MESSAGES, SUCCESS_MESSAGE } from '../../utils/constants';
import { HttpException } from '../../utils/http-exception';
import { UserInfo } from '../../utils/interfaces/auth.interface';
import { CreateBugReqDto } from './dtos/create-bug.dto';
import { UpdateBugDto } from './dtos/update-bug.dto';

const getProjectBugs = async (reqUser: UserInfo, projectId: string) => {
  const { id: userId, role } = reqUser;
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    include: {
      bugs: true,
      testerTeam: true,
      projectTeam: true,
    },
  });
  if (role === 'TST') {
    if (!project?.testerTeam?.some((tester) => tester?.id === userId)) {
      throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);
    }
  } else if (
    !project?.projectTeam?.some((teamMember) => teamMember?.id === userId)
  ) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);
  }

  return project?.bugs;
};

const createBug = async (
  reqUser: UserInfo,
  projectId: string,
  createBugReqDto: CreateBugReqDto,
) => {
  const { id: userId } = reqUser;
  const { assignedTo } = createBugReqDto;
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    include: {
      testerTeam: true,
      projectTeam: true,
    },
  });
  if (!project) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.NOT_FOUND, 404);
  }

  if (!project?.testerTeam?.some((tester) => tester?.id === userId)) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);
  }

  if (
    assignedTo &&
    !project?.projectTeam?.some((teamMember) => teamMember?.id === assignedTo)
  ) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.BAD_REQUEST, 400);
  }

  const assignedToObject = assignedTo
    ? {
        connect: {
          id: assignedTo,
        },
      }
    : {};

  const bug = await prisma.bug.create({
    data: {
      ...createBugReqDto,
      bugStatus: BugStatus.ToDo,
      project: {
        connect: {
          id: projectId,
        },
      },
      assignedTo: assignedToObject,
      reporter: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return bug;
};

const assignBugToMe = async (reqUser: UserInfo, bugId: string) => {
  const { id: userId } = reqUser;
  const bug = await prisma.bug.findFirst({
    where: {
      id: bugId,
    },
    include: {
      project: {
        include: {
          projectTeam: true,
        },
      },
      assignedTo: true,
    },
  });

  if (!bug) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.NOT_FOUND, 404);
  }

  if (!bug.project.projectTeam.some((teamMember) => teamMember?.id === userId))
    throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);

  await prisma.bug.update({
    where: {
      id: bugId,
    },
    data: {
      assignedTo: {
        connect: {
          id: userId,
        },
      },
    },
  });

  return { message: SUCCESS_MESSAGE };
};


const updateBug = async (reqUser: UserInfo, bugId: string, body: UpdateBugDto) => {
  const { id: userId } = reqUser;
  const { assignedToId, solution, status, priority, title, details, testSteps, resolution, issueLink } = body;
  const bug = await prisma.bug.findFirst({
    where: {
      id: bugId,
    },
    include: {
      project: {
        include: {
          projectTeam: true,
        },
      },
      assignedTo: true,
    },
  });

  if (!bug) {
    throw new HttpException(CUSTOM_ERROR_MESSAGES.NOT_FOUND, 404);
  }

  if (!bug.project.projectTeam.some((teamMember) => teamMember?.id === userId))
    throw new HttpException(CUSTOM_ERROR_MESSAGES.FORBIDDEN, 403);

  if (assignedToId && !bug.project.projectTeam.some((teamMember) => teamMember?.id === assignedToId))
    throw new HttpException(CUSTOM_ERROR_MESSAGES.BAD_REQUEST, 400);

  const assignedToObject = assignedToId ? { connect: { id: assignedToId } } : undefined;

  await prisma.bug.update({
    where: {
      id: bugId,
    },
    data: {
      assignedTo: assignedToObject,
      solution,
      bugStatus: status,
      priority,
      title,
      details,
      testSteps,
      resolution,
      issueLink,
    },
  });

  return { message: SUCCESS_MESSAGE };
}

export { getProjectBugs, createBug, assignBugToMe, updateBug };
