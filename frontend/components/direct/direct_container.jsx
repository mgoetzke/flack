import { connect } from "react-redux";
import Direct from "./direct";
import { withRouter } from "react-router-dom";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
import {
  createMembership,
  destroyMembership
} from "../../actions/membership_actions";

const mapState = (state, ownProps) => {
  return {
    channel: state.entities.directs[ownProps.match.params.directId] || {
      name: "default"
    },
    messages: Object.values(state.entities.messages),
    memberships: Object.values(state.entities.memberships),
    channelId: ownProps.match.params.directId,
    currentUser: state.entities.users[state.session.id]
  };
};

const mapDispatch = dispatch => {
  return {
    createMembership: membership => dispatch(createMembership(membership)),
    destroyMembership: membershipId =>
      dispatch(destroyMembership(membershipId)),
    openAddMembership: (
      <button onClick={() => dispatch(openModal("addmembership"))}>
        Add people to channel
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
