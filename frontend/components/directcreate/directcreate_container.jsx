import { connect } from "react-redux";
import DirectCreate from "./directcreate";
import { createDirect } from "../../actions/direct_actions";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";
import { withRouter } from "react-router-dom";
import { getAllUsers } from "../../selectors/membership_selectors";

const mapState = (state, ownProps) => {
  return {
    errors: state.errors.direct,
    currentUser: state.session.id,
    users: getAllUsers(state)
  };
};

const mapDispatch = dispatch => {
  return {
    createDirect: direct => dispatch(createDirect(direct)),
    createMembership: membership => dispatch(createMembership(membership)),
    closeModal: () => dispatch(closeModal())
  };
};
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(DirectCreate)
);
