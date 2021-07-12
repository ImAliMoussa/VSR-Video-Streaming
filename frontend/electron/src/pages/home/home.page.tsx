import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { VideoModel } from '../../types';
import ErrorBanner from '../../components/error-banner/error-banner.component';
import djangoAxios from '../../custom-axios';
import VideosCards from '../../components/videos-cards/videos-cards.component';

type HomePageState = {
  readonly searchTerm?: string;
};

const HomePage = () => {
  const location = useLocation();
  let searchTerm: string | undefined = '';
  if (location.state) {
    searchTerm = (location.state as HomePageState).searchTerm;
  }

  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    djangoAxios
      .get<VideoModel[]>('api/video', { params: { searchTerm } })
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
    <>
      {searchTerm && searchTerm?.length > 0
        ? `Search results for ${searchTerm}`
        : ''}
      <VideosCards isLoading={isLoading} videos={videos} />
    </>
  );
};

export default HomePage;
