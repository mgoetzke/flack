import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    let msgType = props.location.pathname.includes("channels")
      ? "Channel"
      : "Direct";
    let msgId = props.location.pathname.includes("channels")
      ? props.match.params.channelId
      : props.match.params.directId;
    this.state = {
      body: "",
      user_id: props.currentUser,
      messageable_id: msgId,
      messageable_type: msgType
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({
      message: this.state
    });
    this.setState({ body: "", user_id: 1, messageable_id: 1 });
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
