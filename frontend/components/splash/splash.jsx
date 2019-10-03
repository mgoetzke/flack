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
          }}>TRY FLACK</Link>
        </div>
        <span>Already using Flack? <Link className="splash-link" to="/login">Sign in</Link>.</span>
        <img className="normie" id="asana" src={window.asana_iconURL} />
        <img className="reversereverse" id="atlassian" src={window.atlassian_iconURL} />
        <img className="reversereverse" id="dropbox" src={window.dropbox_iconURL} />
        <img className="reversereverse" id="google" src={window.google_iconURL} />
        <img className="normie" id="hubspot" src={window.hubspot_iconURL} />
        <img className="reversereverse" id="zendesk" src={window.zendesk_iconURL} />
        <img className="normie" id="zoom" src={window.zoom_iconURL} />
        <div className="splash-marketing">
          <div className="splash-marketing-highlights">
            <h2>Put collaboration at your fingertips</h2>
            <img src={window.highlightsURL} />
          </div>
          <div className="splash-marketing-enterprise">
            <div className="splash-marketing-enterprise-text">
              <h2>Efficient teamwork for <br></br>every enterprise</h2>
              <div>Big companies save time with Flack by securely 
                collaborating across teams, departments, offices and countries.</div>
              <br/>
              <Link className="splash-marketing-enterprise-link" to={"/signup"}>Flack trial &#8594;</Link>
            </div>
            <div>
              <img src={window.enterpriseURL} />
            </div>

          </div>
        </div>

      </div>

    );
  }

}

export default Splash;
