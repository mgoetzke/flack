import React from "react";
import SidebarContainer from "../sidebar/sidebar_container";
import ChannelContainer from "../channel/channel_container";
import DirectContainer from "../direct/direct_container";
import { Route, Switch } from "react-router-dom";
import GreetingContainer from "../greeting/greeting_container";
import { PrivacyRoute } from "../../util/route_util";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllUsers().then(
      () =>
      {this.props.fetchAllChannels();
      this.props.fetchAllDirects();
      this.props.fetchMemberships();
      this.props.fetchAllMessages();}
    )

    App.NotificationsChannel = App.cable.subscriptions.create(
      { channel: "NotificationsChannel", currentUserId: this.props.currentUserId},
      {
        received: data => {
          switch (data.type) {
            case "membershipAdd":
              this.props
                .receiveMembership(data.membership);
              break;
            case "directAdd":
              this.props
                .fetchDirect(data.directId);
              break; 
            case "channelAdd":
              this.props
                .fetchChannel(data.channelId);
              break;
            case "userAdd":
              this.props
                .fetchUser(data.userId);
              break;
          }
        }
      }
    );
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    App.NotificationsChannel.unsubscribe();
  }

  render() {
    return (
      <div className="main-container">
        <div>
          <GreetingContainer />
          <SidebarContainer />
        </div>
        <Switch>
          <Route
            path="/workspace/channels/:channelId"
            component={ChannelContainer}
          />
          <Route
            path="/workspace/directs/:directId"
            component={DirectContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
