export const SUCCESS_MESSAGE = 'SUCCESS';

export const ROUTES = {
  testing: {
    healthCheck: '/testing/health-check',
  },
  auth: {
    login: '/auth/login',
    myProfile: '/auth/my-profile',
    register: '/auth/register',
  },
  project: {
    projects: '/projects',
    enrollInProject: '/projects/enroll/:projectId',
    project: '/projects/:projectId',
  },
  user: {
    getUsersByRole: '/users/:role',
    getAllUsers: '/users',
  },
  bug: {
    createBug: '/bugs/:projectId',
    getProjectBugs: '/bugs/:projectId',
    bug: '/bugs/:bugId',
    assignBugToMe: '/bugs/assign/:bugId',
  },
};

export const CUSTOM_ERROR_MESSAGES = {
  INVALID_LOGIN: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  USER_ALREADY_TAKEN: 'This email is already in use.',
  BAD_REQUEST: 'Bad request',
  NOT_FOUND: 'Not found',
};

export enum AvailableForRegisterUserRoles {
  MP = 'MP',
  TST = 'TST',
}
