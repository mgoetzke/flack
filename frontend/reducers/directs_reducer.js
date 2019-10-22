import {
  RECEIVE_ALL_DIRECTS,
  RECEIVE_DIRECT,
  REMOVE_DIRECT
} from "../actions/direct_actions";

import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_DIRECTS:
      return merge({}, action.directs);
    case RECEIVE_DIRECT:
      return merge({}, state, { [action.direct.id]: action.direct });
    default:
      return state;
  }
};
