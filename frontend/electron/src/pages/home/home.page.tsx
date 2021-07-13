import React from 'react';
import { VideoModel } from '../../types';
import ErrorBanner from '../../components/error-banner/error-banner.component';
import VideosCards from '../../components/videos-cards/videos-cards.component';

type HomePageProps = {
  //   const [videos, setVideos] = useState<VideoModel[]>([]);
  // const [searchTerm, setSearchTerm] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isError, setIsError] = useState<boolean>(false);
  // const [errorMsg, setErrorMsg] = useState<string>('');
  readonly videos: VideoModel[];
  readonly searchTerm: string;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly errorMsg: string;
  // readonly setVideos: (videos: VideoModel[]) => void;
  // readonly setSearchTerm: (searchTerm: string) => void;
  // readonly setIsLoading: (isLoading: boolean) => void;
  // readonly setIsError: (isError: boolean) => void;
  // readonly setErrorMsg: (errorMsg: string) => void;
};

const HomePage = ({
  videos,
  searchTerm,
  isLoading,
  isError,
  errorMsg,
}: HomePageProps) => {
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
