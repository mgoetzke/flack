import { connect } from "react-redux";
import SignupForm from './session_form';
import { signup } from '../../actions/session_actions';

const mapState = (state, ownProps) => {
  return ({
    errors: state.errors,
    formType: "Sign Up"
  });
}

const mapDispatch = dispatch => {
  return ({
    processForm: (user) => dispatch(signup(user)),
  });
}
export default connect(mapState, mapDispatch)(SignupForm);