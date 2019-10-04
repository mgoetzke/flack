import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import { fetchMessage, fetchAllMessages, createMessage, updateMessage } from './actions/message_actions';
import {fetchAllChannels} from './actions/channel_actions'

document.addEventListener("DOMContentLoaded", () =>{
  const root = document.getElementById("root");
  let store;
  if (window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser}
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
  window.fetchAllMessages = fetchAllMessages;
  window.fetchMessage = fetchMessage;
  window.createMessage = createMessage;
  window.updateMessage = updateMessage;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING

  ReactDOM.render(<Root store={store}/>, root);
});