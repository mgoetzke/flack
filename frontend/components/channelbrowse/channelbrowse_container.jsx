import { connect } from "react-redux";
import ChannelBrowse from "./channelbrowse";
import { openModal, closeModal } from "../../actions/modal_actions";
import { fetchAllChannels } from "../../actions/channel_actions";
import React from "react";
const mapState = (state, ownProps) => {
  fetchAllChannels();
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
    ),
    fetchAllChannels: () => dispatch(fetchAllChannels())
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelBrowse);
