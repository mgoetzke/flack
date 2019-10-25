import React from "react";
import { Link } from "react-router-dom";

class DirectCreate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      searchInput: "",
      invitedUsers: [],
      invitedUsersIds: [],
      users: props.users,
      directs: props.directs
    };
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.redirect = this.redirect.bind(this);
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
        // this.handleInvites(
        //   this.state.invitedUsersIds,
        //   memberable_type,
        //   memberable_id
        // );
        return memberable_id;
      })
      .then(memberable_id => {
        this.props.history.push(`/workspace/directs/${memberable_id}`);
      })
      .then(this.props.closeModal);

    this.setState({ name: "", invites: [] });
  }
  redirect(id) {
    this.props.history.push(`/workspace/directs/${id}`);
    this.props.closeModal();
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
    let directs = this.state.directs.map(direct => {
      let directName = direct.name;
      let directUsers = direct.user_ids;
      let allUsersIds = this.state.invitedUsersIds.slice(0);
      allUsersIds.push(this.props.currentUserId);
      if (directUsers.every(id => allUsersIds.includes(id))) {
        return null;
      }
      if (
        directName.toLowerCase().includes(this.state.searchInput.toLowerCase())
      ) {
        return (
          <li key={direct.id}>
            <Link
              onClick={this.props.closeModal}
              to={`/workspace/directs/${direct.id}`}
              className="modal-search-result"
            >
              <div className="modal-search-result-body">
                <span>{directName}</span>
              </div>
              <div className="modal-search-result-enter">
                <span>enter</span>
                <i className="fas fa-level-down-alt fa-rotate-90 fa-fw"></i>
              </div>
            </Link>
          </li>
        );
      }
    });

    let matchingDirect = this.state.directs.find(direct => {
      let directUsers = direct.user_ids;
      let allUsersIds = this.state.invitedUsersIds.slice(0);
      allUsersIds.push(this.props.currentUserId);
      return directUsers.every(id => allUsersIds.includes(id));
    });
    let clickEvent =
      matchingDirect == null
        ? this.handleSubmit
        : this.redirect.bind(null, matchingDirect.id);
    let submitButton =
      this.state.invitedUsersIds.length > 0 ? (
        <button
          type="submit"
          onClick={clickEvent}
          className="add-button modal-button-submit"
        >
          Go
        </button>
      ) : (
        <div className="add-button modal-button-invalid">Go</div>
      );
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
                  placeholder="Find or start a conversation"
                  onChange={this.update("searchInput")}
                />
              </div>
              {submitButton}
            </span>
            {remainingInvites.length > 0 &&
              this.state.searchInput.length > 0 && (
                <ul className="search-uninvited">{notInvitedUsers}</ul>
              )}
            <span className="modal-search-list">
              <p>Recent conversations</p>
              <ul className="modal-search-channels">{directs}</ul>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default DirectCreate;
