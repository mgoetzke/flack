import { connect } from "react-redux";
import SessionForm from "./session_form";
import {
  clearSessionErrors,
  signup,
  login
} from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mapState = ({ errors }, ownProps) => {
  return {
    errors: errors.session,
    formType: "Sign up",
    demoUser: { email: "demo-user@demo.com", password: "password" }
  };
};

const mapDispatch = dispatch => {
  return {
    processForm: user => dispatch(signup(user)),
    loginDemo: user => dispatch(login(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(SessionForm)
);
