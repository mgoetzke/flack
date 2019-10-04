import * as MessageApiUtil from "../util/message_api_util";

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const fetchAllMessages = () => dispatch => {
    return MessageApiUtil.fetchAllMessages()
        .then(messages => dispatch(receiveMessages(messages)))
}
export const fetchMessage = (id) => dispatch => {
    return MessageApiUtil.fetchMessage(id)
        .then(message => dispatch(receiveMessage(message)))
}
export const createMessage = (message) => dispatch => {
    return MessageApiUtil.createMessage(message)
        .then(message => dispatch(receiveMessage(message)))
}

export const updateMessage = () => dispatch => {
    return MessageApiUtil.updateMessage(message)
        .then(message => dispatch(receiveMessage(message)))
}

const receiveMessages = (messages) => {
    return {
        type: RECEIVE_ALL_MESSAGES,
        messages
    };
};

const receiveMessage = (message) => {
    return {
        type: RECEIVE_MESSAGE,
        message
    };
};
