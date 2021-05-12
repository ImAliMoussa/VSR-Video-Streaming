import React from 'react';


// from backend models.py
type Video = {
    videoKeyS3: string,
    title: string,
    uploadDate: string,
    thumbnailKeyS3: string,
    audioKeyS3: string,
}

type VideoListProps = {
    videoList: Array<Video>,
}

const VideoList = (props: VideoListProps) => {
  return <div>
    {JSON.stringify(props.videoList)}
  </div>;
};

export default VideoList;
