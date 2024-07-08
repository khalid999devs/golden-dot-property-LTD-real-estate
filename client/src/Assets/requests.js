const so = 'http://localhost:8000';
// const so = 'https://api.goldendotbd.com';

export const reqFileWrapper = (src) => {
  if (!src) return null;
  else return so + '/' + src;
};

export const validFileWrapper = (fileImg) => {
  if (typeof fileImg === 'object') {
    if (fileImg.name) {
      return window.URL.createObjectURL(fileImg);
    } else {
      return null;
    }
  } else {
    return reqFileWrapper(fileImg);
  }
};

const reqs = {
  // admin
  ADMIN_LOGIN: '/api/admin/login',
  ADMIN_LOGOUT: '',
  IS_ADMIN_VALID: '/api/admin/auth',

  GET_ALL_CLIENTS: '/api/client/getAll',

  //clients
  BOOK_CLIENT: '/api/client/reg',
  ALL_ANALYTICS: '/api/client/analytics',

  // properties
  ADD_PROPERTY: '/api/property/add',
  GET_ALL_PROPERTY: '/api/property/all',
  GET_ALL_PROPERTY_LABELS: '/api/property/labels',
  GET_SINGLE_PROPERTY: '/api/property/single',
  GET_SINGLE_CARD_PROPERTY: '/api/property/card',
  UPDATE_PROPERTY_IMAGES: '/api/property/updateImg',
  UPDATE_PROPERTY_DATA: '/api/property/data-update',
  DELETE_PROPERTY_IMAGES: '/api/property/delete',
  DELETE_PROPERTY: '/api/property/delete-property',

  //contact
  SEND_MESSAGE_FROM_CLIENT: '/api/contact/sendMessage',
  GET_ALL_MESSAGES: '/api/contact/messages',
  SEND_EMAIL_TO_CLIENT: '/api/contact/emailToClient',
  SEND_SMS_TO_CLIENT: '/api/contact/smsToClient/custom',
};

export default reqs;
