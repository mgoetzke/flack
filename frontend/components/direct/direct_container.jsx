import { connect } from "react-redux";
import Direct from "./direct";
import { withRouter } from "react-router-dom";
import { receiveMessage } from "../../actions/message_actions";
import { getDirectMemberships } from "../../selectors/membership_selectors";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
  debugger;
  let memberships = getDirectMemberships(state, ownProps.match.params.directId);
  return {
    direct: state.entities.directs[ownProps.match.params.directId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: memberships,
    directId: ownProps.match.params.directId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    receiveMessage: message => dispatch(receiveMessage(message)),
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
