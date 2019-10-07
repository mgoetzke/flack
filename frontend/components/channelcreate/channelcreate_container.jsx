import { connect } from "react-redux";
import ChannelCreate from "./channelcreate";
import { createChannel } from "../../actions/channel_actions";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";
import { withRouter } from "react-router-dom";

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
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(ChannelCreate)
);
