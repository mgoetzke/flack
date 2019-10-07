import { connect } from "react-redux";
import MemberAdd from "./MemberAdd";
import { closeModal } from "../../actions/modal_actions";
import { fetchAllUsers } from "../../actions/channel_actions";
import { createMembership } from "../../actions/membership_actions";
const mapState = (state, ownProps) => {
  return {
    // channels: Object.values(state.entities.channels)
  };
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createMembership: membership => dispatch(createMembership(membership))
    // fetchAllChannels: () => dispatch(fetchAllChannels())
  };
};
export default connect(
  mapState,
  mapDispatch
)(MemberAdd);
