import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route, Switch } from "react-router-dom";
import LogInFormContainer from "./sessionform/login_form_container";
import SignUpFormContainer from "./sessionform/signup_form_container";
import SplashContainer from "./splash/splash_container";
import MainContainer from "./main/main_container";
import FooterContainer from "./footer/footer_container";
import Modal from "./modal/modal";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
const App = () => (
  <div>
    <Modal />
    <div>
      <Switch>
        <AuthRoute path="/signup" component={SignUpFormContainer} />
        <AuthRoute path="/login" component={LogInFormContainer} />
        <ProtectedRoute path="/workspace" component={MainContainer} />
        <Route exact path="/" component={SplashContainer} />
      </Switch>
    </div>
    <footer>
      <Route exact path="/" component={FooterContainer} />
    </footer>
  </div>
);

export default App;
