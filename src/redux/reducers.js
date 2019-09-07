import {combineReducers} from "redux";
import {AUTH_LOGIN, AUTH_LOGOUT} from "./actionTypes";

function auth(state = null, action) {
  if (action.type === AUTH_LOGIN) return state != null ? state : JSON.parse(atob(action.token.split('.')[1]));
  else if (action.type === AUTH_LOGOUT) return null;
  else return state;
}

function draw(state = null, action) {
  return action.games || [];
}

export default combineReducers({auth, draw});
