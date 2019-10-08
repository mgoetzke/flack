import React from "react";
import SidebarContainer from "../sidebar/sidebar_container";
import ChannelContainer from "../channel/channel_container";
import { Route, Switch } from "react-router-dom";
import GreetingContainer from "../greeting/greeting_container";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  render() {
    return (
      <div className="main-container">
        <div>
          <GreetingContainer/>
          <SidebarContainer />
        </div>
        <Switch>
          <Route
            path="/workspace/channels/:channelId"
            component={ChannelContainer}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
