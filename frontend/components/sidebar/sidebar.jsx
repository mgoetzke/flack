import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: props.memberships
    };
  }

  componentDidMount() {
    this.props.fetchAllMemberships,
      this.props.fetchAllUsers,
      this.props.fetchAllChannels;
  }
  componentDidUpdate(prevProps) {
    this.props.fetchAllMemberships,
      this.props.fetchAllUsers,
      this.props.fetchAllChannels;
  }
  render() {
    //HARD CODED THE ICONS
    let membershipItems = this.props.memberships.map(membership => {
      let privacyIcon =
        membership.memberable_type === "Channel" ? (
          "# "
        ) : (
          <i className="fas fa-lock"></i>
        );
      return (
        <li key={membership.id}>
          {privacyIcon}
          <Link to={`/workspace/channels/${membership.memberable_id}`}>
            {membership.name}
          </Link>
        </li>
      );
    });
    return (
      <div className="sidebar">
        <div className="sidebar-channels">
          <div className="sidebar-header">
            <h2>{this.props.openBrowseChannel}</h2>
            {this.props.openCreateChannel}
          </div>
          <ul className="membership-items">{membershipItems}</ul>
        </div>
        <div className="sidebar-directs">
          <div className="sidebar-header">
            <h2>Direct Messages</h2>
            {this.props.openCreateChannel}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
