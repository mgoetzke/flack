import { connect } from "react-redux";
import Sidebar from "./sidebar";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchMemberships } from "../../actions/membership_actions";
import React from "react";
const mapState = state => {
  return {
    memberships: state.entities.memberships
  };
};

const mapDispatch = dispatch => {
  return {
    openCreateChannel: (
      <button onClick={() => dispatch(openModal("createchannel"))}>
        Create Channel
      </button>
    ),
    openBrowseChannel: (
      <button onClick={() => dispatch(openModal("browsechannel"))}>
        Browse Channel
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
