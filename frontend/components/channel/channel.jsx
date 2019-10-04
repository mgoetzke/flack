import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
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
          let newMessage;
          switch (data.type) {
            case "message":
              newMessage = {
                body: data.body,
                id: data.id,
                user_id: data.user_id,
                messageable_id: data.messageable_id,
                messageable_type: data.messageable_type
              };
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
        <li key={message.id}>
          Author:
          {message.user_id}
          Message:
          {message.body}
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
