import { connect } from "react-redux";
import Direct from "./direct";
import { withRouter } from "react-router-dom";
import { fetchDirectMessages, receiveMessage } from "../../actions/message_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchDirectMembers } from "../../actions/membership_actions";
import React from "react";
import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
 return {
    direct: state.entities.directs[ownProps.match.params.directId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: Object.values(state.entities.memberships),
    directId: ownProps.match.params.directId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    receiveMessage: message => dispatch(receiveMessage(message)),
    fetchDirectMessages: directId => dispatch(fetchDirectMessages(directId)),
    fetchDirectMembers: directId => dispatch(fetchDirectMembers(directId)),
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId =>
      dispatch(destroyMembership(membershipId)),
    openAddMembership: (
      <button onClick={() => dispatch(openModal("addmembership"))}>
        Add people to direct
      </button>
    )
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Direct)
);
