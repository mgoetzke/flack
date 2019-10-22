import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: props.memberships,
      users: props.users,
      channels: props.users,
      selectedItem: null,
      selectedMessageableId: null,
      selectedMessageableType: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLocationClass = this.handleLocationClass.bind(this);
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {}
  handleSelect(id) {
    this.setState({ selectedItem: id });
  }
  handleLocationClass(membership) {
    let channelId = parseInt(this.props.location.pathname.split("/")[3]);
    let channelType = this.props.location.pathname.split("/")[2];
    return channelId === membership.memberable_id &&
      channelType[0].toUpperCase() ===
        membership.memberable_type[0].toUpperCase()
      ? "selected"
      : "unselected";
  }
  render() {
    let channelMembershipItems = [];
    let directMembershipItems = [];
    let membershipItems = this.props.memberships.forEach(membership => {
      let privacyIcon =
        membership.privacy === false ? "# " : <i className="fas fa-lock"></i>;
      let selectedItem = this.handleLocationClass(membership);
      if (membership.memberable_type === "Channel") {
        channelMembershipItems.push(
          <li
            key={membership.id}
            className={selectedItem}
            onClick={this.handleSelect.bind(null, membership.id)}
          >
            {privacyIcon}
            <Link to={`/workspace/channels/${membership.memberable_id}`}>
              {membership.name}
            </Link>
          </li>
        );
      } else {
        directMembershipItems.push(
          <li
            key={membership.id}
            className={selectedItem}
            onClick={this.handleSelect.bind(null, membership.id)}
          >
            {privacyIcon}
            <Link to={`/workspace/directs/${membership.memberable_id}`}>
              {membership.name}
            </Link>
          </li>
        );
      }
    });
    return (
      <div className="sidebar">
        <div className="sidebar-channels">
          <div className="sidebar-header">
            <h2>{this.props.openBrowseChannel}</h2>
            {this.props.openCreateChannel}
          </div>
          <ul className="membership-items">{channelMembershipItems}</ul>
        </div>
        <div className="sidebar-directs">
          <div className="sidebar-header">
            <h2>Direct Messages</h2>
            {this.props.openCreateDirect}
          </div>
          <ul className="membership-items">{directMembershipItems}</ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
