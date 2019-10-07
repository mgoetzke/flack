import { connect } from "react-redux";
import MemberAdd from "./MemberAdd";
import { closeModal } from "../../actions/modal_actions";
import { fetchAllUsers } from "../../actions/channel_actions";
import { createMembership } from "../../actions/membership_actions";
const mapState = (state, ownProps) => {
  return {
    users: Object.values(state.entities.users),
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
