/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  IconDefinition,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import VideoPlayer from '../../components/video-player/video-player.component';
import { VideoModel } from '../../types';
import djangoAxios from '../../custom-axios';
import Loading from '../../components/loading/loading.component';

type VideoModelProps = {
  video: VideoModel;
};

const TitleViewAndDate = ({ video }: VideoModelProps) => {
  return (
    <div>
      <div className="font-semibold text-xl mb-2">{video.title}</div>
      <div className="font-medium text-sm text-gray-500">
        <span>{video.uploadTimeFormatted}</span>
        <span className="font-bold mx-2">&bull;</span>
        <span>{video.views + 1} views</span>
      </div>
    </div>
  );
};

type ButtonWithIconAndTextProps = {
  readonly text: string | number;
  readonly icon: IconDefinition;
  onClickHanlder: (e: React.MouseEvent, addValue?: number) => void;
  readonly par?: number;
};

const ButtonWithIconAndText = ({
  text,
  icon,
  onClickHanlder,
  par,
}: ButtonWithIconAndTextProps) => {
  const callback = par
    ? (e: React.MouseEvent) => onClickHanlder(e, par)
    : onClickHanlder;
  return (
    <button className="focus:outline-none" type="button" onClick={callback}>
      <div className="flex items-center mr-5 py-2 cursor-pointer text-lg text-gray-500 hover:text-gray-700">
        <span>
          <FontAwesomeIcon className="mr-1" icon={icon} />
          <span className="ml-1 text-sm">{text}</span>
        </span>
      </div>
    </button>
  );
};

ButtonWithIconAndText.defaultProps = {
  par: 0,
};

const ButtonGroupOnRight = ({ video }: VideoModelProps) => {
  const [likes, setLikes] = useState<number>(video.likes);
  const [dislikes, setDislikes] = useState<number>(video.dislikes);

  const issueLikeOrDislike = (_event: React.MouseEvent, addValue?: number) => {
    djangoAxios
      .post(`api/video/likes/${video.id}`, { addValue })
      .then(() => {
        if (addValue) {
          if (addValue > 0) setLikes(likes + 1);
          if (addValue < 0) setDislikes(dislikes + 1);
        }
        return undefined;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
      });
  };
  const downloadVSR = () => {
    axios
      .post('http://localhost:5000/download', {
        videoName: `${video.title}.mp4`,
        videoURL: video.videoURL,
        audioURL: video.audioURL,
      })
      .then(() => {
        console.log('download started');
        return undefined;
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <section className="justify-end flex flex-row flex-wrap">
      <ButtonWithIconAndText
        text={likes}
        icon={faThumbsUp}
        onClickHanlder={issueLikeOrDislike}
        par={1}
      />
      <ButtonWithIconAndText
        text={dislikes}
        icon={faThumbsDown}
        onClickHanlder={issueLikeOrDislike}
        par={-1}
      />
      <ButtonWithIconAndText
        text="VSR Download"
        icon={faDownload}
        onClickHanlder={downloadVSR}
      />
    </section>
  );
};

const WatchPage = () => {
  // refer to https://github.com/reach/router/issues/414#issuecomment-859406190
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const { video } = location.state as VideoModelProps;
  useEffect(() => {
    axios.get('http://localhost:5000/stop').then(() => {
      axios.post('http://localhost:5000/superresolve', {
        videoURL: video.videoURL,
        audioURL: video.audioURL,
      });
      djangoAxios.post(`api/video/views/${video.id}`, {
        videoURL: video.videoURL,
        audioURL: video.audioURL,
      });
      // setTimeout(() => {
      //   setLoading(false);
      // }, 20000);
      const ws = new WebSocket("ws://localhost:9000/");
      ws.onopen = () => ws.send("please watch output.mpd");
      ws.onmessage = (event: MessageEvent) => {
        console.log(event.data)
        setLoading(false);
      };
    })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <VideoPlayer video={video} />
      <div className="w-5/6 mx-auto my-2">
        <div className="flex justify-between">
          <TitleViewAndDate video={video} />
          <ButtonGroupOnRight video={video} />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
