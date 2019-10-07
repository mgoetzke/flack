import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message_container";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages,
      currentUser: props.currentUser,
      channel: props.channel,
      memberships: props.memberships
    };
    this.bottom = React.createRef();
    this.createMembership = this.createMembership.bind(this);
    this.destroyMembership = this.destroyMembership.bind(this);
  }

  configChat() {
    const { receiveMessage } = this.props;
    App.cable.subscriptions.create(
      { channel: "ChatChannel", id: this.props.channelId }, //slip data inside object and include id there history push
      {
        received: data => {
          let incomingMessage = JSON.parse(data.message);
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
  componentDidMount() {
    const { channelId, fetchChannelMessages, fetchChannelMembers } = this.props;
    this.configChat();
    fetchChannelMembers(channelId);
    fetchChannelMessages(channelId);
  }

  componentDidUpdate(prevProps) {
    if (this.bottom.current) {
      this.bottom.current.scrollIntoView();
    }
    if (this.props.location !== prevProps.location) {
      const {
        channelId,
        fetchChannelMessages,
        fetchChannelMembers
      } = this.props;
      this.configChat();
      fetchChannelMembers(channelId);
      fetchChannelMessages(channelId);
    }
  }

  createMembership() {
    let user_id = this.props.currentUser.id;
    let memberable_id = parseInt(this.props.channelId);
    let memberable_type = "Channel";
    this.props.createMembership({ memberable_id, user_id, memberable_type });
  }

  destroyMembership() {
    // TO DO JANK EDIT
    let id = this.props.memberships.filter(
      membership => membership.user_id === this.state.currentUser.id
    )[0].id;
    this.props.destroyMembership(id);
  }

  render() {
    let { messages, channel, memberships } = this.props;
    let formatMessages = messages.map(message => {
      return (
        <>
          <MessageContainer
            currentUser={this.props.currentUser}
            message={message}
          />
          <div ref={this.bottom} />
        </>
      );
    });
    let memberStatus =
      memberships.filter(
        membership => membership.user_id === this.state.currentUser.id
      ).length > 0;
    let channelMemberToggleText = memberStatus
      ? "Leave channel"
      : "Join channel";
    let channelMemberToggleFunction = memberStatus
      ? this.destroyMembership
      : this.createMembership;
    return (
      <div className="channel-container">
        <div className="message-list">{formatMessages}</div>
        <MessageFormContainer channel={channel} />
        <button onClick={channelMemberToggleFunction}>
          {channelMemberToggleText}
        </button>
      </div>
    );
  }
}

export default Channel;
