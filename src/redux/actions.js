import {AUTH_LOGIN, AUTH_LOGOUT, DRAW,} from "./actionTypes";
import Fetch from '../fetch';

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

export const reportGame = (gameKey, homeScore, awayScore) => ({
  type: 'REPORT',
  report: {gameKey, homeScore, awayScore}
});

export const saveCurrentTournament = currentTournament => ({type: 'SAVE', currentTournament});
