import * as ChannelApiUtil from "../util/channel_api_util";

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";

export const fetchAllChannels = () => dispatch => {
  ChannelApiUtil.fetchAllChannels()
    .then(channels => dispatch(receiveChannels(channels)))
}
export const fetchChannel = (id) => dispatch => {
  ChannelApiUtil.fetchChannel(id)
    .then(channel => dispatch(receiveChannel(channel)))
}
export const createChannel = (channel) => dispatch => {
  ChannelApiUtil.createChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)))
} 
export const destroyChannel = (id) => dispatch => {
  ChannelApiUtil.destroyChannel(id)
    .then(channel => dispatch(removeChannel(channel.id)))
}
export const updateChannel = (channel) => dispatch => {
  ChannelApiUtil.updateChannel(channel)
    .then(channel => dispatch(receiveChannel(channel)))
} 

const receiveChannels = (channels) => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels
  };
};

const receiveChannel = (channel) => {
  return {
    type: RECEIVE_CHANNEL,
    channel
  };
};

const removeChannel = channelId => {
  return {
    type: REMOVE_CHANNEL,
    channelId
  };
};