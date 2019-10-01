import * as SessionApiUtil from './../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(currentUser =>
    dispatch(receiveCurrentUser(currentUser))
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(currentUser =>
    dispatch(receiveCurrentUser(currentUser))
  );
};

const receiveCurrentUser = (currentUser) =>{
 return {
   type: RECEIVE_CURRENT_USER,
   currentUser
 };
}

const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

const receiveSessionErrors = arr => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    session: arr
  };
};