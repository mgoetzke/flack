import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message";
import merge from "lodash/merge";
class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: {} };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchAllMessages();
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          let incomingMessage = JSON.parse(data.message);
          switch (data.type) {
            case "message":
              this.setState({
                messages: merge({}, this.state.messages, {
                  [incomingMessage.id]: incomingMessage
                })
              });
              break;
            case "edit":
              this.setState({
                messages: merge({}, this.state.messages, {
                  [incomingMessage.id]: incomingMessage
                })
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
    const allMessages = merge({}, messages, this.state.messages);
    debugger;
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
