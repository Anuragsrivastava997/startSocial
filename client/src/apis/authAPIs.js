import axios from 'axios';
import { REGISTER_URL, LOGIN_URL } from '../utils/default';

export const loginApi = (values) => axios
  .post(`${LOGIN_URL}`, values)
  .then((response) => response)
  .catch((error) => error.response);

export const registerApi = (values) => axios
  .post(`${REGISTER_URL}`, values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => response)
  .catch((error) => error.response);
