import { connect } from "react-redux";
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

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
export default withRouter(connect(mapState, mapDispatch)(SessionForm));