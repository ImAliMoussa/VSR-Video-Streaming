import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router';
import Video from './../Video/Video'
import './VideoPlayer.css';
import RecommendedVideos from '../RecommendedVideos/RecommendedVideos';
import VideoInfo from '../VideoInfo/VideoInfo';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const VideoPlayer = () => {
    let { videoId } = useParams();

    const [videoInfo, setVideoInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
/*
        axios
            .get(`http://localhost:5000/superresolve?video=https://video-super-resolution.fra1.digitaloceanspaces.com/BigBuckBunny.mp4&audio=https://video-super-resolution.fra1.digitaloceanspaces.com/output_audio.aac`)
            .then( response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
                setIsError(true);
            }) */
        setVideoInfo([]);
        setIsLoading(true);

        axios
          .get(`http://localhost:8000/api/video/${videoId}`)
          .then(response => {
              setIsError(false);
              createVideoInfo(response.data);

          })
          .catch(error => {
              console.log(error);
              setIsError(true);
          })
    }, [videoId])

    async function createVideoInfo (video) {
        axios.post('http://localhost:5000/superresolve', {
            videoURL: video.videoURL,
            audioURL: video.audioURL
          });
        const thumbnailURL = video.thumbnailURL;
        const videoURL = video.videoURL;
        const audioURL = video.audioURL;
        const publishedDate = new Date(video.uploadDate).toLocaleDateString('en-GB', {  
                                                                day : 'numeric',
                                                                month : 'short',
                                                                year : 'numeric'
                                                            });
        const title = video.title;
       // const description = snippet.description;

        setVideoInfo({
            title,
            thumbnailURL,
            videoURL,
            audioURL,
            publishedDate,
        });
        setIsLoading(false);
    }
    if(isError) {
        return <Alert severity="error" className='loading'>No Results found!</Alert>
    }
    return (
        <div className='videoplayer'>
            <div className='videoplayer__videodetails'>
                <div className='videoplayer__video'>
                    {isLoading ? <CircularProgress className='loading' color='secondary'/> : <Video /> }
                </div>
                <div className='videoplayer__videoinfo'>
                    {!isLoading ? <VideoInfo
                                    title={videoInfo.title}
                                    publishedDate={videoInfo.publishedDate}
                                  /> : null
                    }
                </div>
            </div>
            <div className='videoplayer__suggested'>
                <RecommendedVideos />
            </div>
        </div>
    )
}

export default VideoPlayer;
