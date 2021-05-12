import React, {MouseEvent, useState} from 'react';
import VideoPage from './VideoPage';
import axios from 'axios';
import VideoList from './VideoList';


// video_key_s3 = models.CharField(max_length = 128)
// title = models.CharField(max_length = 1000)
// upload_date = models.DateTimeField(default=datetime.now)
// thumbnail_key_s3 = models.CharField(max_length = 128)
// audio_key_s3 = models.CharField(max_length = 128)

const App = () => {
  const [videoList, setVideoList] = useState([]);


  const handleBtnPress = (event: MouseEvent) => {
    event.preventDefault();
  };

  axios.get('http://localhost:8000/api/video')
      .then((res) => {
        const newVideoList = res.data;
        setVideoList(newVideoList);
      })
      .catch((err) => console.error(err));


  return (
    <div className="App">
      <VideoPage videoLink='http://vjs.zencdn.net/v/oceans.mp4' />
      <button onClick={handleBtnPress}>Button</button>
      <VideoList videoList={videoList} />
    </div>
  );
};

export default App;
