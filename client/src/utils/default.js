export const BASE_URL = "http://192.168.1.36:8000";

// auth urls
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;

// post urls
export const CREATE_POST_URL = `${BASE_URL}/post/create`;
export const GET_ALL_POSTS_URL = `${BASE_URL}/post/all`;
export const GET_POST_BY_ID_URL = `${BASE_URL}/post/single`;
export const UPDATE_POST_URL = `${BASE_URL}/post/update`;
export const DELETE_POST_URL = `${BASE_URL}/post/delete`;

// action urls
export const ADD_ACTION_URL = `${BASE_URL}/post/action/add`;
export const DELETE_ACTION_URL = `${BASE_URL}/post/action/remove`;

// user Urls
export const GET_USER_URL = `${BASE_URL}/user/single`;
