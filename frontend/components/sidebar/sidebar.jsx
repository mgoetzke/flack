import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllMemberships;
  }
  componentDidUpdate(prevProps) {
    this.props.fetchAllMemberships;
  }
  render() {
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
      </div>
    );
  }
}

export default Sidebar;
