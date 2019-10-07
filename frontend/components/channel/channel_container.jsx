import { connect } from "react-redux";
import Channel from "./channel";
import { fetchChannel } from "../../actions/channel_actions";
import { withRouter } from "react-router-dom";
import {
  fetchChannelMessages,
  receiveMessage
} from "../../actions/message_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import { getChannelMemberships } from "../../selectors/membership_selectors";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
  let memberships = getChannelMemberships(
    state,
    ownProps.match.params.channelId
  );
  return {
    channel: state.entities.channels[ownProps.match.params.channelId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: memberships,
    channelId: ownProps.match.params.channelId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    fetchChannel: id => dispatch(fetchChannel(id)),
    fetchChannelMessages: id => dispatch(fetchChannelMessages(id)),
    fetchMemberships: () => dispatch(fetchMemberships()),
    receiveMessage: message => dispatch(receiveMessage(message)),
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId =>
      dispatch(destroyMembership(membershipId)),
    openAddMembership: (
      <button onClick={() => dispatch(openModal("addmembership"))}>
        Add Member
      </button>
    )
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Channel)
);
