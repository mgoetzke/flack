import React from 'react';
class Channel extends React.Component {
  constructor(props) {
    super(props);
    let testId = 4;
    // const messageable_id = this.props.location;
  }
  componentDidMount(){
    //hardcoded for testing; may need to change based on db updates
    this.props.fetchChannel(testId);
    console.log("mounted")
  }
  render() {
    const { channel } = this.props;
  
    return (
      <div>
        
        HAI IM THE Channel
      </div>
    );
  }
}

export default Channel;