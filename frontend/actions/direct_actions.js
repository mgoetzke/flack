import * as DirectApiUtil from "../util/direct_api_util";

export const RECEIVE_ALL_DIRECTS = "RECEIVE_ALL_DIRECTS";
export const RECEIVE_DIRECT = "RECEIVE_DIRECT";
export const RECEIVE_DIRECT_ERRORS = "RECEIVE_DIRECT_ERRORS";
export const CLEAR_DIRECT_ERRORS = "CLEAR_DIRECT_ERRORS";

export const fetchAllDirects = () => dispatch => {
  return DirectApiUtil.fetchAllDirects().then(directs =>
    dispatch(receiveDirects(directs))
  );
};

export const fetchUserDirects = id => dispatch => {
  return DirectApiUtil.fetchUserDirects(id).then(directs =>
    dispatch(receiveDirects(directs))
  );
};

export const fetchDirect = id => dispatch => {
  return DirectApiUtil.fetchDirect(id).then(direct => {
    dispatch(receiveDirect(direct));
  });
};
export const createDirect = direct => dispatch => {
  return DirectApiUtil.createDirect(direct).then(
    direct => dispatch(receiveDirect(direct)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
};

export const updateDirect = direct => dispatch => {
  return DirectApiUtil.updateDirect(direct).then(direct =>
    dispatch(receiveDirect(direct))
  );
};

export const clearDirectErrors = () => {
  return {
    type: CLEAR_DIRECT_ERRORS
  };
};

export const receiveErrors = errors => {
  return {
    type: RECEIVE_DIRECT_ERRORS,
    errors
  };
};

const receiveDirects = directs => {
  return {
    type: RECEIVE_ALL_DIRECTS,
    directs
  };
};

export const receiveDirect = direct => {
  return {
    type: RECEIVE_DIRECT,
    direct
  };
};
