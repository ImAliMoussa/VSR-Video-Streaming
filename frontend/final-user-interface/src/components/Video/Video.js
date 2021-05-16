import React from 'react';
import YouTube from 'react-youtube';

const Video = ({videoID}) => {
    return (
        <div>
          <YouTube
            videoId={videoID}
          />
        </div>
    )
}

export default Video;
