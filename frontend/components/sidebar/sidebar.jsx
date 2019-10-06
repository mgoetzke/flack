import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="sidebar">
        HAI IM THE SIDEBAR
        <br />
        <Link to="/workspace/channels/1">Click for test channel</Link>
      </div>
    );
  }
}

export default Sidebar;
