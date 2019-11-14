import React from "react";
import { Link } from "react-router-dom";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberships: props.memberships,
      users: props.users,
      channels: props.channels,
      directs: props.directs,
      selectedItem: null,
      selectedMessageableId: null,
      selectedMessageableType: null
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleLocationClass = this.handleLocationClass.bind(this);
    this.handleUserStatus = this.handleUserStatus.bind(this);
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

  handleUserStatus(directId){
    let direct = this.props.directs.find(direct => direct.id === directId);
    let otherUserId = direct.user_ids.find(id => id !== this.props.currentUserId);
    let otherUserStatus = false;
    if(this.props.users){
      otherUserStatus = this.props.users.find(user => user.id === otherUserId).online;
    }
    return otherUserStatus === true ? <span className="sidebar-member-online"></span> : <span className="sidebar-member-offline"></span>;
  }
  render() {
    let channelMembershipItems = [];
    let directMembershipItems = [];
    let membershipItems = this.props.memberships.forEach(membership => {
      let privacyIcon =
        membership.privacy === false ? "# " : <i className="fas fa-lock"></i>;
      let countIcon = (membership.size === 1 && membership.memberable_type === "Direct") ? this.handleUserStatus(membership.memberable_id) : <span className="sidebar-member-count"> {membership.size}</span>;
      
      let membershipName = membership.name;
      let selectedItem = this.handleLocationClass(membership);
      if (membership.memberable_type === "Channel") {
        if (!membershipName){
          let newChannel = this.props.channels.find(channel => { return channel.id === membership.memberable_id });
          if (newChannel){
            privacyIcon = newChannel.private === false ? "# " : <i className="fas fa-lock"></i>;
            membershipName = newChannel.name;
          }
        }
        channelMembershipItems.push(
          <li
            key={membership.id}
            className={selectedItem}
            onClick={this.handleSelect.bind(null, membership.id)}
          >
            {privacyIcon}
            <Link to={`/workspace/channels/${membership.memberable_id}`}>
              {membershipName}
            </Link>
          </li>
        );
      } else {
        countIcon = countIcon;
        membershipName = membershipName;
        if (!membershipName){
          let newDirect = this.props.directs.find(direct => { return direct.id === membership.memberable_id});
          if (newDirect){
            let membershipSize = newDirect.user_ids.length - 1;
            countIcon = (membershipSize === 1) ? this.handleUserStatus(newDirect.id) : <span className="sidebar-member-count"> {membershipSize}</span>;;
            membershipName = newDirect.name;
          }
        }
        directMembershipItems.push(
          <li
            key={membership.id}
            className={selectedItem}
            onClick={this.handleSelect.bind(null, membership.id)}
          >
            {/* <span className="sidebar-member-count"> {countIcon}</span> */}
            {countIcon}
            <Link to={`/workspace/directs/${membership.memberable_id}`}>
              {membershipName}
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
