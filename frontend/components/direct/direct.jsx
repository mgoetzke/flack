import React from "react";
import MessageFormContainer from "../messageform/messageform_container";
import MessageContainer from "../message/message_container";

class Direct extends React.Component {
  constructor(props) {
    super(props);
    let directId = parseInt(props.match.params.directId);
    let directMessages = this.props.messages.filter(message => {
      return message.messageable_id === parseInt(directId);
    });
    let directMemberships = this.props.memberships.filter(membership => {
      return membership.membershipable_id === parseInt(directId);
    });
    this.state = {
      messages: directMessages,
      currentUser: props.currentUser,
      direct: props.direct,
      memberships: directMemberships,
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
    App.channel = App.cable.subscriptions.create(
      { channel: "ChatDirect", id: this.props.directId }, //slip data inside object and include id there history push
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
    const { directId } = this.props;
    const { receiveMessage } = this.props;
    App.channel = App.cable.subscriptions.create(
      { channel: "ChatDirect", id: directId }, //slip data inside object and include id there history push
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
      const { directId } = this.props;
      this.configChat();
      let newMessages = this.props.messages.filter(message => {
        return message.messageable_id === parseInt(directId);
      });
      let newMemberships = this.props.memberships.filter(membership => {
        return membership.memberable_id === parseInt(directId);
      });
      this.setState({
        messages: newMessages,
        memberships: newMemberships
      });
    }
  }

  createMembership() {
    let user_id = this.props.currentUser.id;
    let memberable_id = parseInt(this.props.directId);
    let memberable_type = "Direct";
    this.setState({ cogPopUpVisibility: "menu-hide" });
    this.props.createMembership({ memberable_id, user_id, memberable_type });
  }

  destroyMembership() {
    //xyz
    this.setState({ cogPopUpVisibility: "menu-hide" });
    let id = this.props.memberships.filter(
      membership => membership.user_id === this.state.currentUser.id
    )[0].id;
    this.props.destroyMembership(id);
  }

  render() {
    let { direct, memberships } = this.props;
    let formatMessages = this.props.messages
      .filter(message => {
        return (
          message.messageable_id === parseInt(direct.id) &&
          message.messageable_type === "Direct"
        );
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
    let directMemberToggleFunction = memberStatus
      ? this.destroyMembership
      : this.createMembership;
    let privacyIcon =
      direct.private === false ? "#" : <i className="fas fa-lock"></i>;
    let directMemberToggleText = memberStatus ? `Leave` : `Join`;
    let directCreator = direct.admin;
    let directCreation = new Date(direct.created_at);
    var options = { year: "numeric", month: "long", day: "numeric" };
    let formatCreation = directCreation.toLocaleDateString([], options);
    let footer = memberStatus ? (
      <MessageFormContainer direct={direct} />
    ) : (
      <div className="direct-join-banner">
        <div className="direct-join-text">
          <div className="title">
            <span>
              You are viewing{" "}
              <span className="joinName">
                {privacyIcon}
                {direct.name}
              </span>
            </span>
          </div>
          <div className="creator">
            Created by {directCreator} on {formatCreation}
          </div>
        </div>
        <button
          onClick={directMemberToggleFunction}
          className="join-banner-button"
        >
          Join Direct
        </button>
      </div>
    );
    return (
      <div className="direct-container">
        <div className="direct-header">
          <div className="direct-header-deets">
            <div className="direct-header-name">
              <h3>{direct.name}</h3>
            </div>
            <div className="direct-header-icons">
              <i className="far fa-star star-icon"></i>|
              <span className="direct-header-user">
                <i className="far fa-user"></i>
                {memberCount}
              </span>
            </div>
          </div>
          <div className="direct-header-functions">
            <i
              className="fas fa-cog"
              tabIndex="0"
              onFocus={this.showMenu}
              onBlur={this.hideMenu}
            ></i>
            <div
              className={`direct-header-popup ${this.state.cogPopUpVisibility}`}
            >
              <li>
                <button
                  onClick={directMemberToggleFunction}
                  className="directMemberToggleFunction"
                >
                  <span className="direct-name-long">
                    {directMemberToggleText}
                    {privacyIcon}
                    {direct.name}
                  </span>
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

export default Direct;
