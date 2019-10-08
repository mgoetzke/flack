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
      debugger;
      return (
        <li className="modal-search-result" key={channel.id}>
          <Link
            onClick={this.props.closeModal}
            to={`/workspace/channels/${channel.id}`}
          >
            {channel.name}
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
            <input type="text" placeholder="Search channels" />
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
