import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    let msgType = props.location.pathname.includes("channels")
      ? "Channel"
      : "Direct";
    let msgId = props.location.pathname.includes("channels")
      ? this.props.match.params.channelId
      : this.props.match.params.directId;
    this.state = {
      body: "",
      user_id: props.currentUser,
      messageable_type: msgType
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }
  componentDidUpdate() {
    // this.setState({ messageable_id: 2})
  }

  handleSubmit(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].speak({
      message: {
        ...this.state,
        messageable_id: this.props.match.params.channelId
      }
    });
    this.setState({
      body: ""
    });
  }

  render() {
    let channelNameRendered = this.props.location.pathname.includes("channels")
      ? "Message #" + this.props.channel.name
      : "Message direct message users";
    return (
      <form className="message-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.body}
          onChange={this.update("body")}
          placeholder={channelNameRendered}
        />
      </form>
    );
  }
}

export default MessageForm;
