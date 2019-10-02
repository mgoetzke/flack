import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout(this.props.currentUser);
  }
  render() {
    const buttonPath = (this.props.location.pathname === "/signup") ? "/login" : "/signup"
    const buttonText = (this.props.location.pathname === "/signup") ? "Sign In" : "Sign Up"
    const buttonStyle = (this.props.location.pathname === "/") ? "greeting-button" : "greeting-nav-button"


    if (this.props.currentUser) {
      let name = this.props.currentUser.display_name;
      return (
        <div>
          <h1>{name}</h1>
          <button onClick={this.handleLogout}> Log Out </button>
        </div>
      );
    } else {
      return (
        <div className="greeting">
          <div className="greeting-nav">
            <img src={window.logoURL} />
          </div>
          <Link className={buttonStyle} to={buttonPath}>{buttonText}</Link>
        </div>
      );
    }
  }
}

export default Greeting;