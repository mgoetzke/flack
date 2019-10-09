import React from "react";

class ChannelCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.state = {
      name: "",
      topic: "",
      searchInput: "",
      invitedUsers: [],
      invitedUsersIds: [],
      private: false,
      users: props.users
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let { currentUser } = this.props;
    this.props
      .createChannel(this.state)
      .then(({ channel }) => {
        let memberable_id = channel.id;
        let user_id = currentUser;
        let memberable_type = "Channel";
        let newMembership = { memberable_id, user_id, memberable_type };
        this.props.createMembership(newMembership);
        this.handleInvites(this.state.invitedUsersIds, memberable_type, memberable_id);
        return memberable_id;
      })
      .then(memberable_id => {
        this.props.history.push(`/workspace/channels/${memberable_id}`);
      })
      .then(this.props.closeModal);

    this.setState({ name: "", topic: "", invites: [], private: false });
  }

  handleInvites(userIds, memberable_type, memberable_id){
    userIds.forEach((user_id) => {
      let newMembership = { memberable_id, user_id, memberable_type };
      this.props.createMembership(newMembership);

    });
  }

  addUser(user){
    this.setState({invitedUsers: this.state.invitedUsers.concat(user) });
    this.setState({ invitedUsersIds: this.state.invitedUsersIds.concat(user.id) });
  };
  removeUser(user){
    let userIndex = this.state.invitedUsers.indexOf(user);
    this.state.invitedUsers.splice(userIndex, 1)
    this.state.invitedUsersIds.splice(userIndex, 1)
    this.setState({ invitedUsers: this.state.invitedUsers });
    this.setState({ invitedUsersIds: this.state.invitedUsersIds });
  };
  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  togglePrivate() {
    return () => this.setState({ private: this.state.private === false });
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
    let headText = privateStatus
      ? "Create a channel"
      : "Create a private channel";
    let privateText = privateStatus
      ? "When a channel is set to private, it can only be viewed or joined by invitation."
      : "This can't be undone. A private channel cannot be made public later on.";
    let invitedUsers = this.state.invitedUsers.map((user)=> {
      let image_location = user.image_url.split(".")[0];
      return (<li onClick={() => this.removeUser(user)} key={user.id}>
        <img className="message-avatar" src={window[image_location]} />
        {user.display_name}
      </li>);
    });
    let notInvitedUsers = this.state.users.map((user) => {
      debugger
      let image_location = user.image_url.split(".")[0];
      if (this.state.invitedUsersIds.includes(user.id)){
        return "";
      } 
      else if (user.display_name.toLowerCase().includes(this.state.searchInput.toLowerCase())){
      return (<li onClick={() => this.addUser(user)} key={user.id}>
        <img className="message-avatar" src={window[image_location]} />
        {user.display_name}
      </li>)};
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
                <p>
                  Channels are where your members communicate. They're best when
                  organized around a topic - #flackingoff, for example.
                </p>
              </div>
              <div className="channel-create.name">
                <h3>Name</h3>
                {this.props.errors.length > 0 && (
                  <div className="channel-errors">
                    <ul>{this.renderErrors()}</ul>
                  </div>
                )}
                <input
                  onChange={this.update("name")}
                  type="text"
                  placeholder="e.g. flackingoff"
                  pattern="[a-zA-Z0-9-!@#$%^*_|]{1,80}"
                />
                <p>{80 - this.state.name.length}</p>
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
                <ul>
                  {invitedUsers}
                </ul>
                <input onChange={this.update("searchInput")}type="text" placeholder="Search by name" />
                <p>Select up to 1000 people to add to this channel.</p>
                <ul>
                  {notInvitedUsers}
                </ul>
              </div>
              <div className="modal-input-private">
                <div className="modal-input-block private-text">
                  <div className="modal-label-title">
                    <h3>Make private</h3>
                  </div>
                  <p>{privateText}</p>
                </div>
                <div className="container">
                  <label className="switch" htmlFor="checkbox">
                    <input
                      onClick={this.togglePrivate}
                      type="checkbox"
                      id="checkbox"
                    />
                    <div className="sliderRound"></div>
                  </label>
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

export default ChannelCreate;
