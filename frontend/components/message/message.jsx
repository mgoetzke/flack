import React from "react";
import MessageEditContainer from "../messagedit/messageedit_container";
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: props.message, editing: false };
    this.handleEditButton = this.handleEditButton.bind(this);
  }
  handleEditButton() {
    let newEditState = this.state.editing === false ? true : false;
    this.setState({ editing: newEditState });
  }

  render() {
    let { message } = this.props;
    let image_location = message.image_url.split(".")[0];
    let messageView = (
      <li>
        {message.display_name}
        <div>{message.body}</div>
        {message.created_at}
        {message.updated_at}
      </li>
    );
    let messageBody = this.state.editing ? (
      <MessageEditContainer message={message} />
    ) : (
      messageView
    );
    return (
      <>
        <img className="message-avatar" src={window[image_location]} />
        <div>
          {messageBody}
          <button onClick={this.handleEditButton} className="message-edit">
            Edit
          </button>
        </div>
      </>
    );
  }
}

export default Message;
