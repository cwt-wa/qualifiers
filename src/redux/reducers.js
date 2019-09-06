import {combineReducers} from "redux";
import {AUTH_LOGIN, AUTH_LOGOUT} from "./actionTypes";

function auth(state = null, action) {
  if (action.type === AUTH_LOGIN) return JSON.parse(atob(action.token.split('.')[1])).context.user;
  else if (action.type === AUTH_LOGOUT) return null;
  else return null;
}


export default combineReducers({auth});
