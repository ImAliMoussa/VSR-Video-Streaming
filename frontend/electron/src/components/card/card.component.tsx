import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  IconDefinition,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { getTimeAsStr } from '../../common/utils';
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
        <img className="object-cover h-48 w-full" src={video.thumbnailURL} alt="" />
        <div className="badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded">
          {getTimeAsStr(video.duration)}
        </div>
        <div className="info-box py-1 text-xs grid grid-rows-1 grid-flow-col p-1 font-semibold text-gray-500 bg-gray-300">
          <div className="mx-auto font-bold">
            <FontAwesomeIcon className="mr-1" icon={faEye} />
            {video.views}
          </div>
          <div className="mx-auto font-bold">
            <FontAwesomeIcon className="mr-1" icon={faThumbsUp} />
            {video.likes}
          </div>
          <div className="mx-auto font-bold">
            <FontAwesomeIcon className="mr-1" icon={faThumbsDown} />
            {video.dislikes}
          </div>
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
