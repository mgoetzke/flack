import React from "react";
import { Link } from "react-router-dom";

class ChannelBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: props.channels,
      searchInput: ""
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }
  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
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
      if (
        channelName.toLowerCase().includes(this.state.searchInput) &&
        channel.private === false
      ) {
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
                <span className="modal-search-result-topic">
                  {channelTopic}
                </span>
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
      }
    });
    return (
      <>
        <div className="modal-header">
          <button onClick={this.props.closeModal} className="modal-esc">
            <i className="fas fa-times"></i>
            <span>esc</span>
          </button>
        </div>
        <div className="modal-body">
          <span className="modal-browse-header">
            <h1>Browse Channels</h1>
            {this.props.openCreateChannel}
          </span>
          <span className="modal-search">
            <img src={window.searchIcon} />
            <input
              ref={input => {
                this.nameInput = input;
              }}
              type="text"
              placeholder="Search channels"
              onChange={this.updateField("searchInput")}
            />
          </span>
          <span className="modal-search-list">
            <p>Channels you can join</p>
            <ul className="modal-search-channels">{channels}</ul>
          </span>
        </div>
      </>
    );
  }
}

export default ChannelBrowse;
