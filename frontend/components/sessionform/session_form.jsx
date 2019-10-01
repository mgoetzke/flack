import React from 'react';
class SessionForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  render(){
    return (
      <form>

        <input type="submit" value={this.props.formType}/>
      </form>
    )
  }
}