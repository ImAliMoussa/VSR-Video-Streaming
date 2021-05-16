import React, {useEffect, useState} from 'react';
import VideoCard from './../VideoCard/VideoCard';
import './RecommendedVideos.css';
import axios from 'axios';
import {DateTime} from 'luxon';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';


const RecommendedVideos = () => {

    const [videoCards, setVideoCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      axios.get('http://localhost:8000/api/video')
      .then((res) => {
        console.log(res);
        const newVideoList = res.data;
        createVideoCards(newVideoList);
      })
   /*   axios
      .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${40}&regionCode=PK&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
      .then(response => {
          console.log(response.data.items);
          createVideoCards(response.data.items);
        }) */
        .catch(error => {
          console.log(error);
          setIsError(true);
        })
    }, [])

    async function createVideoCards(videoItems) {
      let newVideoCards = [];
      for (const video of videoItems) {
        const videoId = video.id;

        const title = video.title;
        const image = video.thumbnailURL;
        //const views = video.statistics.viewCount;
        const timestamp = DateTime.fromISO(video.uploadDate).toRelative();

        newVideoCards.push({
          videoId,
          image,
          title,
          timestamp,
        });
      };
      setVideoCards(newVideoCards);
      setIsLoading(false);
    }

    if(isError) {
      return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        
        <div className='recommendedvideos'>
            { isLoading ? <CircularProgress className='loading' color='secondary' /> : null }
            <div className="recommendedvideos__videos">
                {
                  videoCards.map(item => {
                    return (
                            <Link key={item.videoId} to={`/video/${item.videoId}`}>
                              <VideoCard 
                                title={item.title}
                                image={item.image}
                                timestamp={item.timestamp}
                              />
                            </Link>
                    )
                  })
                }
            </div>
        </div>
    )
}

export default RecommendedVideos;
