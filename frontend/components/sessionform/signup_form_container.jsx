import { connect } from "react-redux";
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions';

const mapState = ({errors}, ownProps) => {
  return ({
    errors: errors.session,
    formType: "Sign up"
  });
}

const mapDispatch = dispatch => {
  return ({
    processForm: (user) => dispatch(signup(user)),
  });
}
export default connect(mapState, mapDispatch)(SessionForm);