import React from 'react';
import { Link } from 'react-router-dom';

class Greeting extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.clearSessionErrors = this.clearSessionErrors.bind(this);
  }

  handleLogout() {
    this.props.logout(this.props.currentUser);
  }

  handleMenu(){
    const popup = document.getElementById("menuPopup");
    popup.classList.toggle("show");
  }

  clearSessionErrors(){
    this.props.clearSessionErrors();
  }

  render() {
    const onRoot = this.props.location.pathname === "/";
    const buttonPath = (this.props.location.pathname === "/signup") ? "/login" : "/signup"
    const buttonText = (this.props.location.pathname === "/signup") ? "Sign in" : "Sign up"
    const buttonStyle = (this.props.location.pathname === "/") ? "greeting-button" : "greeting-nav-button"


    if (this.props.currentUser) {
      let name = this.props.currentUser.display_name;
      return (
        <div className="greeting-loggedIn" onClick={this.handleMenu}>

          <h2>Flack<span> v </span></h2>
          <span>{name}</span>
          <div className="greeting-nav-popup" id="menuPopup">
            <p>{name}</p>
            <button onClick={this.handleLogout}> Log Out </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="greeting">
          <div className="greeting-nav">
            <Link to="/"><img src={window.logoURL} /></Link>
          </div>
          <div className="greeting-right"> 
            {onRoot &&
              <Link className="greeting-link" to="/">Sign in</Link>
            }
            <Link onClick={this.clearSessionErrors} className={buttonStyle} to={buttonPath}>{buttonText}</Link>
          </div>
        </div>
      );
    }
  }
}

export default Greeting;