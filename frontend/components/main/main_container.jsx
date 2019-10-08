import { connect } from "react-redux";
import Main from "./main";
import { fetchAllUsers } from "../../actions/user_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import { fetchAllChannels } from "../../actions/channel_actions";
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchMemberships: () => dispatch(fetchMemberships())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
