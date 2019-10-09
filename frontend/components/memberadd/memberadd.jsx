import React from "react";
import { Link } from "react-router-dom";

class MemberAdd extends React.Component {
  constructor(props) {
    super(props);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      newMembers: []
    };
    this.createOtherMembership = this.createOtherMembership.bind(this);
    this.handleMemberships = this.handleMemberships.bind(this);
  }
  componentDidMount() {
    this.nameInput.focus();
  }

  componentDidUpdate() {}

  toggleAdded(e) {
    // this.setState({ newMembers: e.target });
  }
  handleMemberships(e) {
    this.props.createMembership();
  }
  createOtherMembership(userId) {
    let user_id = this.props.currentUser.id;
    let memberable_id = parseInt(this.props.memberable_id);
    let memberable_type = this.props.memberable_type;
    this.props.createMembership({ memberable_id, user_id, memberable_type });
  }

  render() {
    let allUsers = this.props.users;
    let userItems = allUsers.map(user => {
      let image_location = user.image_url.split(".")[0];
      return (
        <li onClick={this.toggleAdded} key={user.id}>
          <img className="message-avatar" src={window[image_location]} />
          {user.display_name}
        </li>
      );
    });
    return (
      <>
        <div className="modal-header">
          <button onClick={this.props.closeModal} className="modal-esc">
            <i class="fas fa-times"></i>
            <span>esc</span>
          </button>
        </div>
        <div className="modal-member">
          <div className="modal-body">
            <h1>Add people to NAME OF CHANNEL HARD CODE</h1>
            <p>Need to add someone who's not yet in this workspace?</p>
            <span className="modal-search">
              <input
                ref={input => {
                  this.nameInput = input;
                }}
                type="text"
                placeholder="Search by name"
              />
              <button
                type="submit"
                onClick={this.handleMemberships}
                className="add-button modal-button-submit"
              >
                Add
              </button>
            </span>
            <ul>{userItems}</ul>
          </div>
        </div>
      </>
    );
  }
}

export default MemberAdd;
