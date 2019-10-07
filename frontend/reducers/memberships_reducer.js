import {
  RECEIVE_MEMBERSHIPS,
  RECEIVE_MEMBERSHIP,
  REMOVE_MEMBERSHIP
} from "../actions/membership_actions";

import merge from "lodash/merge";

export default (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      return merge({}, action.memberships);
    case RECEIVE_MEMBERSHIP:
      return merge({}, state, { [action.membership.id]: action.membership });
    case REMOVE_MEMBERSHIP:
      newState = merge({}, state);
      delete newState[action.membershipId];
      return newState;
    default:
      return state;
  }
};
