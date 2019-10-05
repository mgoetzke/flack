import React from "react";

class MessageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.message;
    this.saveEdit = this.saveEdit.bind(this);
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  saveEdit() {
    this.props.updateMessage(this.state);
  }
  render() {
    return (
      <div>
        <div>
          <input
            onChange={this.update("body")}
            type="text"
            defaultValue={this.state.body}
          />
        </div>
        <button onClick={this.saveEdit}>&#8626; Save Changes</button>
      </div>
    );
  }
}

export default MessageEdit;
