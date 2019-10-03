import * as SessionApiUtil from './../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const LOCATION_CHANGE = "LOCATION_CHANGE";

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(
    (currentUser =>
    dispatch(receiveCurrentUser(currentUser))
  ),(errors => dispatch(receiveErrors(errors.responseJSON)))
  );};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(
    (currentUser =>
    dispatch(receiveCurrentUser(currentUser))
  ),( err => dispatch(receiveErrors(err.responseJSON))));
};

export const loxChange = (change) => dispatch => {
  if(change){
    dispatch(locationChange());
  }
}

export const receiveErrors = errors => {
  return({
  type: RECEIVE_SESSION_ERRORS,
  errors
})};

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

const locationChange = () => {
  return {
    type: LOCATION_CHANGE
  };
};