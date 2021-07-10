import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faFileDownload,
  IconDefinition,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
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

type ButtonWithIconAndTextProps = {
  readonly text: string;
  readonly icon: IconDefinition;
};

const ButtonWithIconAndText = ({ text, icon }: ButtonWithIconAndTextProps) => {
  return (
    <div className="flex items-center mr-5 py-2 cursor-pointer text-lg text-gray-500 hover:text-gray-700">
      <span>
        <FontAwesomeIcon className="mr-1" icon={icon} />
        <span className="ml-1 text-sm">{text}</span>
      </span>
    </div>
  );
};

const ButtonGroupOnRight = () => {
  return (
    <section className="justify-end flex flex-row flex-wrap">
      <ButtonWithIconAndText text="97K" icon={faThumbsUp} />
      <ButtonWithIconAndText text="97K" icon={faThumbsDown} />
      <ButtonWithIconAndText text="VSR Download" icon={faDownload} />
    </section>
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
          <ButtonGroupOnRight />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
