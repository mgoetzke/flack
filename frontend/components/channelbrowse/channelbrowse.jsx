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
    this.nameInput.focus();
  }

  componentDidUpdate() {}

  render() {
    let allChannels = this.props.channels;
    let channels = allChannels.map(channel => {
      let channelName = channel.name;
      let privacyIcon =
        channel.private === false ? "#" : <i className="fas fa-lock"></i>;
      let channelTopic = channel.topic;
      let channelCreator = channel.admin;
      let channelCreation = new Date(channel.created_at);
      var options = { year: "numeric", month: "long", day: "numeric" };
      let formatCreation = channelCreation.toLocaleDateString([], options);

      return (
        <li key={channel.id}>
          <Link
            onClick={this.props.closeModal}
            to={`/workspace/channels/${channel.id}`}
            className="modal-search-result"
          >
            <div className="modal-search-result-body">
              <span className="modal-search-result-title">
                {privacyIcon}
                {channelName}
              </span>
              <span className="modal-search-result-topic">{channelTopic}</span>
              <span className="modal-search-result-creation">
                Created by {channelCreator} on {formatCreation}
              </span>
            </div>
            <div className="modal-search-result-preview">
              <i className="fas fa-level-down-alt fa-rotate-90 fa-fw"></i>
              <span>preview</span>
            </div>
          </Link>
        </li>
      );
    });
    return (
      <>
        <div className="modal-header">
          <button onClick={this.props.closeModal} className="modal-esc">
            <i class="fas fa-times"></i>
            <span>esc</span>
          </button>
        </div>
        <div className="modal-body">
          <h1>Browse Channels</h1>
          <span className="modal-search">
            <img src={window.searchIcon} />
            <input
              ref={input => {
                this.nameInput = input;
              }}
              type="text"
              placeholder="Search channels"
            />
          </span>
          <span className="modal-search-list">
            <p>Channels you can join</p>
            <ul>{channels}</ul>
          </span>
        </div>
      </>
    );
  }
}

export default ChannelBrowse;
