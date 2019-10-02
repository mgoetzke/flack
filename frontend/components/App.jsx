import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route, Switch } from "react-router-dom";
import LogInFormContainer from "./sessionform/login_form_container";
import SignUpFormContainer from "./sessionform/signup_form_container";
import SplashContainer from './splash/splash_container';
import { AuthRoute }  from '../util/route_util';
const App = () => (
  <div>
    <header>
      < GreetingContainer />
    </header>
    <div>
      <Route exact path="/" component={SplashContainer}/>
    </div>
    <AuthRoute path="/login" component={LogInFormContainer} />
    <AuthRoute path="/signup" component={SignUpFormContainer} />
  </div>
);

export default App;