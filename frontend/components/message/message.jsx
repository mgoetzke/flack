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
  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    let image_location = this.state.message.image_url.split(".")[0];
    let messageView = (
      <div>
        {this.state.message.display_name}
        <div>{this.state.message.body}</div>
        {this.state.message.created_at}
        {this.state.message.updated_at}
      </div>
    );
    let messageBody = this.state.editing ? (
      <MessageEditContainer message={this.state.message} />
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
