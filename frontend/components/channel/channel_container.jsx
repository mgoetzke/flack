import { connect } from "react-redux";
import Channel from './channel';
import {fetchChannel} from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';

const mapState = (state, ownProps) => {
  let default_channel = {name: "Default channel", topic: "defaulty", private: false, admin_id: 1};
  let channel = state.entities.channels[ownProps.match.params.channelId] || default_channel;
  return ({
    channel: channel,
  });
}

const mapDispatch = dispatch => {
  return ({
    fetchChannel: (id) => dispatch(fetchChannel(id)),

  });
}
export default withRouter(connect(mapState, mapDispatch)(Channel));