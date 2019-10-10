import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import ChannelCreate_Container from "../channelcreate/channelcreate_container";
import ChannelDirect_Container from "../directcreate/directcreate_container";
import ChannelBrowse_Container from "../channelbrowse/channelbrowse_container";
import MemberAdd_container from "../memberadd/memberadd_container";
import { withRouter } from "react-router-dom";
function Modal({ modal, history }) {
  let path = history.location.pathname;
  if (!modal) {
    return null;
  }
  let component;
  let memberable_type;
  let memberable_id;
  switch (modal) {
    case "createchannel":
      component = <ChannelCreate_Container />;
      break;
    case "createdirect":
      component = <ChannelDirect_Container />;
      break;
    case "browsechannel":
      component = <ChannelBrowse_Container />;
      break;
    case "addmembership":
      memberable_type = path.split("/")[2];
      memberable_id = path.split("/")[3];
      component = (
        <MemberAdd_container
          memberable_type={memberable_type}
          memberable_id={memberable_id}
        />
      );
      break;
    default:
      return null;
  }
  return (
    <div className="modal-child" onClick={e => e.stopPropagation()}>
      {component}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Modal)
);
