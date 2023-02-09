import axios from "axios";
import {
  CREATE_POST_URL,
  GET_ALL_POSTS_URL,
  GET_USER_POSTS_URL,
  ADD_COMMENT_URL,
  LIKES_URL,
  DELETE_COMMENT_URL,
  DELETE_POST_URL,
} from "utils/default";

export const createPost = (data, auth) => {
  return axios
    .post(`${CREATE_POST_URL}`, data, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res)
    .catch((err) => err.response.data);
};

export const getPosts = (auth) => {
  return axios
    .get(`${GET_ALL_POSTS_URL}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res.data);
};

export const deletePost = (id, auth) => {
  return axios
    .delete(`${DELETE_POST_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
};

export const getUserPosts = (user_id, auth) => {
  return axios
    .get(`${GET_USER_POSTS_URL}/${user_id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res.data);
};

export const handleLikeApi = (id, data, auth) => {
  return axios
    .patch(`${LIKES_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
};

export const addComment = (data, auth) => {
  return axios
    .post(`${ADD_COMMENT_URL}`, data, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
};

export const deleteComment = (id, data, auth) => {
  return axios
    .post(`${DELETE_COMMENT_URL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
    .then((res) => res)
    .catch((err) => err.response);
};
