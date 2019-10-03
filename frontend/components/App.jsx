import React from "react";
import GreetingContainer from './greeting/greeting_container';
import { Route, Switch } from "react-router-dom";
import LogInFormContainer from "./sessionform/login_form_container";
import SignUpFormContainer from "./sessionform/signup_form_container";
import SplashContainer from './splash/splash_container';
import MainContainer from './main/main_container';
import { AuthRoute, ProtectedRoute }  from '../util/route_util';
const App = () => (
  <div>
    <header>
      < GreetingContainer />
    </header>
    <div>
      <Switch>
        <AuthRoute path="/signup" component={SignUpFormContainer} />
        <AuthRoute path="/login" component={LogInFormContainer} />
        <Route exact path="/" component={SplashContainer}/>
        <ProtectedRoute path ="/workspace" component={MainContainer}/>
      </Switch>
    </div>
  </div>
);

export default App;