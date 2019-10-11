import React from "react";

class DirectCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      searchInput: "",
      invitedUsers: [],
      invitedUsersIds: [],
      users: props.users
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let { currentUserId } = this.props;
    this.props
      .createDirect(this.state)
      .then(({ direct }) => {
        let memberable_id = direct.id;
        let user_id = currentUserId;
        let memberable_type = "Direct";
        let newMembership = { memberable_id, user_id, memberable_type };
        this.props.createMembership(newMembership);
        this.handleInvites(
          this.state.invitedUsersIds,
          memberable_type,
          memberable_id
        );
        return memberable_id;
      })
      .then(memberable_id => {
        this.props.history.push(`/workspace/directs/${memberable_id}`);
      })
      .then(this.props.closeModal);

    this.setState({ name: "", invites: [] });
  }

  handleInvites(userIds, memberable_type, memberable_id) {
    userIds.forEach(user_id => {
      let newMembership = { memberable_id, user_id, memberable_type };
      this.props.createMembership(newMembership);
    });
  }

  addUser(user) {
    this.setState({ invitedUsers: this.state.invitedUsers.concat(user) });
    this.setState({
      invitedUsersIds: this.state.invitedUsersIds.concat(user.id),
      searchInput: ""
    });
  }
  removeUser(user) {
    let userIndex = this.state.invitedUsers.indexOf(user);
    this.state.invitedUsers.splice(userIndex, 1);
    this.state.invitedUsersIds.splice(userIndex, 1);
    this.setState({ invitedUsers: this.state.invitedUsers });
    this.setState({ invitedUsersIds: this.state.invitedUsersIds });
  }
  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  renderErrors() {
    const errors = this.props.errors.map((error, i) => {
      return <li key={`errors-${i}`}> {error} </li>;
    });
    return (
      <div>
        <ul>{errors}</ul>
      </div>
    );
  }

  render() {
    let headText = "Direct Messages";
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
        this.props.currentUserId === user.id
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
            <h1>Direct Messages</h1>

            <span className="modal-search">
              <div className="modal-search-box">
                <ul className="search-invited">{invitedUsers}</ul>
                <input
                  ref={input => {
                    this.nameInput = input;
                  }}
                  value={this.state.searchInput}
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
                Go
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

export default DirectCreate;
