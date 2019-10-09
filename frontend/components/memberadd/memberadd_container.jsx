import { connect } from "react-redux";
import MemberAdd from "./memberadd";
import { closeModal } from "../../actions/modal_actions";
import { createMembership } from "../../actions/membership_actions";
import {
  getAllUsers,
  getChannelMemberIds
} from "../../selectors/membership_selectors";

const mapState = (state, ownProps) => {
  return {
    users: getAllUsers(state),
    channels: Object.values(state.entities.channels),
    memberable_id: ownProps.memberable_id,
    memberableUsers: getChannelMemberIds(state, ownProps.memberable_id),
    memberable_type: ownProps.memberable_type.slice(
      0,
      ownProps.memberable_type.length - 1
    ),
    currentUserId: state.session.id
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
