import { connect } from "react-redux";
import ChannelBrowse from "./channelbrowse";
import { closeModal } from "../../actions/modal_actions";
const mapState = ({ errors }, ownProps) => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};
export default connect(
  mapState,
  mapDispatch
)(ChannelBrowse);
