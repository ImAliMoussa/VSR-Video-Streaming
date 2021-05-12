import React, {MouseEvent, useState} from 'react';
import VideoPage from './VideoPage';
import axios from 'axios';
import VideoList from './VideoList';

const App = () => {
  const [videoList, setVideoList] = useState([]);


  const handleBtnPress = (event: MouseEvent) => {
    event.preventDefault();
    axios.get('http://localhost:8000/api/video')
        .then((res) => {
          console.log(res);
          const newVideoList = res.data;
          setVideoList(newVideoList);
        })
        .catch((err) => console.error(err));
  };

  console.log(videoList);


  return (
    <div className="App">
      <VideoPage videoLink='http://vjs.zencdn.net/v/oceans.mp4' />
      <button onClick={handleBtnPress}>Button</button>
      <VideoList videoList={videoList} />
    </div>
  );
};

export default App;
