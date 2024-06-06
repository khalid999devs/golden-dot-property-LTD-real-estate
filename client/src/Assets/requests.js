const so = 'https://localhost:8000';

export const reqFileWrapper = (src) => {
  if (!src) return null;
  else return so + '/' + src;
};

const reqs = {
  // admin
  ADMIN_LOGIN: '',
  ADMIN_LOGOUT: '',
  IS_ADMIN_VALID: '',
};

export default reqs;
