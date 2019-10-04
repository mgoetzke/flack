import React from 'react';
class Channel extends React.Component {
  constructor(props) {
    super(props);
    debugger
  }
  componentDidMount(){
    this.props.fetchChannel(this.props.match.params.channelId);
    this.props.fetchAllMessages(this.props.match.params.channelId);
  }
  render() {
    const { channel } = this.props;
    const messages = this.props.messages || [];
    return (
      <div>
        
        <h1>Channel name: {this.props.channel.name}</h1>
        <h1>Channel topic: {this.props.channel.topic}</h1>
        <h1>Messages</h1>
        {messages}
      </div>
    );
  }
}

export default Channel;