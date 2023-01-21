import axios from "axios";
import { REGISTER_URL, LOGIN_URL } from "utils/default";

export const loginApi = (values) => {
  return axios
    .post(`${LOGIN_URL}`, values)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const registerApi = (values) => {
  console.log(values, "values");
  return axios
    .post(`${REGISTER_URL}`, values)
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
