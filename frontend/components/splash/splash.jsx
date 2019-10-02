import React from 'react';
import { Link } from 'react-router-dom';
class Splash extends React.Component {
  constructor(props) {
    super(props);
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
          <input type="text" value="Your work email"/>
          <Link className="splash-button" to="/signup">TRY FOR FREE</Link>
        </div>
        <span>Already using Flack? <Link className="splash-link" to="/login">Sign in</Link>.</span>
        
      </div>
    );
  }

}

export default Splash;
