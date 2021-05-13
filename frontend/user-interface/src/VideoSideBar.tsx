import React from 'react';


// from backend models.py
type Video = {
    id: number,
    videoKeyS3: string,
    title: string,
    uploadDate: string,
    thumbnailKeyS3: string,
    audioKeyS3: string,
}


type VideoSideBarProps = {
  videoList: Array<Video>
}

const VideoSideBar = (props: VideoSideBarProps) => {
  return (
    <div>
      <ul>
        {
          props.videoList.map((video) => <li key={video.videoKeyS3}>{video.title}</li>)
        }
      </ul>
    </div>
  );
};

export default VideoSideBar;
