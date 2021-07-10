import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/video-player/video-player.component';
import { VideoModel } from '../../types';

interface CustomizedState {
  video: VideoModel;
}

type VideoModelProps = {
  readonly video: VideoModel;
};

const TitleViewAndDate = ({ video }: VideoModelProps) => {
  return (
    <div>
      <div className="font-semibold text-xl mb-2">{video.title}</div>
      <div className="font-medium text-sm text-gray-500">
        <span>{video.uploadDate}</span>
        <span className="font-bold mx-2">&bull;</span>
        <span>1,000 views</span>
      </div>
    </div>
  );
};

const WatchPage = () => {
  // refer to https://github.com/reach/router/issues/414#issuecomment-859406190
  const location = useLocation();
  const { video } = location.state as CustomizedState;
  return (
    <div>
      <VideoPlayer video={video} />
      <div className="w-5/6 mx-auto my-2">
        <div className="flex justify-between">
          <TitleViewAndDate video={video} />
          <div>Right part</div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
