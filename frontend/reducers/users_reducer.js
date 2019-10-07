import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_ALL_USERS } from "../actions/user_actions";

import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge({}, state, {
        [action.currentUser.id]: action.currentUser
      });
      return newState;
    case RECEIVE_ALL_USERS:
      return merge({}, action.users);
    default:
      return state;
  }
};
