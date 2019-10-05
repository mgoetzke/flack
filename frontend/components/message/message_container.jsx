import { connect } from "react-redux";
import Message from "./message";
import { updateMessage } from "../../actions/message_actions";

const mapState = (state, ownProps) => {
  return {
    message: ownProps.message,
    currentUser: ownProps.currentUser
  };
};

const mapDispatch = dispatch => {
  return {
    updateMessage: message => dispatch(updateMessage(message))
  };
};
export default connect(
  mapState,
  mapDispatch
)(Message);
