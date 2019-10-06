import * as ChannelApiUtil from "../util/channel_api_util";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const fetchAllChannels = () => dispatch => {
  return ChannelApiUtil.fetchAllChannels().then(channels =>
    dispatch(receiveChannels(channels))
  );
};
export const fetchChannel = id => dispatch => {
  return ChannelApiUtil.fetchChannel(id).then(channel =>
    dispatch(receiveChannel(channel))
  );
};
export const createChannel = channel => dispatch => {
  return ChannelApiUtil.createChannel(channel).then(channel =>
    dispatch(receiveChannel(channel))
  );
};
export const destroyChannel = id => dispatch => {
  return ChannelApiUtil.destroyChannel(id).then(channel =>
    dispatch(removeChannel(channel))
  );
};
export const updateChannel = channel => dispatch => {
  return ChannelApiUtil.updateChannel(channel).then(channel =>
    dispatch(receiveChannel(channel))
  );
};

const receiveChannels = channels => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels
  };
};

const receiveChannel = channel => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
};

const removeChannel = channel => {
  debugger;
  return {
    type: REMOVE_CHANNEL,
    channelId: channel.id
  };
};
