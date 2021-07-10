import * as React from 'react';
import videojs from 'video.js';

// Styles
import 'video.js/dist/video-js.css';

class VideoPlay extends React.Component {
  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props).ready(function () {
      // console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div className="c-player">
        <div className="c-player__screen" data-vjs-player="true">
          <video width="720" ref={(node) => this.videoNode = node} className="video-js " />
        </div>
        {/* <div className="c-player__controls">*/}
        {/*  <button>Play</button>*/}
        {/*  <button>Pause</button>*/}
        {/* </div>*/}
      </div>
    );
  }
}
export default VideoPlay;
