import { connect } from "react-redux";
import ChannelBrowse from "./channelbrowse";
import { openModal, closeModal } from "../../actions/modal_actions";
import {fetchAllChannels} from '../../actions/channel_actions';
import { Redirect } from "react-router-dom";
import React from "react";
const mapState = (state, ownProps) => {
  return {
    channels: Object.values(state.entities.channels)
  };
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchAllChannels: () => dispatch(fetchAllChannels()),
    openCreateChannel: (
      <button
        className="modal-create-from-browse-button"
        onClick={() => dispatch(openModal({type:"createchannel"}))}
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
