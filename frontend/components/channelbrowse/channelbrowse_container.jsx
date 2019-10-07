import { connect } from "react-redux";
import ChannelBrowse from "./channelbrowse";
import { closeModal } from "../../actions/modal_actions";
import { fetchAllChannels } from "../../actions/channel_actions";
const mapState = (state, ownProps) => {
  fetchAllChannels();
  return {
    channels: Object.values(state.entities.channels)
  };
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchAllChannels: () => dispatch(fetchAllChannels())
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelBrowse);
