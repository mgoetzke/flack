import React from 'react';
import SidebarContainer from '../sidebar/sidebar_container';
import ChannelContainer from '../channel/channel_container';
class Main extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <SidebarContainer />
        <ChannelContainer />
      </div>
    );
  }
}

export default Main;