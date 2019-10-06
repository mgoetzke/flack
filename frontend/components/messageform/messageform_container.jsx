import { connect } from "react-redux";
import MessageForm from "./messageform";
import { withRouter } from "react-router-dom";

const mapState = (state, ownProps) => {
  return { currentUser: state.session.id,
  channel: ownProps.channel };
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
