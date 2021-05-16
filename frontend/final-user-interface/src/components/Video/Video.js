import React from 'react';
import YouTube from 'react-youtube';

const Video = ({videoURL , audioURL}) => {
    return (
        <div>
  <video controls>
  <source src={videoURL} type="video/mp4" />
  Your browser does not support the video tag.
    </video>
        </div>
    )
}

export default Video;
