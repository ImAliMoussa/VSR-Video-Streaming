import React from 'react';
import './SideBarRow.css';
import axios from 'axios';
const onDownload = (title,videoURL,audioURL) =>{
    console.log("++++++++++++++++++++++");
    console.log(audioURL);
    axios.post('http://localhost:5000/download', {
        videoName : title+'.mp4',
        videoURL: videoURL,
        audioURL: audioURL
      });
}
const SideBarRow = ({title,selected, videoURL,audioURL}) => {

    
    return (
        <div className={`sidebarrow ${selected ? 'selected': ''}`}>
            <button  onClick={() => onDownload(title,videoURL,audioURL)}>Download</button>
        </div>
    )
}

export default SideBarRow;
