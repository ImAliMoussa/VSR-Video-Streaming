import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import VideoCard from '../../components/card/card.component';
import { VideoModel } from '../../types';
import ErrorBanner from '../../components/error-banner/error-banner.component';

const HomePage = () => {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    axios
      .get<VideoModel[]>('http://localhost:8000/api/video')
      .then((res) => {
        const newVideoList = res.data;
        setVideos(newVideoList);
        setIsLoading(false);
        console.log({ newVideoList });
        return null;
      })
      .catch((error: AxiosError) => {
        console.error({ error });
        setIsError(true);
        setErrorMsg(error.message);
      });
  }, []);

  if (isError) {
    return <ErrorBanner errorMsg={errorMsg} />;
  }

  return (
    <div className="mx-auto w-11/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-6">
      {isLoading
        ? 'Videos are loading'
        : videos &&
          videos.map((el) => {
            return <VideoCard key={el.id} video={el} />;
          })}
    </div>
  );
};

export default HomePage;
