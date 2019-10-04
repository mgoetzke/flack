import React from "react";
class Channel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchChannel(this.props.match.params.channelId);
    this.props.fetchAllMessages();
  }
  render() {
    const messages = this.props.messages || [];
    const message_bodies = messages.map(message => {
      return <li key={message.id}>{message.body}</li>;
    });
    return (
      <div>
        <h1>Channel name: {this.props.channel.name}</h1>
        <h1>Channel topic: {this.props.channel.topic}</h1>
        <h1>Messages</h1>
        <ul>{message_bodies}</ul>
      </div>
    );
  }
}

export default Channel;
