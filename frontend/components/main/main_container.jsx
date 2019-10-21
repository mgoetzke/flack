import { connect } from "react-redux";
import Main from "./main";
import { fetchAllUsers } from "../../actions/user_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import { fetchChannel, fetchAllChannels } from "../../actions/channel_actions";
import { fetchAllDirects } from "../../actions/direct_actions";
import { fetchAllMessages } from "../../actions/message_actions";
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    fetchAllDirects: () => dispatch(fetchAllDirects()),
    fetchChannel: () => dispatch(fetchChannel()),
    fetchMemberships: () => dispatch(fetchMemberships()),
    fetchAllMessages: () => dispatch(fetchAllMessages())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
