import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { body: "" };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({
      message: this.state.body
    });
    this.setState({ body: "" });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="message-form"
            type="text"
            value={this.state.body}
            onChange={this.update("body")}
            placeholder="message body"
          />
          <input className="message-submit" type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}

export default MessageForm;
