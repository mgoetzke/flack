import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import channelsReducer from "./channels_reducer";
import directsReducer from "./directs_reducer";
import messagesReducer from "./messages_reducer";
import membershipsReducer from "./memberships_reducer";
const entitiesReducer = combineReducers({
  users: usersReducer,
  channels: channelsReducer,
  directs: directsReducer,
  messages: messagesReducer,
  memberships: membershipsReducer
});

export default entitiesReducer;
