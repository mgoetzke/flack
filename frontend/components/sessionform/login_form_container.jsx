import { connect } from "react-redux";
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';

const mapState = ({errors}, ownProps)=> {
  return ({
    errors: errors.session,
    formType: "Sign In"
  });
}

const mapDispatch = dispatch => {
  return ({
    processForm: (user) => dispatch(login(user)),
  });
}
export default connect(mapState, mapDispatch)(SessionForm);