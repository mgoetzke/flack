import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className = "footer">
        <div className="legaljank">

        </div>
        <div className="portfolio">

          <a href="https://www.github.com/mgoetzke"><i className="fab fa-github"></i></a>
          <a href="https://www.linkedin.com/in/marie-goetzke"><i className="fab fa-linkedin"></i></a>
          <a href="https://www.mgoetzke.com"><i className="fas fa-desktop"></i></a>

        </div>
      </div>
    );
  }
}

export default Footer;