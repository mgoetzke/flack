import { connect } from "react-redux";
import ChannelBrowse from "./channelbrowse";
import { openModal, closeModal } from "../../actions/modal_actions";
import React from "react";
const mapState = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels)
  };
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    openCreateChannel: (
      <button
        className="modal-create-from-browse-button"
        onClick={() => dispatch(openModal("browsechannel"))}
      >
        Create Channel
      </button>
    )
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelBrowse);
