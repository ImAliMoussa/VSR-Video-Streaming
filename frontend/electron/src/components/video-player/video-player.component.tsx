/* eslint-disable jsx-a11y/media-has-caption */
import * as React from 'react';
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
      this.on('error', function (event) {
        const time = this.currentTime();

        if (this.error().code === 2) {
          this.error(null).pause().load().currentTime(time).play();
        }
      });
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
      <div className="c-player w-5/6 mx-auto align-middle">
        <div className="c-player__screen" data-vjs-player="true">
          <video
            ref={(node: HTMLVideoElement) => {
              this.videoNode = node;
            }}
            className="video-js vjs-fluid"
          />
        </div>
      </div>
    );
  }
}

type VideoPlayerProps = {
  video: VideoModel;
};

const VideoPlayer = (props: VideoPlayerProps) => {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    fluid: true,
    preload: false,
    retryOnError: true,
    sources: [
      {
        src:
          // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          // 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
          'http://localhost:63636/output.mpd',
        type: 'application/dash+xml',
      },
    ],
  };

  return (
    <div className="py-4">
      <VideoPlayerHelper {...videoJsOptions} />
    </div>
  );
};

export default VideoPlayer;
