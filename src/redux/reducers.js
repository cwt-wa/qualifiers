import {combineReducers} from "redux";
import {AUTH_LOGIN, AUTH_LOGOUT, DRAW} from "./actionTypes";

function auth(state = null, action) {
  if (action.type === AUTH_LOGIN) return state != null ? state : JSON.parse(atob(action.token.split('.')[1]));
  else if (action.type === AUTH_LOGOUT) return null;
  else return state;
}

function draw(state = null, action) {
  if (action.type === DRAW) return action.games;
  if (action.type === 'REPORT') {
    const {gameKey, homeScore, awayScore} = action.report;
    state[gameKey] = {...state[gameKey], homeScore, awayScore};
    return {...state};
  }
  return state;
}

function currentTournament(state = null, action) {
  if (action.type === 'SAVE') return action.currentTournament || state;
  return state
}

export default combineReducers({auth, draw, currentTournament});

