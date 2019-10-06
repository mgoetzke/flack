import React from "react";

class ChannelCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.togglePrivate = this.togglePrivate.bind(this);
    this.state = {
      name: "",
      topic: "",
      invites: [],
      private: false
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannel(this.state).then(this.props.closeModal);
    this.setState({ name: "", topic: "", invites: [], private: false });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  togglePrivate() {
    let oppState = this.state.private === false ? true : false;
    this.setState({ private: oppState });
  }

  renderErrors() {
    const errors = this.props.errors.map((error, i) => {
      return <li key={`errors-${i}`}> {error} </li>;
    });
    return (
      <div>
        <ul>{errors}</ul>
      </div>
    );
  }

  render() {
    let privateStatus = this.state.private === false ? "public" : "private";
    let headText = privateStatus
      ? "Create a channel"
      : "Create a private channel";
    let privateText = privateStatus
      ? "When a channel is set to private, it can only be viewed or joined by invitation."
      : "This can't be undone. A private channel cannot be made public later on.";
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="channel-create">
          <button
            onClick={this.props.closeModal}
            className="channel-create-esc"
          >
            esc
          </button>
          <div className="channel-create-contents">
            <div className="channel-create-header">
              <h1>{headText}</h1>
              <p>
                Channels are where your members communicate. They're best when
                organized around a topic - #flackingoff, for example. Learn more
                about how to create and name channels for your team.
              </p>
            </div>
            <div className="channel-create.name">
              <h3>Name</h3>
              {this.props.errors.length > 0 && (
                <div className="channel-errors">
                  <ul>{this.renderErrors()}</ul>
                </div>
              )}
              <input
                onChange={this.update("name")}
                type="text"
                placeholder="e.g., flackingoff"
              />
              <p>
                Names must be lowercase, without spaces or periods, and can't be
                longer than 80 characters.
              </p>
            </div>
            <div className="channel-create.description">
              <h3>Description</h3> <span>(optional)</span>
              <input onChange={this.update("description")} type="text" />
              <p>What's this channel about?</p>
            </div>
            <div className="channel-create.invites">
              <h3>Send invites to</h3> <span>(optional)</span>
              <input type="text" placeholder="Search by name" />
              <p>Select up to 1000 people to add to this channel.</p>
            </div>
            <div className="channel-create.private">
              <div className="channel-create.private-text">
                <h3>Make private</h3>
                <p>{privateText}</p>
              </div>
              <input
                onClick={this.togglePrivate}
                type="checkbox"
                id="toggle"
                className="checkbox"
              />
              <label htmlFor="toggle" className="switch"></label>
            </div>
            <div className="channel-create.buttons">
              <button
                onClick={this.props.closeModal}
                className="channel-button.cancel"
              >
                Cancel
              </button>
              {this.state.name !== "" && (
                <input
                  className="channel-button.create"
                  type="submit"
                  value="Create"
                />
              )}
              {this.state.name === "" && (
                <div className="channel-button-createblank">Create</div>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ChannelCreate;
