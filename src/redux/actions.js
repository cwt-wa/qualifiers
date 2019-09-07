import {AUTH_LOGIN, AUTH_LOGOUT, DRAW} from "./actionTypes";

export const authLogin = (token, refreshToken) => {
  window.localStorage.setItem('idToken', token);
  if (refreshToken != null) {
    window.localStorage.setItem('refreshToken', refreshToken);
  }

  return ({
    type: AUTH_LOGIN,
    token
  });
};

export const authLogout = () => {
  window.localStorage.removeItem('refreshToken');
  window.localStorage.removeItem('idToken');

  return ({
    type: AUTH_LOGOUT
  });
};

export const draw = games => ({
  type: DRAW,
  games
});
