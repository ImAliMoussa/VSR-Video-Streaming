import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SideBarRow from '../SideBarRow/SideBarRow';
import './VideoInfo.css';

const VideoInfo = ({title, description, publishedDate, channelTitle, channelImage, viewCount, likeCount, dislikeCount, subs}) => {
    return (
        <div className='videoinfo'>
            <div className='videoinfo__headline'>
                <h1>{title}</h1>
            </div>
            <div className='videoinfo__stats'>
                <p>{publishedDate}</p>
                <div className="videoinfo__likes">
                    <SideBarRow Icon={ThumbUpIcon} title={likeCount} />
                </div>
            </div>
            <hr />
            <div className='videoinfo__channeldesc'>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default VideoInfo;