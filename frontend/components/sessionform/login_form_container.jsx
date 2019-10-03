import { connect } from "react-redux";
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapState = ({errors}, ownProps)=> {
  return ({
    errors: errors.session,
    formType: "Sign in",
    demoUser: { email: "demo-user@demo.com", password: "password" }
  });
}

const mapDispatch = dispatch => {
  return ({
    processForm: (user) => dispatch(login(user)),
  });
}
export default withRouter(connect(mapState, mapDispatch)(SessionForm));