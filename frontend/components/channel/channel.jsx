import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message_container";

import merge from "lodash/merge";
class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages,
       currentUser: props.currentUser,
       channel: props.channel };
    this.bottom = React.createRef();
  }

  componentDidMount() {
    this.props.fetchAllMessages();
    const { receiveMessage } = this.props;
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          let incomingMessage = JSON.parse(data.message);
          let test = incomingMessage.id;
          switch (data.type) {
            case "message":
              receiveMessage(incomingMessage);
              break;
            case "edit":
              receiveMessage(incomingMessage);
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

  componentDidUpdate(prevProps) {
    this.bottom.current.scrollIntoView();
    // window.scrollTo(this.bottom.current);
  }
  render() {
    let { messages } = this.props;
    let formatMessages = messages.map(message => {
      return (
          <li className="message-item" key={message.id}>
            <MessageContainer
              currentUser={this.props.currentUser}
              message={message}
            />
            <div ref={this.bottom} />
          </li>
      );
    });
    return (
      <div className="channel-container">
        <div className="message-list">{formatMessages}</div>
        <MessageFormContainer channel = {this.props.channel} />
      </div>
    );
  }
}

export default Channel;
