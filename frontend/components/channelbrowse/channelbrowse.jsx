import React from "react";
import { Link } from "react-router-dom";

class ChannelBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      channels: props.channels
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(this.props.closeModal);
    this.setState({ name: "", topic: "", invites: [], private: false });
  }

  componentDidMount() {
    this.props.fetchAllChannels();
  }

  componentDidUpdate() {}

  render() {
    let allChannels = this.props.channels;
    let channels = allChannels.map(channel => {
      return (
        <Link
          onClick={this.props.closeModal}
          to={`/workspace/channels/${channel.id}`}
        >
          {channel.name}
        </Link>
      );
    });
    return (
      <div>
        <button onClick={this.props.closeModal} className="channel-create-esc">
          esc
        </button>
        <h1>Browse Channels</h1>
        <ul>{channels}</ul>
      </div>
    );
  }
}

export default ChannelBrowse;
