import { connect } from "react-redux";
import Main from "./main";
import { fetchAllUsers } from "../../actions/user_actions";
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Main);
