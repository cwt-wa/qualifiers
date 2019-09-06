import {AUTH_LOGIN, AUTH_LOGOUT} from "./actionTypes";

export const authLogin = token => ({
  type: AUTH_LOGIN,
  token
});

export const authLogout = () => ({
  type: AUTH_LOGOUT
});
