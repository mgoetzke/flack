import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message";
class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchAllMessages();
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          let newMessage = JSON.parse(data.message);
          switch (data.type) {
            default:
              this.setState({
                messages: this.state.messages.concat([newMessage])
              });
              break;
          }
        },
        speak: function(message) {
          return this.perform("speak", message);
        },
        load: function() {
          return this.perform("load");
        }
      }
    );
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }
  render() {
    const { messages } = this.props;
    const allMessages = messages.concat(this.state.messages);
    const format_messages = Object.values(allMessages).map(message => {
      return (
        <li className="message-item" key={message.id}>
          <MessageContainer message={message} />
          <div ref={this.bottom} />
        </li>
      );
    });
    return (
      <div className="channel-container">
        <div>{this.props.channel.name}</div>
        <div className="message-list">{format_messages}</div>
        <MessageFormContainer />
      </div>
    );
  }
}

export default Channel;
