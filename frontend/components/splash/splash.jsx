import React from 'react';
import { Link } from 'react-router-dom';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: ""}
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  render(){
    return(
      <div className="splash"> 
        <div className="splash-header">
          <h1>Whatever work you do,</h1> 
          <h1>you can do it in Flack</h1>
        </div>
        <p>Flack gives your team the power and alignment you need to do your best work.</p>
        <div className="splash-form">
          <input type="text" placeholder="Your work email" onChange={this.update("email")}/>
          <Link className="splash-button" to={{
            pathname: '/signup',
            state: {email: this.state.email}
          }}>TRY FOR FREE</Link>
        </div>
        <span>Already using Flack? <Link className="splash-link" to="/login">Sign in</Link>.</span>
        <img class="normie" id="asana" src={window.asana_iconURL} />
        <img class="reversereverse" id="atlassian" src={window.atlassian_iconURL} />
        <img class="reversereverse" id="dropbox" src={window.dropbox_iconURL} />
        <img class="reversereverse" id="google" src={window.google_iconURL} />
        <img class="normie" id="hubspot" src={window.hubspot_iconURL} />
        <img class="reversereverse" id="zendesk" src={window.zendesk_iconURL} />
        <img class="normie" id="zoom" src={window.zoom_iconURL} />
      </div>
    );
  }

}

export default Splash;
