import React from "react";
import { Link } from "react-router-dom";

class MemberAdd extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      invitedUsers: [],
      invitedUsersIds: [],
      users: props.users,
      searchInput: ""
    };
    this.handleInvites = this.handleInvites.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleMemberships = this.handleMemberships.bind(this);
  }
  componentDidMount() {
    this.nameInput.focus();
  }

  componentDidUpdate() {}

  handleMemberships() {
    let memberable_id = this.props.memberable_id;
    let memberable_type = "Channel";
    this.handleInvites(
      this.state.invitedUsersIds,
      memberable_type,
      memberable_id
    );
    this.props.closeModal();
  }
  handleInvites(userIds, memberable_type, memberable_id) {
    userIds.forEach(user_id => {
      let newMembership = { memberable_id, user_id, memberable_type };
      this.props.createMembership(newMembership);
    });
    return 4;
  }
  addUser(user) {
    this.setState({ invitedUsers: this.state.invitedUsers.concat(user) });
    this.setState({
      invitedUsersIds: this.state.invitedUsersIds.concat(user.id)
    });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  removeUser(user) {
    let userIndex = this.state.invitedUsers.indexOf(user);
    this.state.invitedUsers.splice(userIndex, 1);
    this.state.invitedUsersIds.splice(userIndex, 1);
    this.setState({ invitedUsers: this.state.invitedUsers });
    this.setState({ invitedUsersIds: this.state.invitedUsersIds });
  }

  render() {
    let invitedUsers = this.state.invitedUsers.map(user => {
      let image_location = user.image_url.split(".")[0];
      return (
        <li
          className="invited-user-item"
          onClick={() => this.removeUser(user)}
          key={user.id}
        >
          <img className="message-avatar" src={window[image_location]} />
          {user.display_name}
        </li>
      );
    });
    let notInvitedUsers = this.state.users.map(user => {
      let image_location = user.image_url.split(".")[0];
      if (
        this.state.invitedUsersIds.includes(user.id) ||
        this.props.currentUserId === user.id ||
        this.props.memberableUsers.includes(user.id)
      ) {
        return null;
      } else if (
        user.display_name
          .toLowerCase()
          .includes(this.state.searchInput.toLowerCase())
      ) {
        return (
          <li
            className="uninvited-user-item"
            onClick={() => this.addUser(user)}
            key={user.id}
          >
            <img className="message-avatar" src={window[image_location]} />
            {user.display_name}
          </li>
        );
      }
    });

    //bad code rewrite
    let channelName = this.props.channels.filter(
      channel => channel.id === parseInt(this.props.memberable_id)
    )[0].name;
    let remainingInvites = notInvitedUsers.filter(user => {
      return user !== null;
    });
    return (
      <>
        <div className="modal-header">
          <button onClick={this.props.closeModal} className="modal-esc">
            <i className="fas fa-times"></i>
            <span>esc</span>
          </button>
        </div>
        <div className="modal-member">
          <div className="modal-body">
            <h1>Add people to {channelName}</h1>
            <p>Need to add someone who's not yet in this workspace?</p>

            <span className="modal-search">
              <div className="modal-search-box">
                <ul className="search-invited">{invitedUsers}</ul>
                <input
                  ref={input => {
                    this.nameInput = input;
                  }}
                  type="text"
                  placeholder="Search by name"
                  onChange={this.update("searchInput")}
                />
              </div>

              <button
                type="submit"
                onClick={this.handleMemberships}
                className="add-button modal-button-submit"
              >
                Add
              </button>
            </span>
            {remainingInvites.length > 0 &&
              this.state.searchInput.length > 0 && (
                <ul className="search-uninvited">{notInvitedUsers}</ul>
              )}
          </div>
        </div>
      </>
    );
  }
}

export default MemberAdd;
