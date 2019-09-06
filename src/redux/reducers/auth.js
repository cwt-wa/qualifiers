import {AUTH_LOGIN, AUTH_LOGOUT} from "../actionTypes";

export default function (state = null, action) {
  console.log(action);
  if (action.type === AUTH_LOGIN) return action.token;
  else if (action.type === AUTH_LOGOUT) return null;
  else return null;
};
