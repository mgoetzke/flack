import {
  RECEIVE_ALL_MESSAGES,
  RECEIVE_MESSAGE
} from "../actions/message_actions";

import merge from "lodash/merge";

export default (state = [], action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return merge([], action.messages);
    case RECEIVE_MESSAGE:
      return merge([], state, { [action.message.id]: action.message });
    default:
      return state;
  }
};
