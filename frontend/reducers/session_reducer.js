import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from "../actions/session_actions";

import merge from "lodash/merge";

export default (state = { id: null }, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState = merge({}, state, { id: action.currentUser.id });
      return newState;
    case LOGOUT_CURRENT_USER:
      newState = merge({}, state, { id: null });
      return newState;
    default:
      return state;
  }
};
