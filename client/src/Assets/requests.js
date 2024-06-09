const so = 'http://localhost:8000';

export const reqFileWrapper = (src) => {
  if (!src) return null;
  else return so + '/' + src;
};

const reqs = {
  // admin
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '',
  IS_ADMIN_VALID: '/api/admin/auth',

  GET_ALL_CLIENTS: '/api/client/getAll',

  //clients
};

export default reqs;
