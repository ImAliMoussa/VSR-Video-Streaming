import React, {useState, MouseEvent} from 'react';
import VideoPlay from './VideoPlay';


const Video = ({}) => {
  const [videoLink, setVideoLink] = useState("http://localhost:63636/output.mpd");
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: videoLink,
      type: 'application/dash+xml',
    }],
  };

  return (
    <div className="App">
      <VideoPlay {...videoJsOptions} />
    </div>
  );
};

export default Video;