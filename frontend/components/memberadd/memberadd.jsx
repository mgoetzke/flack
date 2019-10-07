import React from "react";
import { Link } from "react-router-dom";

class MemberAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
    this.createOtherMembership = this.createOtherMembership.bind(this);
  }
  handleSubmit(e) {}

  componentDidMount() {}

  componentDidUpdate() {}

  handleMembership() {
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
      return <li key={user.id}>{user.display_name}</li>;
    });
    return (
      <div>
        <button onClick={this.props.closeModal} className="channel-create-esc">
          esc
        </button>
        <h1>Add people to NAME OF CHANNEL HARD CODE</h1>
        <p>Need to add someone who's not yet in this workspace?</p>
        <input type="text" placeholder="Search by name" />
        <ul>{userItems}</ul>
      </div>
    );
  }
}

export default MemberAdd;
