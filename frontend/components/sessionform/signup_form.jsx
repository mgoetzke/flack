import React from 'react';
class SignupForm extends React.Component {
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
  handleSubmit(e){
    e.preventDefault;
    this.props.processForm(this.state);
  }
  update(field){
    return (e) => {
      this.setState({[field]: e.target.value});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" onChange={this.update("username")}/>
        <label htmlFor="">Password</label>
        <input type="password" onChange={this.update("password")}/>
        <label htmlFor="">Display Name</label>
        <input type="text" onChange={this.update("display_name")}/>
        <label htmlFor="">Email</label>
        <input type="text" onChange={this.update("email")}/>
        <input type="submit" value={this.props.formType} />
      </form>
    )
  }
}

export default SignupForm;