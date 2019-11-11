import { connect } from "react-redux";
import Main from "./main";
import { fetchAllUsers } from "../../actions/user_actions";
import { fetchMemberships, receiveMembership } from "../../actions/membership_actions";
import { fetchChannel, fetchAllChannels } from "../../actions/channel_actions";
import { fetchAllDirects, fetchDirect } from "../../actions/direct_actions";
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
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    receiveMembership: membership => dispatch(receiveMembership(membership)),
    fetchDirect: id => dispatch(fetchDirect(id)),
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
