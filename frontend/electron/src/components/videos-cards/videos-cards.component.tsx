import React from 'react';
import { VideoModel } from '../../types';
import VideoCard from '../card/card.component';

type VideosCardsProps = {
  readonly videos: Array<VideoModel>;
  readonly isLoading: boolean;
};

const VideosCards = ({ videos, isLoading }: VideosCardsProps) => {
  return (
    <div className="mx-auto w-11/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 pt-6">
      {isLoading
        ? 'Loading...'
        : videos &&
          videos.map((el) => {
            return <VideoCard key={el.id} video={el} />;
          })}
    </div>
  );
};

export default VideosCards;
