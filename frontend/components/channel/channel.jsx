import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message_container";

class Channel extends React.Component {
  constructor(props) {
    super(props);
    let channelId = parseInt(props.match.params.channelId);
    let channelMessages = this.props.messages.filter(message => {
      return message.messageable_id === parseInt(channelId);
    });
    let channelMemberships = this.props.memberships.filter(membership => {
      return membership.membershipable_id === parseInt(channelId);
    });
    this.state = {
      messages: channelMessages,
      currentUser: props.currentUser,
      channel: props.channel,
      memberships: channelMemberships,
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
    const { channelId } = this.props;
    const { receiveMessage } = this.props;
    App.cable.subscriptions.create(
      { channel: "ChatChannel", id: channelId }, //slip data inside object and include id there history push
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

  componentDidUpdate(prevProps) {
    if (this.bottom.current) {
      this.bottom.current.scrollIntoView();
    }
    if (this.props.location !== prevProps.location) {
      const { channelId } = this.props;
      this.configChat();
      let newMessages = this.props.messages.filter(message => {
        return message.messageable_id === parseInt(channelId);
      });
      let newMemberships = this.props.memberships.filter(membership => {
        return membership.memberable_id === parseInt(channelId);
      });
      this.setState({
        messages: newMessages,
        memberships: newMemberships,
        cogPopUpVisibility: "menu-hide"
      });
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
    // TO DO BAD CODE EDIT
    this.setState({ cogPopUpVisibility: "menu-hide" });
    let id = this.props.memberships.filter(
      membership => membership.user_id === this.state.currentUser.id
    )[0].id;
    this.props.destroyMembership(id);
  }

  render() {
    let { channel, memberships } = this.props;
    let formatMessages = this.props.messages
      .filter(message => {
        return message.messageable_id === parseInt(channel.id);
      })
      .map(message => {
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
    let channelMemberToggleText = memberStatus ? `Leave` : `Join`;
    let channelCreator = channel.admin;
    debugger;
    let channelCreation = new Date(channel.created_at);
    var options = { year: "numeric", month: "long", day: "numeric" };
    let formatCreation = channelCreation.toLocaleDateString([], options);
    let protectedChannels = ["general", "random"];
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
                <i className="far fa-edit"></i>
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
              {!protectedChannels.includes(channel.name) && (
                <li>
                  <button
                    onClick={channelMemberToggleFunction}
                    className="channelMemberToggleFunction"
                  >
                    <span className="channel-name-long">
                      {channelMemberToggleText}
                      {privacyIcon}
                      {channel.name}
                    </span>
                  </button>
                </li>
              )}
              {memberStatus && (
                <li>
                  <div onClick={this.hideMenu2}>
                    {this.props.openAddMembership}
                  </div>
                </li>
              )}
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
