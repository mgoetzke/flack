import { connect } from "react-redux";
import Splash from "./splash";

const mapState = ({ session, entities: { users } }, ownProps) => {
  return ({
    currentUser: users[session.id]
  });
}

const mapDispatch = dispatch => {
  return ({

  });
}

export default connect(mapState, mapDispatch)(Splash);