import React from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../../components/video-player/video-player.component';
import { VideoModel } from '../../types';

interface CustomizedState {
  video: VideoModel;
}

const WatchPage = () => {
  // refer to https://github.com/reach/router/issues/414#issuecomment-859406190
  const location = useLocation();
  const { video } = location.state as CustomizedState;
  return (
    <div>
      <VideoPlayer />
    </div>
  );
};

export default WatchPage;
