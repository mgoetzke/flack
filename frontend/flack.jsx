import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import { signup, login, logout } from './util/session_api_util';
import { signup, login, logout } from './actions/session_actions';


document.addEventListener("DOMContentLoaded", () =>{
  const root = document.getElementById("root");
  const store = configureStore();
  
  //TESTING
  window.login = login;
  window.signup = signup;
  window.logout = logout;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // TESTING

  ReactDOM.render(<Root store={store}/>, root);
});