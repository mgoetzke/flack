import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message_container";
import { fetchChannel } from "../../util/channel_api_util";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [props.messages],
      currentUser: props.currentUser,
      channel: props.channel,
      memberships: props.memberships,
      cogPopUpVisibility: "menu-hide"
    };
    this.bottom = React.createRef();
    this.createMembership = this.createMembership.bind(this);
    this.destroyMembership = this.destroyMembership.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.hideMenu2 = this.hideMenu2.bind(this);
  }
  showMenu(e) {
    if (this.state) {
      this.setState({ cogPopUpVisibility: "" });
    }
  }
  hideMenu(e) {
    if (!e.relatedTarget) {
      this.setState({ cogPopUpVisibility: "menu-hide" });
    } else {
    }
  }

  hideMenu2() {
    this.setState({ cogPopUpVisibility: "menu-hide" });
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
    const {
      channelId,
      fetchChannelMessages,
      fetchMemberships,
      fetchChannel
    } = this.props;
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
    fetchMemberships()
      .then(fetchChannel(channelId))
      .then(fetchChannelMessages(channelId));
  }

  componentDidUpdate(prevProps) {
    if (this.bottom.current) {
      this.bottom.current.scrollIntoView();
    }
    if (this.props.location !== prevProps.location) {
      const { channelId, fetchChannelMessages, fetchMemberships } = this.props;
      this.configChat();
      fetchMemberships()
        .then(fetchChannel(channelId))
        .then(fetchChannelMessages(channelId));
    }
  }

  createMembership() {
    let user_id = this.props.currentUser.id;
    let memberable_id = parseInt(this.props.channelId);
    let memberable_type = "Channel";
    this.setState({ cogPopUpVisibility: "menu-hide" });
    this.props.createMembership({ memberable_id, user_id, memberable_type });
  }

  destroyMembership() {
    // TO DO JANK EDIT
    this.setState({ cogPopUpVisibility: "menu-hide" });
    let id = this.props.memberships.filter(
      membership => membership.user_id === this.state.currentUser.id
    )[0].id;
    this.props.destroyMembership(id);
  }

  render() {
    let { messages, channel, memberships } = this.props;
    let formatMessages = messages.map(message => {
      return (
        <MessageContainer
          currentUser={this.props.currentUser}
          message={message}
          key={message.id}
        />
      );
    });
    let memberStatus =
      memberships.filter(
        membership => membership.user_id === this.state.currentUser.id
      ).length > 0;
    let memberCount = memberships.length;
    let channelMemberToggleFunction = memberStatus
      ? this.destroyMembership
      : this.createMembership;
    let privacyIcon =
      channel.private === false ? "#" : <i className="fas fa-lock"></i>;
    let channelMemberToggleText = memberStatus
      ? `Leave ${privacyIcon}${channel.name}`
      : `Join ${privacyIcon}${channel.name}`;
    let channelCreator = channel.admin;
    let channelCreation = new Date(channel.created_at);
    var options = { year: "numeric", month: "long", day: "numeric" };
    let formatCreation = channelCreation.toLocaleDateString([], options);
    let footer = memberStatus ? (
      <MessageFormContainer channel={channel} />
    ) : (
      <div className="channel-join-banner">
        <div className="channel-join-text">
          <div className="title">
            <span>
              You are viewing{" "}
              <span className="joinName">
                {privacyIcon}
                {channel.name}
              </span>
            </span>
          </div>
          <div className="creator">
            Created by {channelCreator} on {formatCreation}
          </div>
        </div>
        <button
          onClick={channelMemberToggleFunction}
          className="join-banner-button"
        >
          Join Channel
        </button>
      </div>
    );

    return (
      <div className="channel-container">
        <div className="channel-header">
          <div className="channel-header-deets">
            <div className="channel-header-name">
              {privacyIcon} <h3>{channel.name}</h3>
            </div>
            <div className="channel-header-icons">
              <i className="far fa-star star-icon"></i>|
              <span className="channel-header-user">
                <i className="far fa-user"></i>
                {memberCount}
              </span>
              |
              <span>
                <i class="far fa-edit"></i>
                {channel.topic}
              </span>
            </div>
          </div>
          <div className="channel-header-functions">
            <i
              className="fas fa-cog"
              tabIndex="0"
              onFocus={this.showMenu}
              onBlur={this.hideMenu}
            ></i>
            <div
              className={`channel-header-popup ${this.state.cogPopUpVisibility}`}
            >
              <li>
                <button
                  onClick={channelMemberToggleFunction}
                  className="channelMemberToggleFunction"
                >
                  {channelMemberToggleText}
                </button>
              </li>
              <li>
                <div onClick={this.hideMenu2}>
                  {this.props.openAddMembership}
                </div>
              </li>
            </div>
          </div>
        </div>
        <div className="message-list">
          <ul>{formatMessages}</ul>
          <div ref={this.bottom}></div>
        </div>
        {footer}
      </div>
    );
  }
}

export default Channel;
