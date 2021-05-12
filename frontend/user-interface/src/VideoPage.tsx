import React, {useState, MouseEvent} from 'react';
import VideoPlayer from './VideoPlayer';

type VideoPageProps = {
  videoLink: string,
}

const VideoPage = (props: VideoPageProps) => {
  const [videoLink, setVideoLink] = useState(props.videoLink);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      // src: 'http://vjs.zencdn.net/v/oceans.mp4',
      src: videoLink,
      type: 'video/mp4',
    }],
  };


  // dummy coede
  const handleBtnPress = (event: MouseEvent) => {
    event.preventDefault();
    setVideoLink('http://vjs.zencdn.net/v/oceans.mp4');
  };

  return (
    <div className="App">
      <VideoPlayer {...videoJsOptions} />
      <button onClick={handleBtnPress}>Click here for nothing</button>
    </div>
  );
};

export default VideoPage;
