import * as React from 'react';
import { useState } from 'react';
import videojs from 'video.js';

// Styles
import 'video.js/dist/video-js.css';
import { VideoModel } from '../../types';

interface VideoPlayerPropsInferface {
  videoJsOptions: videojs.PlayerOptions;
}

class VideoPlayerHelper extends React.Component {
  private player?: videojs.Player;

  private videoNode?: HTMLVideoElement;

  constructor(props: VideoPlayerPropsInferface) {
    super(props);
    this.player = undefined;
    this.videoNode = undefined;
  }

  componentDidMount() {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props as any).ready(function () {
      // console.log('onPlayerReady', this);
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div className="c-player">
        <div className="c-player__screen" data-vjs-player="true">
          <video
            ref={(node: HTMLVideoElement) => (this.videoNode = node)}
            className="video-js vjs-fluid"
          />
        </div>
        {/* <div className="c-player__controls"> */}
        {/*  <button>Play</button> */}
        {/*  <button>Pause</button> */}
        {/* </div> */}
      </div>
    );
  }
}

type VideoPlayerProps = {
  video: VideoModel;
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const [videoLink, setVideoLink] = useState(props.video);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [
      {
        src:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        type: 'video/mp4',
      },
    ],
  };

  // dummy coede
  const handleBtnPress = (event: MouseEvent) => {
    event.preventDefault();
    setVideoLink('http://vjs.zencdn.net/v/oceans.mp4');
  };

  return (
    <div className="App">
      <VideoPlayerHelper {...videoJsOptions} />
    </div>
  );
};

export default VideoPlayer;
