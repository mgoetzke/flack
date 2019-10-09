import { connect } from "react-redux";
import MemberAdd from "./memberadd";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";
import { getAllUsers } from "../../selectors/membership_selectors";

const mapState = (state, ownProps) => {
  return {
    users: getAllUsers(state),
    channels: Object.values(state.entities.channels)
  };
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createMembership: membership => dispatch(createMembership(membership))
  };
};
export default connect(
  mapState,
  mapDispatch
)(MemberAdd);
