import { connect } from "react-redux";
import DirectCreate from "./directcreate";
import { createDirect, fetchUserDirects } from "../../actions/direct_actions";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";
import { withRouter } from "react-router-dom";
import {
  getAllUsers,
  getUserDirects
} from "../../selectors/membership_selectors";

const mapState = (state, ownProps) => {
  return {
    errors: state.errors.direct,
    currentUserId: state.session.id,
    users: getAllUsers(state),
    prevUsers: ownProps.prevUsers || [],
    directs: getUserDirects(state, state.session.id)
  };
};

const mapDispatch = dispatch => {
  return {
    createDirect: direct => dispatch(createDirect(direct)),
    fetchUserDirects: id => dispatch(fetchUserDirects(id)),
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
