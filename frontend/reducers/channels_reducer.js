import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from "../actions/channel_actions";

import merge from "lodash/merge";

export default (state = { id: null }, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return merge({}, action.channels);
    case RECEIVE_CHANNEL:
      return merge({}, state, {[action.channel.id]: action.channel});
    case REMOVE_CHANNEL:
      newState = merge({}, state);
      delete newState[action.channelId]
      return newState;
    default:
      return state;
  }
};
