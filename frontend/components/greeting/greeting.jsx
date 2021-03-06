import React from "react";
import { Link } from "react-router-dom";

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = { popUpVisibility: "menu-hide" };
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }
  componentDidUpdate() {
    if (!this.props.currentUser && !this.state.popUpVisibility) {
      this.setState({ popUpVisibility: "menu-hide" });
    }
  }

  handleLogout() {
    this.props.logout(this.props.currentUser);
  }

  showMenu(e) {
    if (this.state) {
      this.setState({ popUpVisibility: "" });
    }
  }
  hideMenu(e) {
    if (!e.relatedTarget) {
      this.setState({ popUpVisibility: "menu-hide" });
    } else if (e.relatedTarget.className === "log-out-button") {
      this.handleLogout();
    } else {
    }
  }

  clearSessionErrors() {
    this.props.clearSessionErrors();
  }

  render() {
    const onRoot = this.props.location.pathname === "/";
    const buttonPath =
      this.props.location.pathname === "/signup" ? "/login" : "/signup";
    const buttonText =
      this.props.location.pathname === "/signup" ? "SIGN IN" : "GET STARTED";
    const buttonStyle =
      this.props.location.pathname === "/"
        ? "greeting-button"
        : "greeting-nav-button";

    if (this.props.currentUser && !onRoot) {
      let name = this.props.currentUser.display_name;
      let image_location = this.props.currentUser.image_url.split(".")[0];

      return (
        <div id="grabber">
          <div
            className="greeting-loggedIn"
            tabIndex="0"
            onClick={this.showMenu}
            onBlur={this.hideMenu}
          >
            <h2>
              Flack
              <span>
                {" "}
                <i className="fas fa-angle-down"></i>{" "}
              </span>
            </h2>
            <div className="greeting-self-info">
              <span className="greeting-self-online"></span>
              <span className="greeting-self-name">{name}</span>
            </div>
            <div
              className={`greeting-nav-popup ${this.state.popUpVisibility}`}
              id="menuPopup"
            >
              <div className="greeting-nav-name"> <img className="message-avatar" src={window[image_location]} /> {name}</div>
              <button className="log-out-button" onClick={this.handleLogout}>
                <p>Sign out of Flack</p>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="greeting">
          <div className="greeting-nav">
            <Link to="/">
              <img src={window.logoURL} />
            </Link>
          </div>
          <div className="greeting-right">
            {onRoot && (
              <Link className="greeting-link" to="/login">
                Sign in
              </Link>
            )}
            <Link className={buttonStyle} to={buttonPath}>
              {buttonText}
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Greeting;
