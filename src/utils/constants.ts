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
    createProject: '/projects',
  },
  user: {
    getAllUsers: '/users',
  },
};

export const CUSTOM_ERROR_MESSAGES = {
  INVALID_LOGIN: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  REPO_NOT_FOUND: 'Repository not found',
  USER_ALREADY_TAKEN: 'This email is already in use.',
};

export enum AvailableForRegisterUserRoles {
  MP = 'MP',
  TST = 'TST',
}
