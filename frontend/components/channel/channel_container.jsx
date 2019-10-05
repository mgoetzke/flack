import { connect } from "react-redux";
import Channel from "./channel";
import { fetchChannel } from "../../actions/channel_actions";
import { withRouter } from "react-router-dom";
import {
  fetchAllMessages,
  fetchChannelMessages
} from "../../actions/message_actions";

const mapState = (state, ownProps) => {
  let default_channel = {
    name: "Default channel",
    topic: "defaulty",
    private: false,
    admin_id: 1
  };
  let channel =
    state.entities.channels[ownProps.match.params.channelId] || default_channel;
  let messages =
    Object.keys(state.entities.messages).map(
      id => state.entities.messages[id]
    ) || {};
  return {
    channel,
    messages,
    error: "error"
  };
};

const mapDispatch = dispatch => {
  return {
    fetchChannel: id => dispatch(fetchChannel(id)),
    fetchAllMessages: () => dispatch(fetchAllMessages()),
    fetchChannelMessages: () => dispatch(fetchChannelMessages())
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Channel)
);
