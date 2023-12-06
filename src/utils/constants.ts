export const SUCCESS_MESSAGE = 'SUCCESS';

export const ROUTES = {
  testing: {
    healthCheck: '/testing/health-check',
  },
  auth: {
    login: '/auth/login',
    myProfile: '/auth/my-profile',
  },
  user: {
    createTeamMember: '/users/create-team-member',
  },
};

export const CUSTOM_ERROR_MESSAGES = {
  INVALID_LOGIN: 'Invalid email or password',
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
};
