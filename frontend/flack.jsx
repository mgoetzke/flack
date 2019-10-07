import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

import {
  fetchChannel,
  fetchAllChannels,
  createChannel,
  destroyChannel,
  updateChannel
} from "./actions/channel_actions";
import { fetchAllUsers } from "./actions/user_actions";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //TESTING
  window.fetchAllChannels = fetchAllChannels;
  window.fetchAllUsers = fetchAllUsers;
  window.fetchChannel = fetchChannel;
  window.createChannel = createChannel;
  window.updateChannel = updateChannel;
  window.destroyChannel = destroyChannel;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING

  ReactDOM.render(<Root store={store} />, root);
});
