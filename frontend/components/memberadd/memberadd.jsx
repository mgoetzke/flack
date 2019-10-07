import React from "react";
import { Link } from "react-router-dom";

class MemberAdd extends React.Component {
  constructor(props) {
    super(props);
    debugger;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }
  handleSubmit(e) {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <button onClick={this.props.closeModal} className="channel-create-esc">
          esc
        </button>
        <h1>Add people to NAME OF CHANNEL HARD CODE</h1>
        <p>Need to add someone who's not yet in this workspace?</p>
        <input type="text" placeholder="Search by name" />
        <button>Add</button>
      </div>
    );
  }
}

export default MemberAdd;
