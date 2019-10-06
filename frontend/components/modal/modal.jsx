import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";
import ChannelCreate_Container from "../channelcreate/channelcreate_container";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "createchannel":
      component = <ChannelCreate_Container />;
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

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
