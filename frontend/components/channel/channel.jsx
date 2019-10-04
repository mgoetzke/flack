import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: props.messages };
    this.bottom = React.createRef();
    this.loadChat = this.loadChat.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllMessages();
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          switch (data.type) {
            case "message":
              this.setState({
                messages: this.state.messages.concat(data.message)
              });
              break;
            case "messages":
              this.setState({
                messages: data.messages
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
  loadChat(e) {
    e.preventDefault();
    App.cable.subscriptions.subscriptions[0].load();
  }
  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }
  render() {
    const { messages } = this.props;
    const format_messages = Object.values(messages).map(message => {
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
        <div>walkthrough</div>
        <button className="load-button" onClick={this.loadChat}>
          load history
        </button>
        <div className="message-list">{format_messages}</div>
        <MessageFormContainer />
      </div>
    );
  }
}

export default Channel;
