import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.bottom = React.createRef();
  }
  componentDidMount() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          this.setState({
            messages: this.state.messages.concat(data.message)
          });
        },
        speak: function(data) {
          return this.perform("speak", data);
        }
      }
    );
  }

  componentDidUpdate() {
    this.bottom.current.scrollIntoView();
  }
  render() {
    const messages = this.state.messages.map(message => {
      return (
        <li key={message.id}>
          {message}
          <div ref={this.bottom} />
        </li>
      );
    });

    return (
      <div className="channel-container">
        <div>Tutorial chatroom</div>
        <div className="message-list">{messages}</div>
        <MessageFormContainer />
      </div>
    );
  }
}

export default Channel;
