import axios from "axios";
import {
  GET_USER_URL,
  GET_USER_FRIENDS_URL,
  ADD_REMOVE_FRIEND_URL,
} from "utils/default";

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

export const getUserFriend = (id, auth) => {
  return axios
    .get(`${GET_USER_FRIENDS_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};

export const addOrRemoveFriend = (body, auth) => {
  return axios
    .post(`${ADD_REMOVE_FRIEND_URL}`, body, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => err.response.data);
};
