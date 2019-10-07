import * as MembershipApiUtil from "../util/membership_api_util";

export const RECEIVE_MEMBERSHIPS = "RECEIVE_MEMBERSHIPS";
export const RECEIVE_MEMBERSHIP = "RECEIVE_MEMBERSHIP";
export const REMOVE_MEMBERSHIP = "REMOVE_MEMBERSHIP";

export const fetchMemberships = () => dispatch => {
  return MembershipApiUtil.fetchMemberships().then(memberships =>
    dispatch(receiveMemberships(memberships))
  );
};

export const fetchMembership = id => dispatch => {
  return MembershipApiUtil.fetchMembership(id).then(membership =>
    dispatch(receiveMembership(membership))
  );
};
export const createMembership = membership => dispatch => {
  return MembershipApiUtil.createMembership(membership).then(membership =>
    dispatch(receiveMembership(membership))
  );
};
export const destroyMembership = membershipId => dispatch => {
  return MembershipApiUtil.destroyMembership(membershipId).then(membership =>
    dispatch(removeMembership(membershipId))
  );
};

export const fetchChannelMembers = channelId => dispatch => {
  return MembershipApiUtil.fetchChannelMemberships(channelId).then(
    memberships => dispatch(receiveMemberships(memberships))
  );
};

const receiveMemberships = memberships => {
  return {
    type: RECEIVE_MEMBERSHIPS,
    memberships
  };
};

const receiveMembership = membership => {
  return {
    type: RECEIVE_MEMBERSHIP,
    membership
  };
};

const removeMembership = membershipId => {
  return {
    type: REMOVE_MEMBERSHIP,
    membershipId
  };
};
