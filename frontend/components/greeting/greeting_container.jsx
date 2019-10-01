import { connect } from "react-redux";
import Greeting from "./greeting";
import { logout } from "../../actions/session_actions";

const mapState = ({ session, entities: { users } }) => {
  return ({
    currentUser: users[session.id]
  });
}

const mapDispatch = dispatch => {
  return ({
    logout: user => dispatch(logout(user))
  });
}

export default connect(mapState, mapDispatch)(Greeting);