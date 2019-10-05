import { connect } from "react-redux";
import MessageEdit from "./messageedit";
import { withRouter } from "react-router-dom";
import { updateMessage } from "../../actions/message_actions";

const mapState = ({ message }) => {
  return {
    message
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
  )(MessageEdit)
);
