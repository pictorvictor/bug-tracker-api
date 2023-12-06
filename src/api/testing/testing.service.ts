import { SUCCESS_MESSAGE } from '../../utils/constants';

const getHealthCheck = async () => {
  return { message: SUCCESS_MESSAGE };
};

export { getHealthCheck };
