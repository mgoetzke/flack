import React from "react";
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      editing: false,
      currentUser: props.currentUser
    };
    this.toggleEditStatus = this.toggleEditStatus.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.update = this.update.bind(this);
  }
  toggleEditStatus() {
    let newEditState = this.state.editing === false ? true : false;
    this.setState({ editing: newEditState });
  }

  update(field) {
    return e => {
      let currentMessage = { ...this.state.message };
      currentMessage.body = e.currentTarget.value;
      this.setState({ message: currentMessage });
    };
  }

  saveEdit() {
    this.props.updateMessage(this.state.message);
    this.setState({ editing: false });
  }

  render() {
    let { message } = this.props;
    let image_location = message.image_url.split(".")[0];
    let userEdit = this.state.currentUser === message.user_id;
    let editButtonText = this.state.editing ? "Cancel" : "Edit";
    let createDate = new Date(message.created_at);
    let formatTime = createDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let editState = message.created_at !== message.updated_at;
    let messageView = (
      <>
        <div>
          <span className="message-item-name">{message.display_name}</span>
          
          <span className="message-item-time">{formatTime}</span>
        </div>
        <div>
          {message.body}
          {editState && <span className="message-item-editstate"> (edited)</span>}
        </div>
      </>
    );
    let editView = (
      <div>
        <div>
          <input
            onChange={this.update("body")}
            type="text"
            defaultValue={this.state.message.body}
          />
        </div>
        <button onClick={this.saveEdit}>&#8626; Save Changes</button>
      </div>
    );
    let messageBody = this.state.editing ? editView : messageView;
    return (
      <>
        <img className="message-avatar" src={window[image_location]} />
        <div>
          {messageBody}
          {userEdit && (
            <button onClick={this.toggleEditStatus} className="message-edit">
              {editButtonText}
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Message;
