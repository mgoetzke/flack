import React from "react";

class DirectCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      name: "",
      searchInput: "",
      invitedUsers: [],
      invitedUsersIds: [],
      users: props.users,
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let { currentUser } = this.props;
    this.props
      .createDirect(this.state)
      .then(({ direct }) => {
        let memberable_id = direct.id;
        let user_id = currentUser;
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

    this.setState({ name: "", invites: [], });
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
      invitedUsersIds: this.state.invitedUsersIds.concat(user.id)
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

  handleChecked() {
    let oppState = this.state.privacyButton === "" ? "privateOn" : "";
    this.setState({ private: !this.state.private });
    this.setState({ privacyButton: oppState });
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
    let privateStatus = this.state.private === false ? true : false;
    let headText = Direct Messages;
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
        <div className="modal-channel-create">
          <form onSubmit={this.handleSubmit} className="modal-body">
            <div className="modal-body-create">
              <div className="channel-create-header">
                <h1>{headText}</h1>
              </div>
              <div className="channel-create.name">
                <h3>Name</h3>
                {this.props.errors.length > 0 && (
                  <div className="channel-errors">
                    <ul>{this.renderErrors()}</ul>
                  </div>
                )}
                <div className="channel-create-name-input">
                  <span className="channel-create-privacy-icon">
                    {privacyIcon}
                  </span>
                  <input
                    id="channel-create-name-input-text"
                    onChange={this.update("name")}
                    type="text"
                    placeholder="e.g. flackingoff"
                    pattern="[a-zA-Z0-9-!@#$%^*_|]{1,80}"
                  />
                  <span>{80 - this.state.name.length}</span>
                </div>
              </div>
              <div className="modal-input-block">
                <div className="modal-label-title">
                  <h3>Description </h3> <span> (optional)</span>
                </div>
                <input onChange={this.update("description")} type="text" />
                <p>What's this channel about?</p>
              </div>
              <div className="modal-input-block">
                <div className="modal-label-title">
                  <h3>Send invites to </h3> <span> (optional)</span>
                </div>
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
                </span>
                {remainingInvites.length > 0 &&
                  this.state.searchInput.length > 0 && (
                    <ul className="search-uninvited">{notInvitedUsers}</ul>
                  )}
              </div>
              <div className="modal-input-private">
                <div className="modal-input-block private-text">
                  <div className="modal-label-title">
                    <h3>Make private</h3>
                  </div>
                  <p>{privateText}</p>
                </div>
                <div className={`privacyCheckbox ${this.state.privacyButton}`}>
                  <input
                    type="checkbox"
                    id="privacyCheckboxInput"
                    onChange={this.handleChecked}
                  />
                  <label htmlFor="privacyCheckboxInput"></label>
                </div>
              </div>
              <div className="modal-create-buttons">
                <button
                  onClick={this.props.closeModal}
                  className="modal-button modal-button-cancel"
                >
                  Cancel
                </button>
                {this.state.name !== "" && (
                  <input
                    className="modal-button modal-button-submit"
                    type="submit"
                    value="Create"
                  />
                )}
                {this.state.name === "" && (
                  <span className="modal-button modal-button-invalid">
                    <p>Create</p>
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default DirectCreate;
