export const getChannelMessages = (state, channelId) => {
  let messages = Object.values(state.entities.messages);
  return messages.filter(message => {
    message.messageable_id === channelId;
  });
};

export const getChannelMembers = (state, channelId) => {
  let memberships = Object.values(state.entities.memberships);
  return memberships.filter(
    membership => membership.messageable_id === channelId
  );
};
