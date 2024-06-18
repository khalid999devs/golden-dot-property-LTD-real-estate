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
  BOOK_CLIENT: '/api/client/reg',

  // properties
  ADD_PROPERTY: '/api/property/add',
  GET_ALL_PROPERTY: '/api/property/all',
  GET_SINGLE_PROPERTY: '/api/property/single',
  GET_SINGLE_CARD_PROPERTY: '/api/property/card',

  //contact
  SEND_MESSAGE_FROM_CLIENT: '/api/contact/sendMessage',
  GET_ALL_MESSAGES: '/api/contact/messages',
  SEND_EMAIL_TO_CLIENT: '/api/contact/emailToClient/custom',
  SEND_SMS_TO_CLIENT: '/api/contact/smsToClient/custom',
};

export default reqs;
