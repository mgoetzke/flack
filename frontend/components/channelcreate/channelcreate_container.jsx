import { connect } from "react-redux";
import ChannelCreate from "./channelcreate";
import { createChannel } from "../../actions/channel_actions";
import { closeModal } from "../../actions/modal_actions";
const mapState = ({ errors }, ownProps) => {
  return {
    errors: errors.channel
  };
};

const mapDispatch = dispatch => {
  return {
    createChannel: channel => dispatch(createChannel(channel)),
    closeModal: () => dispatch(closeModal())
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelCreate);
