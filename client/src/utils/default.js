export const BASE_URL = "http://localhost:8000";

// auth urls
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;

// post urls
export const CREATE_POST_URL = `${BASE_URL}/post/create`;
export const GET_ALL_POSTS_URL = `${BASE_URL}/post/all`;
export const GET_POST_BY_ID_URL = `${BASE_URL}/post/single`;
export const UPDATE_POST_URL = `${BASE_URL}/post/update`;
export const DELETE_POST_URL = `${BASE_URL}/post/delete`;
export const GET_USER_POSTS_URL = `${BASE_URL}/post/user`;

// action urls
export const ADD_COMMENT_URL = `${BASE_URL}/post/comment/add`;
export const DELETE_COMMENT_URL = `${BASE_URL}/post/comment/remove`;
export const LIKES_URL = `${BASE_URL}/post/like`;

// user Urls
export const GET_USER_URL = `${BASE_URL}/user/single`;
export const GET_USER_FRIENDS_URL = `${BASE_URL}/user/all/friend/`;
export const ADD_REMOVE_FRIEND_URL = `${BASE_URL}/user/action/friend`;
