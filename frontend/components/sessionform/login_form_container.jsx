import { connect } from "react-redux";
import LoginForm from './login_form';
import { login } from '../../actions/session_actions';

const mapState = (state, ownProps)=> {
  return ({
    errors: state.errors,
    formType: "Sign In"
  });
}

const mapDispatch = dispatch => {
  return ({
    processForm: (user) => dispatch(login(user)),
  });
}
export default connect(mapState, mapDispatch)(LoginForm);