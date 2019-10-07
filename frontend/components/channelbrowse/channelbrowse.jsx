import React from "react";

class ChannelBrowse extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(this.props.closeModal);
    this.setState({ name: "", topic: "", invites: [], private: false });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.closeModal} className="channel-create-esc">
          esc
        </button>
        <h1>Browse Channels</h1>
      </div>
    );
  }
}

export default ChannelBrowse;
