import {AUTH_LOGIN, AUTH_LOGOUT, DRAW} from "./actionTypes";

export const authLogin = token => ({
  type: AUTH_LOGIN,
  token
});

export const authLogout = () => ({
  type: AUTH_LOGOUT
});

export const draw = games => ({
  type: DRAW,
  games
});
