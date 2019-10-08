import { connect } from "react-redux";
import Greeting from "./greeting";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import { fetchAllUsers } from "../../actions/user_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import { fetchAllChannels } from "../../actions/channel_actions";

const mapState = ({ session, entities: { users } }, ownProps) => {
  return {
    currentUser: users[session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchMemberships: () => dispatch(fetchMemberships()),
    logout: user => dispatch(logout(user))
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Greeting)
);
