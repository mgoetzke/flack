import React from 'react';
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" onChange={this.update("username")} />
        <label htmlFor="">Password</label>
        <input type="password" onChange={this.update("password")} />
        
        <input type="submit" value={this.props.formType} />
      </form>
    )
  }
}

export default LoginForm;