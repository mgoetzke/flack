import { connect } from "react-redux";
import Channel from "./channel";
import { withRouter } from "react-router-dom";
import { fetchChannelMessages, receiveMessage } from "../../actions/message_actions";
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
    receiveMessage: message => dispatch(receiveMessage(message)),
    fetchChannelMessages: channelId => dispatch(fetchChannelMessages(channelId)),
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId =>
      dispatch(destroyMembership(membershipId)),
    openAddMembership: (
      <button onMouseDown={() => dispatch(openModal({type:"addmembership"}))}>
        Add people to channel
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
