import {
  RECEIVE_CURRENT_USER,
  RECEIVE_SESSION_ERRORS
} from "../actions/session_actions";

import merge from "lodash/merge";

export default (state = {errors: null}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      newState = merge({}, state, { errors: action.errors });
      return newState;
    case RECEIVE_CURRENT_USER:
      newState = merge({}, state, { errors: null });
      return newState;
    default:
      return state;
  }
};