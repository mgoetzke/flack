import React from 'react';
import { Link } from 'react-router-dom';
class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      display_name: "",
      email: ""

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault;
    this.props.processForm(this.state);
  }

  handleDemo(){
    this.props.processForm(this.props.demoUser);
  }

  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
  }

  componentWillUnmount(){
    this.props.clearSessionErrors();
  }

  renderErrors() {
    const errors = this.props.errors.map((error, i) => {
     return <li key={`errors-${i}`}> {error} </li>
    });
    return(
      <div>
        <ul>
          {errors}
        </ul> 
      </div>
    );
  }

  render() {
    const directionBig = (this.props.formType === "Sign up") ? "Sign up for Flack" : "Sign in to Flack";
    const directionSmallUp = <p>Enter your <span>email address</span>, <span>password</span>, and <span>display name</span>.</p>
    const directionSmallIn = <p>Enter your <span>email address</span> and <span>password</span></p>;
    const directionSmall = (this.props.formType === "Sign up") ? directionSmallUp : directionSmallIn;
    const passedEmail = (this.props.location.state !== undefined && 'email' in this.props.location.state) ? this.props.location.state.email : "";
    return ( 
      
      <div className="session-wrapper">
        {this.props.errors.length > 0 &&
          <div className="session-errors">
            <img src={window.warningURL} />
            <ul>
              {this.renderErrors()}
            </ul>
          </div>
        }

        <div className="session-form">
          <form className="session-form-form" onSubmit={this.handleSubmit}>
            <h1>{directionBig}</h1>
            <h2>{directionSmall}</h2>
            <input type="text" onChange={this.update("email")} placeholder="you@example.com" defaultValue={ passedEmail }/>

            <input type="password" onChange={this.update("password")} placeholder="password"/>
            {this.props.formType === "Sign up" &&
              <div>
                <input type="text" onChange={this.update("display_name")} placeholder="display name"/>
              </div>

            }
            
            <input className="session-form-button" type="submit" value={this.props.formType} />

          </form>
          <div className="session-form-demo"> Ready to start? <Link to={"#"} onClick={this.handleDemo}>Sign in with Demo</Link></div>      

        </div>
      </div>
    )
  }
}

export default SessionForm;