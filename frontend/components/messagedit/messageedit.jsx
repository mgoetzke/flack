import React from "react";

class MessageEdit extends React.Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = props.message;
  }
  render() {
    return (
      <div>
        <div>
          <p>{this.state.body}</p>
        </div>
      </div>
    );
  }
}

export default MessageEdit;
