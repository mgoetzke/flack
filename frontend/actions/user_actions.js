import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

export const fetchAllUsers = () => dispatch => {
  return UserApiUtil.fetchAllUsers().then(users =>
    dispatch(receiveUsers(users))
  );
};

export const fetchUser = userId => dispatch => {
  return UserApiUtil.fetchUser(userId).then(user =>
    dispatch(receiveUser(user))
  );
};

const receiveUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user
  };
};
