import axios from 'axios';
import {
  CREATE_POST_URL,
  GET_ALL_POSTS_URL,
  GET_USER_POSTS_URL,
  ADD_COMMENT_URL,
  LIKES_URL,
  DELETE_COMMENT_URL,
} from '../utils/default';

export const createPost = (data, auth) => axios
  .post(`${CREATE_POST_URL}`, data, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response)
  .catch((error) => error.response.data);

export const getPosts = (auth) => axios
  .get(`${GET_ALL_POSTS_URL}`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response.data);

export const getUserPosts = (userId, auth) => axios
  .get(`${GET_USER_POSTS_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response.data);

export const handleLikeApi = (id, data, auth) => axios
  .patch(`${LIKES_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response)
  .catch((error) => error.response);

export const addComment = (data, auth) => axios
  .post(`${ADD_COMMENT_URL}`, data, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response)
  .catch((error) => error.response);

export const deleteComment = (id, data, auth) => axios
  .post(`${DELETE_COMMENT_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  })
  .then((response) => response)
  .catch((error) => error.response);
