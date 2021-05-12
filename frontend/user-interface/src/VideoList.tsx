import React from 'react';


// from backend models.py
// type Video = {
//     videoKeyS3: string,
//     title: string,
//     uploadDate: string,
//     thumbnailKeyS3: string,
//     audioKeyS3: string,
// }

// type VideoListProps = {
//     videoList: Array<any>,
// }

const VideoList = (props: any) => {
  const res = props.videoList.map((el: any) => console.log(el));
  console.log(res);
  return <div>
  </div>;
};

export default VideoList;
