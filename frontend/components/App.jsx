import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route, Switch } from "react-router-dom";
import LogInFormContainer from "./sessionform/login_form_container";
import SignUpFormContainer from "./sessionform/signup_form_container";

const App = () => (
  <div>
    <header>
      <h1>Flack</h1>
      < GreetingContainer />
    </header>
    <Route path="/login" component={LogInFormContainer} />
    <Route path="/signup" component={SignUpFormContainer} />
  </div>
);

export default App;