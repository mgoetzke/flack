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
    this.props.createChannel(this.state);
    this.setState({ name: "", topic: "", invites: [], private: false });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  togglePrivate() {
    let oppState = this.state.private === false ? true : false;
    this.setState({ private: oppState });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button
            onClick={this.props.closeModal}
            className="channel-button.esc"
          >
            X
          </button>
          <h2>Create a channel</h2>
          <p>
            Channels are where your members communicate. They're best when
            organized aroudn a topic - #flackingoff, for example. Learn more
            about how to create and name channels for your team.
          </p>
          <label>Name</label>
          <input
            onChange={this.update("name")}
            type="text"
            placeholder="e.g., flackingoff"
          />
          <p>
            Names must be lowercase, without spaces or periods, and can't be
            longer than 80 characters.
          </p>
          <label>Description</label> <span>(optional)</span>
          <input onChange={this.update("description")} type="text" />
          <p>What's this channel about?</p>
          <label>Send invites to</label> <span>(optional)</span>
          <input type="text" placeholder="Search by name" />
          <p>Select up to 1000 people to add to this channel.</p>
          <input
            onClick={this.togglePrivate}
            type="checkbox"
            id="toggle"
            className="checkbox"
          />
          <label htmlFor="toggle" className="switch"></label>
          <p>
            When a channel is set to private it can only be viewed or joined by
            invitation.
          </p>
          <button
            onClick={this.props.closeModal}
            className="channel-button.cancel"
          >
            Cancel
          </button>
          <input
            className="channel-button.create"
            type="submit"
            value="Create"
          />
        </form>
      </div>
    );
  }
}

export default ChannelCreate;
