import { connect } from "react-redux";
import Channel from "./channel";
import { fetchChannel } from "../../actions/channel_actions";
import { withRouter } from "react-router-dom";
import {
  fetchChannelMessages,
  receiveMessage
} from "../../actions/message_actions";
import { fetchChannelMembers } from "../../actions/membership_actions";
import {
  getChannelMessages,
  getChannelMembers
} from "../../selectors/channel_selectors";

import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
  // fetchAllMessages();
  // fetchMemberships();

  return {
    channel: state.entities.channels[ownProps.match.params.channelId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: Object.values(state.entities.memberships),
    channelId: ownProps.match.params.channelId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    fetchChannel: id => dispatch(fetchChannel(id)),
    fetchChannelMessages: id => dispatch(fetchChannelMessages(id)),
    fetchChannelMembers: id => dispatch(fetchChannelMembers(id)),
    receiveMessage: message => dispatch(receiveMessage(message)),
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId => dispatch(destroyMembership(membershipId))
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Channel)
);
