import React from 'react';

class TopVideo extends React.Component {
  render() {
    return (
      <div className="video-container">
        <video src={require("../assets/img/theme/64377eef160cb44e527145c6_02_Homepage_BuildWithConfidence-transcode.mp4")} autoPlay loop muted />
      </div>
    );
  }
}

export default TopVideo;