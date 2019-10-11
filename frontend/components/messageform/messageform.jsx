import React from "react";

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      body: "",
      currentUser: props.currentUser
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }
  componentDidUpdate() {
    // this.setState({ messageable_id: 2})
  }

  handleSubmit(e) {
    e.preventDefault();
    App.channel.speak({ message: this.state });
    this.setState({
      body: ""
    });
  }

  render() {
    let msgbleNameRendered = this.props.location.pathname.includes("channels")
      ? "Message #" + this.props.channel.name
      : "Message #";
    return (
      <form className="message-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.body}
          onChange={this.update("body")}
          placeholder={msgbleNameRendered}
        />
      </form>
    );
  }
}

export default MessageForm;
