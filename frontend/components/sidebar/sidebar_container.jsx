import { connect } from "react-redux";
import Sidebar from "./sidebar";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import { getUserMemberships } from "../../selectors/membership_selectors";
import React from "react";
const mapState = state => {
  let memberships = getUserMemberships(state, state.session.id);
  return {
    memberships: memberships
  };
};

const mapDispatch = dispatch => {
  return {
    openCreateChannel: (
      <button onClick={() => dispatch(openModal("createchannel"))}>
        <i className="fas fa-plus"></i>
      </button>
    ),
    openBrowseChannel: (
      <button onClick={() => dispatch(openModal("browsechannel"))}>
        Channels
      </button>
    ),
    closeModal: () => dispatch(closeModal()),
    fetchAllMemberships: () => dispatch(fetchMemberships())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Sidebar);
