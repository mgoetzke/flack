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
    this.props.fetchAllMemberships;
  }
  componentDidUpdate(prevProps) {
    this.props.fetchAllMemberships;
  }
  render() {
    let membershipItems = this.props.memberships.map(membership => {
      return (
        <Link
          key={membership.id}
          to={`/workspace/channels/${membership.memberable_id}`}
        >
          {membership.name}
        </Link>
      );
    });
    return (
      <div className="sidebar">
        HAI IM THE SIDEBAR
        <br />
        Channels Create {this.props.openCreateChannel}
        <br />
        <br />
        Channels Browse {this.props.openBrowseChannel}
        <br />
        <Link to="/workspace/channels/1">Click for test channel</Link>
        <ul className="membership-items">{membershipItems}</ul>
      </div>
    );
  }
}

export default Sidebar;
