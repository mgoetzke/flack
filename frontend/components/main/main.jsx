import React from "react";
import SidebarContainer from "../sidebar/sidebar_container";
import ChannelContainer from "../channel/channel_container";
import { Route, Switch } from "react-router-dom";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="main-container">
        <div>
          <SidebarContainer />
        </div>
        <div>
          <Switch>
            <Route
              path="/workspace/channels/:channelId"
              component={ChannelContainer}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Main;
