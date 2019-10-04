import { connect } from "react-redux";
import MessageForm from "./messageform";
import { withRouter } from "react-router-dom";

const mapState = ({ session }) => {
  return { currentUser: session.id };
};

const mapDispatch = dispatch => {
  return {};
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(MessageForm)
);
