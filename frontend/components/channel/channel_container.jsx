import { connect } from "react-redux";
import Channel from './channel';
import {fetchChannel} from '../../actions/channel_actions';
import { withRouter } from 'react-router-dom';

const mapState = (state, ownProps) => {
  
  const defaultChannel = {name: "", topic: "", is_private: true};
  const channel = state.channels[ownProps.match.params.channel.id] || defaultChannel;
  return channel;
}

const mapDispatch = dispatch => {
  return ({
    fetchChannel: (id) => dispatch(fetchChannel(id)),

  });
}
export default withRouter(connect(mapState, mapDispatch)(Channel));