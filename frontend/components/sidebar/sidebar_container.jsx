import { connect } from "react-redux";
import Sidebar from "./sidebar";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    openCreateChannel: (
      <button onClick={() => dispatch(openModal("createchannel"))}>
        crete chan
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Sidebar);
