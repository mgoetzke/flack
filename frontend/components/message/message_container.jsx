import { connect } from "react-redux";
import Message from "./message";
import { withRouter } from "react-router-dom";
import { updateMessage } from "../../actions/message_actions";

const mapState = state => {
  return {
    message: state.message,
    currentUser: state.currentUser
  };
};

const mapDispatch = dispatch => {
  return {
    updateMessage: message => dispatch(updateMessage(message))
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Message)
);
