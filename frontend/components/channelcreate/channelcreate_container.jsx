import { connect } from "react-redux";
import ChannelCreate from "./channelcreate";
import { createChannel } from "../../actions/channel_actions";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";

const mapState = ({ errors, session }, ownProps) => {
  return {
    errors: errors.channel,
    currentUser: session.id
  };
};

const mapDispatch = dispatch => {
  return {
    createChannel: channel => dispatch(createChannel(channel)),
    createMembership: membership => dispatch(createMembership(membership)),
    closeModal: () => dispatch(closeModal())
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelCreate);
