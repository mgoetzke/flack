import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route, Switch } from "react-router-dom";
import LogInFormContainer from "./sessionform/login_form_container";
import SignUpFormContainer from "./sessionform/signup_form_container";
import { AuthRoute }  from '../util/route_util';
const App = () => (
  <div>
    <header>
      <h1>Flack</h1>
      < GreetingContainer />
    </header>
    <AuthRoute path="/login" component={LogInFormContainer} />
    <AuthRoute path="/signup" component={SignUpFormContainer} />
  </div>
);

export default App;