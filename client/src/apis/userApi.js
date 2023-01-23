import axios from "axios";
import { GET_USER_URL } from "utils/default";

export const getUser = (id, auth) => {
  return axios
    .get(`${GET_USER_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
