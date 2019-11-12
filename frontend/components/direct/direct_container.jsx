import { connect } from "react-redux";
import Direct from "./direct";
import { withRouter } from "react-router-dom";
import { fetchDirectMessages, receiveMessage } from "../../actions/message_actions";
import { getDirectMemberships } from "../../selectors/membership_selectors";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
  let memberships = getDirectMemberships(state, ownProps.match.params.directId);
  let members = memberships.map(membership => membership.user_id);
  return {
    direct: state.entities.directs[ownProps.match.params.directId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: memberships,
    members: members,
    directId: ownProps.match.params.directId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    receiveMessage: message => dispatch(receiveMessage(message)), 
    fetchDirectMessages: directId => dispatch(fetchDirectMessages(directId)),
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId =>
      dispatch(destroyMembership(membershipId)),
    openAddMembership: (
      <button onMouseDown={() => dispatch(openModal({type:"addmembership"}))}>
        Invite another member...
      </button>
    ),
    openCreateDirect: (invitedUsersIds) => dispatch(openModal({ type: "createdirect", prevUsers: invitedUsersIds })),
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Direct)
);
