import React from "react";

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
    let testbg = this.state.editing ? "test-blue" : "";
    return (
      <>
        <img className="message-avatar" src={window[image_location]} />
        <div>
          <div className={testbg}>
            {this.state.message.display_name}
            <div>{this.state.message.body}</div>
            {this.state.message.created_at}
            {this.state.message.updated_at}
          </div>
          <button onClick={this.handleEditButton} className="message-edit">
            Edit
          </button>
        </div>
      </>
    );
  }
}

export default Message;
