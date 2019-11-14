import { connect } from "react-redux";
import Sidebar from "./sidebar";
import { openModal, closeModal } from "../../actions/modal_actions";
import { getUserMemberships } from "../../selectors/membership_selectors";
import { fetchAllChannels } from "../../actions/channel_actions";
import React from "react";
import { withRouter } from "react-router-dom";
const mapState = state => {
  let memberships = getUserMemberships(state, state.session.id);
  return {
    memberships: memberships,
    channels: Object.values(state.entities.channels),
    directs: Object.values(state.entities.directs),
    users: Object.values(state.entities.users),
    currentUserId: state.session.id,
  };
};

const mapDispatch = dispatch => {
  return {
    openCreateChannel: (
      <button onClick={() => dispatch(openModal({type:"createchannel"}))}>
        <i className="fas fa-plus"></i>
      </button>
    ),
    openCreateDirect: (
      <button onClick={() => dispatch(openModal({type:"createdirect"}))}>
        <i className="fas fa-plus"></i>
      </button>
    ),
    openBrowseChannel: (
      <button onClick={() => dispatch(openModal({type:"browsechannel"}))}>
        Channels
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Sidebar)
);
