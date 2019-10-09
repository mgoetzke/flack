export const getUserMemberships = (state, userId) => {
  let memberships = Object.values(state.entities.memberships);
  let user = parseInt(userId);
  return memberships.filter(membership => membership.user_id === user);
};

export const getChannelMemberships = (state, channelId) => {
  let memberships = Object.values(state.entities.memberships);
  let channel = parseInt(channelId);
  return memberships.filter(membership => membership.memberable_id === channel);
};

export const getChannelMemberIds = (state, channelId) => {
  return getChannelMemberships(state, channelId).map(membership => {
    return membership.user_id;
  });
};

export const getAllUsers = state => Object.values(state.entities.users);
