import { connect } from "react-redux";
import Greeting from "./greeting";
import { logout, clearSessionErrors} from "../../actions/session_actions";
import {withRouter} from 'react-router-dom';

const mapState = ({ session, entities: { users } }, ownProps) => {
  return ({
    currentUser: users[session.id]
  });
}

const mapDispatch = dispatch => {
  return ({
    logout: user => dispatch(logout(user)),
    clearSessionErrors: () => dispatch(clearSessionErrors())
  });
}

export default withRouter(connect(mapState, mapDispatch)(Greeting));