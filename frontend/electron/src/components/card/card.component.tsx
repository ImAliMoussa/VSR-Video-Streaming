import React from 'react';
import { Link } from 'react-router-dom';
import { VideoModel } from '../../types';

type VideoCardProps = {
  readonly video: VideoModel;
};

const VideoCard = (props: VideoCardProps) => {
  const { video } = props;
  const toAndState = {
    pathname: `/watch/${video.id}`,
    state: { video },
  };
  return (
    <Link to={toAndState}>
      <div className="my-6 mx-2 shadow-md border-gray-800 bg-gray-100 relative cursor-pointer">
        <img src={video.thumbnailURL} alt="" />
        <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
          10:30
        </div>
        <div className="info-box text-xs flex p-1 font-semibold text-gray-500 bg-gray-300">
          <span className="mr-1 p-1 px-2 font-bold">{video.views} Views</span>
          <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
            {video.likes} Likes
          </span>
          <span className="mr-1 p-1 px-2 font-bold border-l border-gray-400">
            {video.dislikes} Dislikes
          </span>
        </div>
        <div className="desc p-3 text-gray-800">
          <span className="title font-bold block cursor-pointer hover:underline">
            {video.title}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
