import React from "react";
class Message extends React.Component {
  constructor(props) {
    super(props);
    debugger;
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
    let messageView = (
      <div>
        {message.display_name}
        <div>{message.body}</div>
        {message.created_at}
        {message.updated_at}
      </div>
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
      <div>
        <img className="message-avatar" src={window[image_location]} />
        <div>
          {messageBody}
          {userEdit && (
            <button onClick={this.toggleEditStatus} className="message-edit">
              {editButtonText}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Message;
