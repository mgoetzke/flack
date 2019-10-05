import React from "react";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.message;
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit() {
    this.props.updateMessage(this.state);
  }
  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <div>
        {this.state.display_name}
        <div contentEditable="true" onChange={this.update("body")}>
          {this.state.body}
        </div>
        {this.state.created_at}
        {this.state.updated_at}
        <button onClick={this.handleEdit} className="message-delete">
          Edit
        </button>
      </div>
    );
  }
}

export default Message;
