import React from 'react';
class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      display_name: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault;
    this.props.processForm(this.state);
  }
  update(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    }
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
    //const for class names if else
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        <label>Email</label>
        <input type="text" onChange={this.update("email")} />

        <label>Password</label>
        <input type="password" onChange={this.update("password")} />
        {this.props.formType === "Sign Up" &&
          <div>
            <label>Display Name</label>
            <input type="text" onChange={this.update("display_name")} />
          </div>

        }
        
        <input className="session-button" type="submit" value={this.props.formType} />
      </form>
    )
  }
}

export default SessionForm;