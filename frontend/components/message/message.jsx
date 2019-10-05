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
    let image_location = this.state.image_url.split(".")[0];
    return (
      <div>
        {this.state.display_name}
        <img className="message-avatar" src={window[image_location]} />
        <div>{this.state.body}</div>
        {this.state.created_at}
        {this.state.updated_at}
        <button onClick={this.handleEdit} className="message-edit">
          Edit
        </button>
      </div>
    );
  }
}

export default Message;
